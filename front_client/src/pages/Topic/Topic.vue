<template>
	<section ref="topic" id="topic">
		<HeaderTop title="新闻页">
			<a href="javacript:;" slot="left" class="iconfont icon-back left" @touchstart="$router.back()"></a>
		</HeaderTop>
		<div class="table">
			<!-- <a href="http"></a> -->
		</div>
		<iframe scrolling="auto" :src="url" @load="loadInit"></iframe>
	</section>
</template>

<script>
	import BScroll from 'better-scroll';
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	export default {
		components:{
			HeaderTop
		},
		data(){
			return {
				url: this.$route.query.url
			}
		},
		mounted() {
		  if (window.history && window.history.pushState) {
		    history.pushState(null, null, document.URL);
		    window.addEventListener('popstate', this.backFn, false);//false阻止默认事件
		  }
		},
		destroyed() {
			window.removeEventListener('popstate', this.backFn, false);
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
				this.$router.back();
			}
		}
	}
</script>

<style lang="less">
	#topic{
		overflow: hidden;
		height: 100%;
		.table{}
		iframe{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
