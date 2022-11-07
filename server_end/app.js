const express = require('express');
const fs = require('fs');
const proxyMiddleWare = require("http-proxy-middleware");
const app = express();
const helmet = require('helmet');
const db = require('./db/index.js');
const loginRouter = require('./router/login.js');
const session = require('express-session');
const bodyParser = require('body-parser');
//配置body-parser模块来方便获取post请求的表单内容
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const path = require('path');
const server = require('http').createServer(app); 
const io = require('socket.io')(server);
const User = require('./db/users.js');


app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', 'http://192.168.2.104');
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	// res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
	res.header('Access-Control-Allow-Credentials', 'true')
  next();
});


//配置session模块
app.use(session({
  secret: 'shadow',
  resave: false,
  saveUninitialized: false,
	cookie: { secure: false }
}));


// //指定模板引擎
// app.set("view engine", 'ejs');
// //指定模板位置
// app.set('views', path.join(__dirname,'./view/index.html'));

app.use(loginRouter);

//数据代理
let proxys = {
	target: 'https://hot.cnbeta.com/articles/movie/',
	changeOrigin: true,
	pathRewrite: {// 重写路径
	  '^/film': ''
	}
}
app.use('/film', proxyMiddleWare(proxys)); 
app.use('/public/',express.static(path.join(__dirname,'./public/')));
// app.get('/', (req, res, next) => {
// 	res.type('html');
// 	res.sendFile(path.join(__dirname,'./view/index.html'));
// });
app.get('/', (req, res, next) => {
})

//设置允许跨域访问该服务.

app.use(helmet({
  frameguard: true  // 允许iframe
}));



//socket服务
let riddles = [];
fs.readFile('./data/riddles.json', 'utf8', function(err, data){
  if(err){
		return console.log('读取失败'+err);
	}
	riddles = JSON.parse(data);
});
let players = [], inRooms = [];
let isPlaying = false;
let startTimer, startCount; //开始游戏倒计时
let turnTimer, turnAnswer='', turnTip='', turnCount = 10, turnIndex=0, rightCount=0 //回合相关
const DRAW_ROOM = 'DRAW_ROOM';
io.on('connection', function(socket){
	console.log('一个用户连接到了socket');
	socket.on('disconnect', function(socket){
		console.log('一个用户断开了连接');
	});
	socket.on('chat message', function({name, msg}){
		User.findOne({name}, (err,ret) => {
			if(err){
				return console.log('查找失败'+err);
			}
			io.emit('chat message', {name, msg, avatar:ret.avatar});
		});
	});
	socket.on('leaveDrawRoom', function({name}){
		socket.leave(DRAW_ROOM);
		inRooms.splice(inRooms.findIndex((item,index) => item.name==name), 1);
		console.log(inRooms)
		io.to(DRAW_ROOM).emit('leaveDrawRoom', {name, inRooms});
	});
	socket.on('joinDrawRoom', function({name,id}){
		socket.join(DRAW_ROOM);
		// inRooms.push({name, score:0, isP:false, isReady:false, addScore:0});
		//记录到players
		// if(!isPlaying){ 
		// 	players.push({name, score:0, addScore:0, hasTrue: false});
		// }
		let retRooms, msg;
		if(isPlaying){
			retRooms = inRooms.filter((item,index) => item.isReady);
		}else{
			retRooms = inRooms;
		}
		if(inRooms.find((item,index) => item.name==name)){
			msg = {name:'', content:`欢迎${name}重回房间`};
		}else{
			msg = {name:'', content:`欢迎${name}加入房间`};
			//记录到inRooms
			inRooms.push({name, score:0, isReady:false, addScore:0});
		}
		io.to(DRAW_ROOM).emit('joinDrawRoom', {msg, players:retRooms, isPlaying});
		
	});
	socket.on('toggleReady', function({isReady, name}){ //收到准备请求
		let readyP = inRooms.find((item,index) => item.name==name);
		readyP.isReady = isReady;
		readyP.isReady ? readyP.addScore = 'R' : readyP.addScore = 0;
		io.to(DRAW_ROOM).emit('toggleReady', {name, inRooms});
		//如果人数够,则开始游戏
	 	let readyCount = inRooms.reduce((count,item) => count += (item.isReady?1:0), 0);
		if(readyCount>=2 && !isPlaying){ //开始倒计时
			io.to(DRAW_ROOM).emit('willStart', {msg: {name:'',content:'如果不来人的话5秒后就开始了'}});
			clearTimeout(startTimer);
			startTimer = setTimeout(() => {
				//开始游戏
				// players = inRooms;
				isPlaying = true;
				turnLogic();
			},5000);
		}
	});
	socket.on('startDraw', function(point){
		io.to(DRAW_ROOM).emit('startDraw', point);
	});
	socket.on('moveDraw', function(point){
		io.to(DRAW_ROOM).emit('moveDraw', point);
		// .broadcast
	});
	socket.on('toggleType', function({type}){
		io.to(DRAW_ROOM).emit('toggleType', {type});
	});
	socket.on('changeColor', function({color}){
		io.to(DRAW_ROOM).emit('changeColor', {color});
	});
	socket.on('changeLine', function({line}){
		io.to(DRAW_ROOM).emit('changeLine', {line});
	});
	socket.on('clearCanvas', function(){
		io.to(DRAW_ROOM).emit('clearCanvas');
	});
	socket.on('turnAnswer', function({answer, name}){
		let retStr = '';
		let isRight = true;
		let addScore = 0;
		let canAdd = false;
		rightCount++;
		//判断答案是否正确
		for(let i=0; i<answer.length; i++){
			console.log(answer[i])
			//屏蔽关键词
			if(turnAnswer.match(answer[i])){
				retStr += '*';
			}else{
				retStr += answer[i];
				isRight = false;
			}
		}
		//答对加分
		if(isRight && answer.length===turnAnswer.length){
			var player = inRooms.find((item,index) => {
				return item.name==name && item.isReady;
			});
			if(!player.hasTrue){
				canAdd = true;
				if(rightCount===1){ //自己加分
					player.addScore = 2;
				}else{
					player.addScore = 1;
				}
				//画者加分
				inRooms[turnIndex].score += 1;
				inRooms[turnIndex].addScore = rightCount;
				
				player.score += player.addScore;
				retStr = `${name}答对了`;
				player.hasTrue = true;
			}
		}
		io.to(DRAW_ROOM).emit('turnAnswer', {msg:retStr, inRooms, canAdd, name});
	});
});
/**
 * 		你画我猜,逻辑分析:
 * 			1.房间内的所有玩家记录在一个数组中
 * 			2.判断 * 人数必须>=2才能开始
 * 			3.当最后一个用户进入或某个用户离开5s后开始游戏  (根据前端发来的进入/离开事件来判断)
 * 			4.游戏开始后,后进来的用户只能观看		(加入房间但不存入玩家数组)
 * 			5.对players中的玩家轮流发送绘画回合,并随机生成要猜的词		
 * 			6.隔一段时间后向客户端发送提示
 * 			7.收到玩家消息后判断答案,对了则显示其答对并计算加分
 * 			8.每回合结束后公示答案
 * 			9.游戏结束后返回排行榜
 * 			10.结束后隔30s后开始
 */

