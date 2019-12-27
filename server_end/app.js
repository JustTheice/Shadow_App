const express = require('express');
const proxyMiddleWare = require("http-proxy-middleware");
const app = express();
const helmet = require('helmet');




//数据代理
let proxys = {
	target: 'https://hot.cnbeta.com/articles/movie/',
	changeOrigin: true,
	pathRewrite: {// 重写路径
	  '^/film': ''
	}
}
app.use('/film', proxyMiddleWare(proxys)); 
app.use(express.static('./'))


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
	res.setHeader('X-Frame-Options','DENY');
  next();
});
// app.use(helmet({
//   frameguard: false  // 允许iframe
// }));

app.listen(5000, () => {
	console.log('server is running...');
});