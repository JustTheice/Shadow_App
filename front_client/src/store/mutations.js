export default {
	UPDATE_NEWS(state, {news,type}){ //更新新闻数据
		state.news[type] = news;
	},
	UPDATE_USERINFO(state, {userInfo}){
		state.userInfo = userInfo;
	},
	UPDATE_SIZE(state, {newV}){
		state.settings.adjustSize = newV;
	}
}