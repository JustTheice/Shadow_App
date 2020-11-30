const express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var moment = require('moment')
var Base64 = require('js-base64').Base64;
var request = require('request');
var md5 = require('blueimp-md5')
const User = require('../db/users.js');
var multer = require('multer');


function getImgCode (req, res) {
    var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1idl', // 验证码字符中排除
				color: true,
        noise: 2, // 干扰线条的数量
        height: 40 ,
				width: 110
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
		console.log(req.session);
		res.type('svg');
    res.send(captcha.data);
}


//图片验证码
router.get('/getImgCode', (req, res, next) => {
	getImgCode(req, res, next);
});
//短信验证码
router.get('/getPhoneCode', (req, res, next) => {
	let phone = req.query.phone,
			code = randomCode(6);
	sendCode(phone, code, (ret) => {
		console.log(ret, code);
		res.send(JSON.parse({
			code: 0,
			msg: "发送成功"
		}))
	});
	req.session.phoneCode = code;
	console.log(req.session)
});


//注册/登录
router.post('/login', (req, res, next) => {
	let logType = req.body.type;
	let data = req.body.data;
	console.log(req.session)
	if(logType=='pwd'){
		data.pwd = md5(md5(data.pwd));
	}
	let searchKey;
	if(logType == 'pwd'){
		if(data.imgCode == req.session.captcha){
			searchKey = {name: data.name};
		} else{
			return res.send(JSON.stringify({
				code: 1,
				msg: '验证码错误'
			}));
		}
	}else if(logType == 'phone'){
		if(data.phoneCode == req.session.phoneCode){
			searchKey = {phone: data.phone};
		} else{
			return res.send(JSON.stringify({
				code: 1,
				msg: '验证码错误'
			}));
		}
	}
	
	//根据数据库有无用户处理登录/注册
	User.findOne(searchKey, (err, ret) => {
		if(err){
			return console.log('查找失败错误为:'+err);
		}
		if(!ret){ //如果未找到用户, 则根据数据生成一个存到数据库
			let user = new User(data);
			user.save();
			req.session.userId = user._id;
			return res.send(JSON.stringify({
				code: 0,
				data: user
			}))
		}else{ //找到用户了则登录, 如果是密码登录则需要判断密码
			if(logType == 'pwd'){
				User.findOne({name: data.name, pwd: data.pwd}, (err, ret) => {
					if(!ret){ //密码不匹配
						return res.send(JSON.stringify({
							code: 2,
							msg: '用户名已存在但密码不匹配'
						}));
					}else{
						req.session.userId = ret._id;
						return res.send(JSON.stringify({
							code: 0,
							data: ret,
							msg: '登录成功'
						}))
					}
				});
			}else if(logType == 'phone'){
				User.findOne({phone: data.phone}, (err,ret) => {
					req.session.userId = ret._id;
					return res.send(JSON.stringify({
						code: 0,
						data: ret,
						msg: '登录成功'
					}));
				});
				
			}
		}
	});
})


//自动登录
router.get('/autoLogin', (req, res, next) => {
	User.findOne({_id: req.session.userId}, (err, ret) => {
		if(err){
			return console.log('查找失败'+err);
		}
		if(ret){
			res.send(JSON.stringify({
				code: 0,
				data: ret
			}))
		}else{
			res.send(JSON.stringify({
				code: 1,
				msg: '自动登录失败'
			}))
		}
	});
});


//更改信息
router.post('/updateInfo', (req, res, next) => {
	let data = req.body;
	User.findByIdAndUpdate(data._id, data, (err, ret) => {
		if(err){
			return console.log('修改失败'+err);
		}
		if(ret){
			res.send(JSON.stringify({
				code: 0,
				msg: '修改成功',
				data: ret
			}));
		}
	});
	
});

