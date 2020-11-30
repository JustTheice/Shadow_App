import saveUtil from '../saveUtil/index.js';
export default {
	news: {
		IT: [],
		Game: [],
		Film: [],
		Cartoon: [],
		Internet: []
	},
	userInfo: {
		
	},
	settings: {
		adjustSize: (saveUtil.read('FONT_SIZE')&&typeof saveUtil.read('FONT_SIZE')!='object') ? saveUtil.read('FONT_SIZE') : 2
	},
	chatMsgs: []
}