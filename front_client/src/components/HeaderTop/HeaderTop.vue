<template>
	<header>
		<router-link class="iconfont icon-avatar" to="/profile" v-show="$route.path!='/profile'"></router-link>
		<h2>{{title}}</h2>
	</header>
</template>

<script>
	export default{
		props: ['title'],
	}
</script>

<style lang="less">
	header{
		width: 100%;
		height: 2rem;
		background: deepskyblue;
		h2{
			text-align: center;
			width: 50%;
			margin: 0 auto;
			color: white;
			height: 100%;
			font-size: 1.2rem;
			line-height: 2rem;
		}
		a{
			display: block;
			font-size: 1.6rem!important;
			width: 1.6rem;
			height: 1.6rem;
			padding: .2rem;
			border-radius: 50%;
			float: right;
		}
	}
</style>
