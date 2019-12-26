export default {
	UPDATE_NEWS(state, {news,type}){ //更新新闻数据
		state.news[type] = news;
	}
}