<template>
	<header id="header-top">
		<slot name="left"></slot>
		<h2>{{title}}</h2>
		<router-link to="/profile" v-show="$route.path!='/profile'">
			<img src="./img/avatar.png" alt="头像">
		</router-link>
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
		height: 1.7rem;
		background: deepskyblue;
		position: relative;
		z-index: 10;
		.left{
			position: absolute;
			display: block;
			top: 0;
			left: .2rem;
			height: 1.6rem;
			padding: .05rem;
			line-height: 1.6rem;
			background: deepskyblue;
			color: whitesmoke;
			font-size: 1rem!important;
		}
		h2{
			text-align: center;
			width: 50%;
			margin: 0 auto;
			color: white;
			height: 100%;
			font-size: 1.15rem;
			line-height: 1.7rem;
		}
		a{
			display: block;
			font-size: 1.6rem!important;
			width: 1.6rem;
			height: 1.6rem;
			padding: .05rem;
			border-radius: 50%;
			position: absolute;
			right: .2rem;
			top: 0;
			img{
				height: 100%;
				display: block;
				border-radius: 50%;
				
			}
		}
	}
</style>
