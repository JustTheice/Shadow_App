<template>
  <div id="app">
		<router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
	import FooterNav from './components/FooterNav/FooterNav.vue';
	export default {
		components: {FooterNav},
		name: 'App',
		mounted() {
			//设置总宽为16rem，开启自适应布局
			let remStyle = document.createElement('style');
			remStyle.innerHTML = `html{font-size: ${document.documentElement.clientWidth/16}px!important}`;
			document.head.appendChild(remStyle);
		},
	}
</script>

<style lang="less">
	#app{
		height: 100%;
	}
</style>
