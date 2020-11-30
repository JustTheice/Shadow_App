<template>
	<section id="user-info">
		<div class="top">
			<div class="back iconfont icon-back" @touchend="btnBack">
			</div>
			<h2>个人资料</h2>
		</div>
		<form action="/">
			<div class="up-avatar">
				<div class="left">
					<img :src="userInfo.avatar ? userInfo.avatar : './static/img/avatar.png'" ref="seeImg"/>
				</div>
				<div class="right">
					<input type="file" @change="uploadAvatar" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif">
					<div class="feign">
						<button>点击选择图片</button>
					</div>
				</div>
			</div>
			<!-- <mt-field label="头像" placeholder="上传头像" @change="uploadAvatar" type="file" rows="4"></mt-field> -->
			<mt-field label="昵称" placeholder="请输入用户名" v-model="userInfo.name"></mt-field>
			<mt-field label="爱好" v-model="userInfo.hobbies"></mt-field>
			<mt-field label="生日" placeholder="请输入生日" type="date" v-model="userInfo.birthday"></mt-field>
			<mt-field label="自我介绍" type="textarea" rows="4" v-model="userInfo.introduction"></mt-field>
			<input type="hidden" v-model="userInfo._id">
			<mt-button type="default" size="large" @touchend.prevent.navtive="sendChange">确认修改</mt-button>
		</form>
	</section>
</template>

<script>
	import {mapState} from 'vuex';
	import { MessageBox } from 'mint-ui';
	import {updateInfo, uploadAvatar} from '../../api/server.js'
	export default {
		props: ['shows', 'backFn', 'avatarWrap'],
		data(){
			return {
				
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			sendChange(){
				updateInfo(this.userInfo).then(
					(ret) => {
						MessageBox('', '修改成功');
						this.shows.userInfo = false;
					},
					(err) => {
						MessageBox('', '修改失败，请稍后再试');
						console.log('发送失败'+err)
					}
				)
			},
			btnBack(){
				window.history.back();
			},
			uploadAvatar(event){ //上传头像
				if(event.target.files.length>0){
					let avatar = event.target.files[0];
					let file = new window.FormData();
					file.append('avatar', avatar);
					// let files = event.target.value;
					uploadAvatar(file).then(
						(ret) => {
							console.log(ret);
							if(ret.code===0){
								this.$store.dispatch('saveUser', {userInfo: ret.data});
								// document.querySelector('.left').removeChild(document.querySelector('.left>img'))
								// let newAvatar = new Image();
								// newAvatar.src = ret.data.avatar+'?'+Date.now();
								// document.querySelector('.left').appendChild(newAvatar);
								// let avatarWrap = this.avatarWrap;
								// avatarWrap.removeChild(avatarWrap.querySelector('img'));
								// avatarWrap.appendChild(newAvatar);
							}
						}
					);
				}
					
			},
		},
		
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
		z-index: 20;
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
		.up-avatar{
			width: 100%;
			height: 3rem;
			background: white;
			.left{
				box-sizing: border-box;
				width: 5rem;
				height: 100%;
				float: left;
				img{
					display: block;
					padding: .25rem;
					width: 2.5rem;
					height: 2.5rem;
					border-radius: 50%;
				}
			}
			.right{
				width: 11rem;
				float: right;
				height: 100%;
				position: relative;
				input{
					width: 8rem;
					height: 2rem;
					position: absolute;
					right: 2rem;
					top: 50%;
					transform: translateY(-50%);
					z-index: 5;
					display: block;
					opacity: 0;
				}
				.feign{
					position: absolute;
					right: 2rem;
					top: 50%;
					transform: translateY(-50%);
					width: 8rem;
					height: 2rem;
					z-index: 4;
					button{
						color: rgb(25,25,25);
						display: block;
						width: 100%;
						height: 100%;
						border: 1px solid rgb(25,25,25);
						border-radius: .3rem;
						background: whitesmoke;
						font-size: 1rem;
						line-height: 2rem;
					}
				}
			}
			
		}
	}
</style>
