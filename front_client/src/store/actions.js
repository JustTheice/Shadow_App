import apis from '../api/';
export default {
	async getNews({commit,state}, {type,cb}){
		let fn = 'req'+type+'News';
		let ret = await apis[fn]();
		if(ret.code === 200){
			commit('UPDATE_NEWS', {type,news: ret.newslist});
		}
		cb && cb(type);
	}
}