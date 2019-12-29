const express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');


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

router.get('/getImgCode', (req, res, next) => {
	getImgCode(req, res, next);
});

module.exports = router;