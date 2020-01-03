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
	console.log(111);
})

//设置允许跨域访问该服务.

app.use(helmet({
  frameguard: true  // 允许iframe
}));



//socket服务
io.on('connection', function(socket){
	console.log('一个用户连接到了socket');
	socket.on('chat message', function(msg){
		console.log(msg)
		io.emit('chat message', msg);
	});
})

server.listen(5000, () => {
	console.log('server is running...');
});