/**
 * 		回合框架
 * 		@param index 玩家数组中玩家所在下标
 */
function turnLogic(){ 
	/**
	 * 		1.向客户端发送画者信息
	 * 		2.每秒更新回合剩余时长
	 * 		3.本回合结束后递归进入下一个回合
	 * 		4.全部回合结束后,清空玩家列表
	 */
	
	
	//判断游戏是否结束
	if(turnIndex>inRooms.length-1){
		isPlaying = false;
		
		let rank = deepClone(inRooms).filter((item,index) => item.isReady);
		for (let i=0; i<rank.length-1; i++) {
			for (let j=0; j<rank.length-1-i; j++) {
				if(rank[j].score < rank[j+1].score){
					let t = rank[j];
					rank[j] = rank[j+1];
					rank[j+1] = t;
				}
			}
		}
		
		// 分数排序
		
		//结束处理
		clearInterval(turnTimer);
		turnCount = 10;
		turnIndex = 0;
		inRooms.forEach((item,index) => { //重置信息
			// item.isP = false;
			item.isReady = false;
			item.score = 0;
			item.addScore = 0;
			item.hasTrue = false;
		});
		io.to(DRAW_ROOM).emit('gameOver', {inRooms, rank});
		console.log('游戏结束');
		return
	}
	
	//若不是玩家(是观看),则跳过他
	if(!inRooms[turnIndex].isReady){
		turnIndex++;
		turnLogic();
	}
	
	//回合初始化
	turnTip = '';
	let type = Math.round(Math.random()*4);
	switch (type){
		case 0: turnTip = '成语';
			break;
		case 1: turnTip = '明星';
			break;
		case 2: turnTip = '水果';
			break;
		case 3: turnTip = '动物';
			break;
		case 4: turnTip = '武器';
			break;
		default:
			break;
	}
	let riddleGroup = riddles[turnTip];
	let riddleIndex = Math.round(Math.random()*(riddleGroup.length-1));
	turnAnswer = riddleGroup[riddleIndex];
	turnCount = 10;
	inRooms.forEach((item,index) => {
		item.addScore = 0;
		item.hasTrue = false;
	});
	console.log(turnIndex+'回合')
	//发送画者信息
	io.to(DRAW_ROOM).emit('turnPainter', {name:inRooms[turnIndex].name, title: turnAnswer});
	
	// clearInterval(turnTimer);
	turnTimer = setInterval(() => {
		turnCount--;
		io.to(DRAW_ROOM).emit('turnCount', {turnCount});
		if(turnCount===6){ //一定时间后发送提示
			io.to(DRAW_ROOM).emit('turnTip', {turnTip});
		}else if(turnCount<=0){ //回合结束
			clearInterval(turnTimer);
			turnIndex++;
			rightCount = 0;
			io.to(DRAW_ROOM).emit('turnOver', {});
			turnAnswer = '';
			console.log('即将进入下一回合')
			setTimeout(() => {
				turnLogic();
			}, 5000);
		}
	},1000);
	
	
}

//深度克隆
function checkType(target) {
	return Object.prototype.toString.call(target).slice(8, -1);
}
function deepClone(sample) {
	let result;
	let type = checkType(sample);
	//如果样本不是对象或数组，直接返回即可，无需进行后续操作
	if (type === 'Array') {
		result = [];
	} else if (type === 'Object') {
		result = {};
	} else {
		return sample;
	}
	//遍历每一项并存进result里
	for (let i in sample) {
		//如果是对象或数组，则继续遍历
		if (checkType(sample[i]) === 'Object' || checkType(sample[i]) === 'Array') {
			result[i] = deepClone(sample[i]);
		} else {
			result[i] = sample[i];
		}
	}
	return result;
}

server.listen(5000, () => {
	console.log('server is running...');
});