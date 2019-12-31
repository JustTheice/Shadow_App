const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	name: {type: String, required: false},
	phone: {type: String, required: false},
	pwd: {type: String, required: false},
	gender: {type: Number, default: 2, enum: [0,1,2]}, //性别, 0男1女2保密
	birthday: {type: String, required: false},
	lv: {type: Number, default: 1},
	experience: {type: Number, default: 0},
	hobbies: {type: String, required: false},
	introduction: {type: String, required: false},
	integral: {type: Number, default: 0},
	state: {type: Number, default: 0, enum: [0,1,2]}, //账号状态, 0正常1禁言2冻结
});

module.exports = mongoose.model('User', Schema);