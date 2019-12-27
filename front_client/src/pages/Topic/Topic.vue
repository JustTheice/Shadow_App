<template>
	<section>
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
		methods: {
			loadInit(ev){
				// new BScroll(ev.target, {
				// 	scrollX: false,
				// 	scrollY: true,
				// 	click: true
				// });
			}
		}
	}
</script>

<style lang="less">
	section{
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
