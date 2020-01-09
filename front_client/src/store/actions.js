import apis from '../api/news.js';
import {reqLogin} from '../api/server.js';
export default {
	async getNews({commit,state}, {type,cb}){ //获取新闻
		let fn = 'req'+type+'News';
		let ret = await apis[fn]();
		if(ret.code === 200){
			if(type == 'Film'){
				ret.newslist.forEach((item,index) => {
					let indexId = item.url.split('/')[item.url.split('/').length-1];
					item.url = 'http://127.0.0.1:5000/film/'+indexId;
				});
			}
			commit('UPDATE_NEWS', {type,news: ret.newslist});
		}
		cb && cb(type);
	},
	saveUser({commit}, {userInfo}){ //存储用户信息
		commit('UPDATE_USERINFO', {userInfo});
	},
	updateSize({commit}, {newV}){ //调节字体
		newV *= 0.4;
		commit('UPDATE_SIZE', {newV})
	},
	"SOCKET_chat message"({commit}, item) { //更新聊天室消息记录
		commit('UPDATE_CHAT_MSG',{item});
	}
}