<template>
	<section>
		<HeaderTop title="新闻页">
			<a href="javacript:;" slot="left" class="iconfont icon-back left" @touchstart="$router.back()"></a>
		</HeaderTop>
		<div class="table">
		</div>
		<iframe src="http://baidu.com"></iframe>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	export default {
		components:{
			HeaderTop
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
