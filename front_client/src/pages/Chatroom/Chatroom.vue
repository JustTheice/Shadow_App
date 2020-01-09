<template>
	<section id="chatroom" ref="chatroom">
		<HeaderTop title="聊天室"></HeaderTop>
		<div class="recreations">
			<div>
				<h3 @touchstart="$router.push('/drawsth')">你画我猜</h3>
				<ul>
					<li>房间1</li>
				</ul>
			</div>
		</div>
		<div class="chatbox">
			<div class="content" ref="content">
				<ul id="msgUl">
					<li v-for="(msg,index) in chatMsgs" :class="msg.name==$store.state.userInfo.name?'self':'others'" :key="index">
						<img src="./img/avatar.png" alt="头像">
						<div>
							<p class="name">{{msg.name==$store.state.userInfo.name?'我':msg.name}}说：</p>
							<p class="msg adjust" :style="{'font-size': settings.adjustSize+'rem'}">{{msg.msg}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="control">
				<div class="can-send">
					<input type="text" v-model="chatMsg">
					<mt-button type="primary" @click="sendMsg">发送</mt-button>
				</div>
				<div class="to-login" v-show="!$store.state.userInfo._id">
					<p><router-link to="/profile">登录</router-link>后才能参与聊天</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import {mapState} from 'vuex';
	import { Button,Toast } from 'mint-ui';
	import BScroll from 'better-scroll';
	// import io from 'socket.io-client'
	export default{
		components: {
			HeaderTop,
		},
		data(){
			return {
				chatMsg: '',
				msgScroll: {}
			}
		},
		mounted() {
			this.initH();
			window.onresize = () => {
				this.initH();
			};
			
			this.msgScroll = new BScroll(this.$refs.content, {
				scrollY: true,
				scrollX: false,
				click: true,
			});
			
			Toast('由于家境贫寒，聊天室及多人游戏仅对家里局域网开放');
		},
		computed: {
			...mapState(['settings','chatMsgs'])
		},
		watch: {
			chatMsgs: {
				deep: true,
				handler(v){
					if(this.msgScroll.y<=this.msgScroll.maxScrollY){
						this.$nextTick(() => {
							this.msgScroll.refresh()
							this.msgScroll.scrollTo(0, this.msgScroll.maxScrollY, 200)
						});
					}
					
				}
			}
		},
		methods: {
			initH(){ //动态设置高度
				let scale = document.documentElement.clientWidth/16;
				let chatWrap = this.$refs.chatroom;
				chatWrap.style.height = (document.documentElement.clientHeight-document.querySelector('#nav').offsetHeight) + 'px';
				chatWrap.querySelector('.content').style.height = (chatWrap.offsetHeight - chatWrap.querySelector('header').offsetHeight - chatWrap.querySelector('.recreations').offsetHeight-2*scale) + 'px';
			},
			sendMsg(){
				let {chatMsg} = this;
				if(!chatMsg){
					return;
				}
				this.$socket.emit('chat message', {name:this.$store.state.userInfo.name, msg:chatMsg});
				this.chatMsg = '';
			},
			drawSth(){
				Toast('即将开放，敬请期待！');
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#chatroom{
		position: relative;
		.recreations{
			position: relative;
			z-index: 30;
			width: 100%;
			display: flex;
			flex-direction: row;
			height: 2rem;
			justify-content: flex-start;
			align-items: center;
			background: rgb(235,235,235);
			>div{
				width: 5rem;
				height: 1.6rem;
				background: deepskyblue;
				border-radius: .2rem;
				h3{
					line-height: 1.5rem;
					text-align: center;
					font-size: 1rem;
					color: white;
				}
				ul{
					width: 100%;
					height: 0;
					transition: .5s;
					li{
						overflow: hidden;
						height: 0;
					}
				}
			}
		}
		.chatbox{
			.content{
				background: rgb(245,245,245);
				.oneLine(gray);
				ul{
					// height: 1500px;
					li{
						.clearfix();
						padding: .5rem;
						>img{
								font-size: 2rem;
								width: 2rem;
								height: 2rem;
							}
						>div{
							p{
								font-size: .8rem;
								&.name{
									padding: .1rem 0;
									font-size: .7rem;
								}
								&.msg{
									clear: both;
									word-break: break-all;
									margin-top: .2rem;
									padding: .3rem;
									border-radius: .2rem;
									position: relative;
									max-width: 8rem;
								}
							}
						}
						&.others{
							>img{
								float: left;
							}
							>div{
								float: left;
								p{
									&.name{
										float: left;
										margin-left: .5rem;
									}
									&.msg{
										background: rgba(50,220,50,.8);
										left: .5rem;
										&::before{
											position: absolute;
											top: .3rem;
											left: -.5rem;
											.triangle(left, .5rem, rgba(50,220,50,.8));
										}
									}
								}
							}
						}
						&.self{
							>img{
									float: right;
								}
							>div{
								float: right;
								p{
									&.name{
										float: right;
										margin-right: .5rem;
									}
									&.msg{
										background: rgba(20,200,220,.8);
										right: .5rem;
										&::before{
											position: absolute;
											top: .3rem;
											right: -.5rem;
											.triangle(right, .5rem, rgba(20,200,220,.8));
										}
									}
								}
							}
						}
					}
				}
			}
			.control{
				background: rgb(245,245,245);
				height: 2rem;
				width: 100%;
				box-sizing: border-box;
				line-height: 2rem;
				padding: 0 .4rem;
				position: absolute;
				left: 0;
				.can-send{
					input[type=text]{
						color: darkgray;
						display: inline-block;
						width: 12rem;
						height: 1.6rem;
						box-sizing: border-box;
						padding: .1rem;
						line-height: 1.4rem;
						font-size: .9rem;
						border-radius: .2rem;
						outline: none;
						vertical-align: 0.05rem;
					}
					button{
						display: inline-block;
						width: 2.8rem;
						text-align: center;
						font-size: .8rem;
						height: 1.6rem;
						vertical-align: 0rem;
					}
				}
				.to-login{
					font-size: .8rem;
					width: 100%;
					p{
						a{
							color: limegreen;
						}
						margin-left: 3rem;
					}
					position: absolute;
					top: 0;
					left: 0rem;
					background: rgba(230,230,230,.5);
				}
			}
		}
	}
</style>
