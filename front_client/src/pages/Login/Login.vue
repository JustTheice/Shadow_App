<template>
	<section id="login">
		<div id="container">
			<div class="pwd">
				<mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
				<mt-field label="password" placeholder="Input password" type="password" v-modal="password"></mt-field>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		
	}
</script>

<style lang="less">
	#login{
		width: 100%;
		height: 100%;
		position: relative;
		.container{
			width: 8rem;
			height: 5rem;
			background: black;
			position: absolute;
			left: 50%;
			height: 50%;
			transform: translate(-50%,-50%);
		}
	}
</style>
