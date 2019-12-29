<template>
	<section id="user-info">
		<div class="top">
			<div class="back iconfont icon-back" @click="shows.userInfo=false">
			</div>
			<h2>个人信息</h2>
		</div>
		<form action="/">
			<mt-field label="昵称" placeholder="请输入用户名" v-model="info.username"></mt-field>
			<mt-field label="爱好" v-model="info.hobbies"></mt-field>
			<mt-field label="生日" placeholder="请输入生日" type="date" v-model="info.birthday"></mt-field>
			<mt-field label="自我介绍" type="textarea" rows="4" v-model="info.introduction"></mt-field>
			<input type="hidden" v-model="info.status">
			<mt-button type="default" size="large">确认修改</mt-button>
		</form>
	</section>
</template>

<script>
	export default {
		props: ['shows'],
		data(){
			return {
				info: {
					username: '',
					hobbies: '',
					status: 0,
					birthday: '',
					introduction: ''
				}
			}
		}
	}
</script>

<style lang="less">
	#user-info{
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(100%);
		transition: .3s;
		background: whitesmoke;
		.top{
			width: 100%;
			height: 2rem;
			.back{
				float: left;
				height: 100%;
				text-align: center;
				width: 1.5rem;
				font-size: 1rem;
				line-height: 2rem;
			}
			h2{
				text-align: center;
				width: 50%;
				margin: 0 auto;
				line-height: 2rem;
				color: rgb(25,25,25);
			}
		}
		
	}
</style>
