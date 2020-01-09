<template>
	<section ref="topic" id="topic">
		<HeaderTop title="新闻页">
			<a href="javacript:;" slot="left" class="iconfont icon-back left" @touchend="btnBack"></a>
		</HeaderTop>
		<div class="table">
			<!-- <a href="http"></a> -->
		</div>
		<!-- <iframe scrolling="auto" :src="url"></iframe> -->
	</section>
</template>

<script>
	import BScroll from 'better-scroll';
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	export default {
		props: ['shows', 'url'],
		components:{
			HeaderTop
		},
		data(){
			return {
				
			}
		},
		watch: {
			url: { //监视shows，如果有一个二级组件被加载，则加载一次历史记录以供返回到一级页面
				handler(newV){ 
					// for (let key in v) {
					// 	if(v[key]){
					// 		window.history.pushState(null, null, '#/news');
					// 	}
					// }
					//摧毁iframe以免生成历史纪录
					let topic = this.$refs.topic;
					let oldI = topic.querySelector('iframe');
					if(oldI){
						topic.removeChild(oldI);
					}
					//创建新iframe
					let newI = document.createElement('iframe');
					newI.src = this.url;
					this.$refs.topic.appendChild(newI);
				}
			},
			shows: {
				deep: true,
				handler(newV){
					for (let key in newV) {
						if(newV[key]){
							window.history.pushState(null, null, '#/news');
						}
					}
				}
			}
		},
		mounted() {
		},
		destroyed() {
			// window.removeEventListener('popstate', this.backFn, false);
		},
		methods: {
			loadInit(ev){
				// new BScroll(ev.target, {
				// 	scrollX: false,
				// 	scrollY: true,
				// 	click: true
				// });
			},
			backFn(){
				this.shows.topic = false;
			},
			btnBack(){
				window.history.back();
			}
		}
	}
</script>

<style lang="less">
	#topic{
		position: absolute;
		z-index: 30;
		top: 0;
		left: 0;
		transition: .3s;
		background: white;
		transform: translateX(100%);
		overflow: hidden;
		width: 100%;
		height: 100%;
		.table{}
		iframe{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
