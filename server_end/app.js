const express = require('express');
const proxyMiddleWare = require("http-proxy-middleware");
const app = express();
const helmet = require('helmet');
const db = require('./db/index.js');
const loginRouter = require('./router/login.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const server = require('http').createServer(app); 
const io = require('socket.io')(server);

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
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
//配置body-parser模块来方便获取post请求的表单内容
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
app.use('/static/',express.static(path.join(__dirname,'./static/')));
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
let players = [], inRooms = [];
let isPlaying = false;
let startTimer, startCount; //开始游戏倒计时
let turnTimer, turnAnswer, turnTip, turnCount = 10, turnIndex=0; //回合相关
const DRAW_ROOM = 'DRAW_ROOM';
io.on('connection', function(socket){
	console.log('一个用户连接到了socket');
	socket.on('chat message', function(msg){
		console.log(msg)
		io.emit('chat message', msg);
	});
	socket.on('joinDrawRoom', function({name,id}){
		socket.join(DRAW_ROOM);
		//记录到inRooms
		inRooms.push({name, score:0});
		//记录到players
		if(!isPlaying){ 
			players.push({name, score:0});
		}
		io.to(DRAW_ROOM).emit('joinDrawRoom', {msg:{name:'',content:`欢迎${name}加入了房间`}, players});
		
		if(inRooms.length>=2 && !isPlaying){ //开始倒计时
			io.to(DRAW_ROOM).emit('willStart', {msg: {name:'',content:'如果不来人的话5秒后就开始了'}});
			clearTimeout(startTimer);
			startTimer = setTimeout(() => {
				//开始游戏
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
	if(turnIndex>players.length-1){
		isPlaying = false;
		io.to(DRAW_ROOM).emit('turnOver', {msg: '游戏结束了'});
		turnIndex = 0;
		players = [];
		console.log('游戏结束');
		return
	}
	
	turnCount = 10;
	console.log(turnIndex+'回合')
	//发送画者信息
	io.to(DRAW_ROOM).emit('turnPainter', {name:players[turnIndex].name, title: '脑残'});
	
	turnTimer = setInterval(() => {
		turnCount--;
		io.to(DRAW_ROOM).emit('turnCount', {turnCount});
		if(turnCount>0 && turnCount<=5){ //一定时间后发送提示
			io.to(DRAW_ROOM).emit('turnTip', {turnTip});
		}else if(turnCount<=0){ //回合结束
			clearInterval(turnTimer);
			turnIndex++;
			console.log('即将进入下一回合')
			setTimeout(() => {
				turnLogic();
			}, 5000);
		}
	},1000);
	
	
}


server.listen(5000, () => {
	console.log('server is running...');
});