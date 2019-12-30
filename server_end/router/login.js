const express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var moment = require('moment')
var Base64 = require('js-base64').Base64;
var request = require('request');
var md5 = require('blueimp-md5')

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
    console.log(req.session.captcha)
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
	});
	req.session.phoneCode = code;
});

//注册/登录
router.post('/login', (req, res, next) => {
	let data = req.body.data;
	let serach;
	if(req.body.type == 'pwd'){
		if(data.imgCode == req.session.captcha){
			//查询用户名和密码
		} else{
			res.send(JSON.stringify({
				code: 1,
				msg: '验证码错误'
			}));
		}
	}else if(req.body.type == 'phone'){
		if(data.phoneCode == req.session.phoneCode){
			//查询用户名和密码
		} else{
			res.send(JSON.stringify({
				code: 1,
				msg: '验证码错误'
			}));
		}
	}
})


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
		"datas": [123,"1"]
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
			if(response==='000000'){
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


module.exports = router;