//更改密码
router.post('/updatePwd', (req, res, next) => {
	let pwds = req.body;
	User.findOne({_id:req.session.userId, pwd: md5(md5(pwds.oldPwd))}, (err,ret) => {
		if(err){
			return console.log('查找出错'+err);
		}
		if(ret){
			User.findByIdAndUpdate(req.session.userId, {pwd: md5(md5(pwds.newPwd))}, (err,ret) => {
				if(err){
					return console.log('修改时出错');
				}
				if(ret){
					res.send(JSON.stringify({
						code: 0,
						msg: '修改成功'
					}));
				}
			});
		}else{
			res.send(JSON.stringify({
				code: 1,
				msg: '原密码错误'
			}));
		}
	})
});

//获取积分榜
router.get('/getRank', (req, res, next) => {
	User.find({}, (err,ret) => {
		if(err){
			return console.log('查找失败'+err);
		}
		let users = ret;
		for(let i=0; i<users.length-1; i++){
			for(let j=0; j<users.length-1-i; j++){
				if(users[i].integral < users[i+1].integral){
					let t = users[i];
					users[i] = users[i+1];
					users[i+1] = t;
				}
			}
		}
		res.send(JSON.stringify(users.slice(0,5)));
	});
});


//删除用户
router.get('/signout', (req, res, next) => {
	User.findByIdAndRemove(req.session.userId, (err, ret) => {
		if(err){
			return console.log('删除失败'+err);
		}
		res.send(JSON.stringify({
			code: 0,
			msg: '注销成功',
			data: ret
		}));
	})
});

// 发送验证码(容联云)
function sendCode(phone, code, cb){
	const ACCOUNT_SID = '8aaf07086d62068d016d94eb73d61cc6'
	const AUTH_TOKEN = '4d76c8d4737f46829eb69ae7a0311e5b';
	const Rest_URL = 'https://app.cloopen.com:8883';
	const appId = '8aaf07086d62068d016d94eb741c1ccc';
	
	let time = moment().format('YYYYMMDDHHmmss');
	let url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+md5(ACCOUNT_SID+AUTH_TOKEN+time);
	let authorization = Base64.encode(ACCOUNT_SID + ':' + time);
	//请求体
	let body = {
		to: phone,
		appId,
		templateId: '1',
		"datas": [code,"1"]
	}
	//请求头
	let headers = {
	    'Accept' :'application/json',
	    'Content-Type' :'application/json;charset=utf-8',
	    'Content-Length': JSON.stringify(body).length+'',
	    'Authorization' : authorization,
	}
	
	//请求
	request({
	    method : 'POST',
	    url,
	    headers,
	    body,
	    json : true
	}, function (error, response, body) {
			if(response=='000000'){
				cb && cb('发送成功');
			}
	    // callback(true);
	});
}

/*
 生成指定长度的随机数
 */
function randomCode(length){
	let code = '';
	for(let i=0; i<length; i++){
		code += Math.floor(Math.random()*10);
	}
	return parseInt(code);
}



// 处理头像上传
var storage = multer.diskStorage({ //配置文件存储
	destination: function(req, file, cb) { //配置目录
		cb(null, './public/uploads/');
	},
	filename: function(req, file, cb) { //配置文件名
		var avatar = file;
		let suffixArr = avatar.originalname.split('.');
		let suffix = suffixArr[suffixArr.length-1];
		cb(null,req.session.userId + '-avatar.' + suffix);
	}
});
var upload = multer({storage: storage});

//上传头像
router.post('/uploadAvatar', upload.single('avatar'), function(req, res, next) {
	var avatar = req.file;
	let suffixArr = avatar.originalname.split('.');
	let suffix = suffixArr[suffixArr.length-1];
	console.log(avatar)
	// var filename = '192.168.2.104:5000/public/' + req.session._id + '-avatar' + avatar.originalname.slice(avatar.originalname.length - 4);
	let filename = `http://192.168.2.104:5000/public/uploads/${req.session.userId}-avatar.${suffix}`;
	User.findByIdAndUpdate(req.session.userId, {
		avatar: filename
	}, function(err, ret) {
		if(err) {
			return console.log('头像信息更新失败'+err);
		}
		//返回新的用户信息
		User.findById(req.session.userId, function(err,ret){
			if(err) {
				return console.log('头像信息更新失败'+err);
			}
			console.log(ret);
			res.send(JSON.stringify({
				code: 0,
				data: ret
			}));
		})
	});
});


module.exports = router;