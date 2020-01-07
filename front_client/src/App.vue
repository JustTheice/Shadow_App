<template>
  <div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
    <FooterNav v-show="$route.meta.showFooter"></FooterNav>
  </div>
</template>

<script>
	import FooterNav from './components/FooterNav/FooterNav.vue';
	import {autoLogin} from './api/server.js';
	export default {
		components: {FooterNav},
		name: 'App',
		mounted() {
			//设置总宽为16rem，开启自适应布局
			let remStyle = document.createElement('style');
			remStyle.innerHTML = `html{font-size: ${document.documentElement.clientWidth/16}px!important}`;
			document.head.appendChild(remStyle);
			
			//自动登录
			autoLogin().then(
				(ret) => {
					if(ret.code===0){
						this.$store.dispatch('saveUser', {userInfo: ret.data});
					}
				},
				(err) => {
					console.log('自动登陆失败'+err)
				}
			);
			
			let vm = this;
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	#app{
		height: 100%;
		overflow: hidden;
	}
</style>
