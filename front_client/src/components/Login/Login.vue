<template>
	<section id="login" ref="wrap">
		<div class="back iconfont icon-back" @click="shows.login=false">
		</div>
		<div id="container">
			<div class="type">
				<h3 @click="type='pwd'">密码登录</h3>
				<h3 @click="type='phone'">手机登录</h3>
				<div class="slide" :style="{left: type=='pwd'?'.5rem':'6.5rem'}"></div>
			</div>
			<div class="pwd" v-show="type=='pwd'">
				<mt-field label="用户名" placeholder="昵称/手机号" v-model="pwdData.name"></mt-field>
				<mt-field label="密码" placeholder="密码" type="password" v-model="pwdData.pwd"></mt-field>
				<mt-field label="验证码" placeholder="不分大小写" type="text" v-model="pwdData.pwd">
					<img src="http://localhost:5000/getImgCode" alt="验证码" class="img-code">
				</mt-field>
				<mt-button type="primary" size="large">注册/登录</mt-button>
			</div>
			<div class="phone" v-show="type=='phone'">
				<mt-field label="手机号" placeholder="仅支持中国大陆" type="tel" v-model="phoneData.phone">
					<mt-button type="primary" size="small">获取</mt-button>
				</mt-field>
				<mt-field label="验证码" placeholder="短信验证码" type="password" v-model="pwdData.phoneCode"></mt-field>
				<mt-button type="primary" size="large">注册/登录</mt-button>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		props: ['shows'],
		mounted() {
			
		},
		data(){
			return {
				type: 'pwd',
				pwdData: {
					name: '',
					pwd: '',
					imgCode: ''
				},
				phoneData: {
					phone: '',
					imgCode: '',
					phoneCode: ''
				}
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#login{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		transform: translateX(100%);
		background: whitesmoke;
		transition: .3s;
		.back{
			position: absolute;
			left: .8rem;
			top: .8rem;
			font-size: 1rem;
		}
		#container{
			.clearfix();
			width: 12rem;
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%,-50%);
			.type{
				width: 100%;
				display: flex;
				justify-content: space-around;
				height: 2rem;
				position: relative;
				h3{
					// border-bottom: .2rem greenyellow;
					width: 5rem;
					padding: .5em;
					text-align: center;
				}
				.slide{
					position: absolute;
					width: 5rem;
					height: .15rem;
					background: limegreen;
					bottom: 0;
					left: .5rem;
					transition: .2s;
				}
				
			}
			.pwd{
				.mint-field-other{
					.img-code{
						width: 4rem;
					}
				}
			}
			.mint-cell-title{
				width: 30%;
				height: 1rem;
			}
		}
	}
</style>
