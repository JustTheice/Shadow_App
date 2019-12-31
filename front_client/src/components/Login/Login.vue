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
				<mt-field label="验证码" placeholder="不分大小写" type="text" v-model="pwdData.imgCode">
					<img :src="imgCodeSrc" alt="验证码" class="img-code" @click="getImgCode"/>
				</mt-field>
				<mt-button type="primary" size="large" @click="login()">注册/登录</mt-button>
			</div>
			<div class="phone" v-show="type=='phone'">
				<mt-field label="手机号" placeholder="仅支持中国大陆" type="tel" v-model="phoneData.phone">
					<mt-button type="primary" size="small" @click.native="getPhoneCode" v-show="!codeCount">获取</mt-button>
					<span v-show="codeCount">{{codeCount}}s</span>
				</mt-field>
				<mt-field label="验证码" placeholder="短信验证码" type="password" v-model="phoneData.phoneCode"></mt-field>
				<mt-button type="primary" size="large" @click="login">注册/登录</mt-button>
			</div>
		</div>
	</section>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import {reqPhoneCode, reqLogin, autoLogin} from '../../api/server.js';
	export default {
		props: ['shows'],
		mounted() {
			autoLogin().then(
				(ret) => {
					if(ret.code===0){
						this.$store.dispatch('saveUser', {userInfo: ret.data});
					}
				},
				(err) => {
					console.log('自动登陆失败'+err)
				}
			)
		},
		computed: {
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
				},
				imgCodeSrc: 'http://192.168.2.104:5000/getImgCode?'+Date.now(),
				codeCount: 0
			}
		},
		methods: {
			login(){ //注册/登录
				let {type, pwdData, phoneData} = this;
				let sendData;
				if(type=='pwd'){ //密码登录，前端检查用户名、密码、验证码位数是否正确
					let {name, pwd, imgCode} = pwdData;
					if(!name){
						return MessageBox('格式错误', '用户名不能为空');
					}
					if(!pwd){
						return MessageBox('格式错误', '密码不能为空');
					}
					if(imgCode.length!=4){
						return MessageBox('格式错误', '图片验证码只能是4位');
					}
					sendData = {type:'pwd', data: {name,pwd,imgCode}};
				}else if(type="phone"){
					let {phone, phoneCode} = phoneData;
					if(!/^1\d{10}$/.test(phone)){
						return MessageBox('格式错误', '手机号格式错误且仅支持中国大陆号');
					}
					if(phoneCode.length!=6){
						return MessageBox('格式错误', '短信验证码只能是6位');
					}
					sendData = {type:'phone', data: {phone,phoneCode}};
				}
				//发送请求
				reqLogin(sendData).then(
					(ret) => {
						if(ret.code===0){
							this.$store.dispatch('saveUser', {userInfo: ret.data});
							MessageBox('验证消息', '登录成功');
							this.shows.login = false;
						}else if(ret.code===1 || ret.code===2){
							MessageBox('验证消息', ret.msg);
						}
					},
					(err) => {
						console.log(err);
					}
				)
			},
			
			getImgCode(){ //重新加载图形验证码
				this.imgCodeSrc = 'http://192.168.2.104:5000/getImgCode?'+Date.now();
			},
			
			getPhoneCode(){ //获取手机验证码
				if(!/^1\d{10}$/.test(this.phoneData.phone)){
					return MessageBox('格式错误', '手机号格式错误且仅支持中国大陆号');
				}
				reqPhoneCode(this.phoneData.phone).then(
					(ret) => {},
					(err) => {}
				);
				this.codeCount = 30;
				let phoneTimer = setInterval(() => {
					this.codeCount--;
					if(this.codeCount===0){
						clearInterval(phoneTimer);
					}
				}, 1000);
			},
		
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
