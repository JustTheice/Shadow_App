<template>
	<section id="chatroom" ref="chatroom">
		<HeaderTop title="聊天室"></HeaderTop>
		<div class="recreations">
			<div>
				<h3>你画我猜</h3>
				<ul>
					<li>房间1</li>
				</ul>
			</div>
		</div>
		<div class="chatbox">
			<div class="content">
				<ul>
					<li class="others">
						<img src="./img/avatar.png" alt="头像">
						<div>
							<p class="name">其他人说：</p>
							<p class="msg">说说说屁啊啊啊 啊啊啊啊说说说屁啊啊啊 啊啊啊啊说说说屁啊啊啊 啊啊啊啊</p>
						</div>
					</li>
					<li class="self">
						<img src="./img/avatar.png" alt="头像">
						<div>
							<p class="name">我说：</p>
							<p class="msg">说说说屁啊啊啊 啊啊啊啊说说说屁啊啊啊 啊啊啊啊说说说屁啊啊啊 啊啊啊啊</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="control">
				<input type="text">
				<mt-button type="primary">发送</mt-button>
			</div>
		</div>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import { Button } from 'mint-ui';
	export default{
		components: {
			HeaderTop,
		},
		mounted() {
			this.initH();
			window.onresize = () => {
				this.initH();
			}
		},
		methods: {
			initH(){ //动态设置高度
				let scale = document.documentElement.clientWidth/16;
				let chatWrap = this.$refs.chatroom;
				chatWrap.style.height = (document.documentElement.clientHeight-document.querySelector('#nav').offsetHeight) + 'px';
				chatWrap.querySelector('.content').style.height = (chatWrap.offsetHeight - chatWrap.querySelector('header').offsetHeight - chatWrap.querySelector('.recreations').offsetHeight-2*scale) + 'px';
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#chatroom{
		position: relative;
		.recreations{
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
				line-height: 2rem;
				padding: 0 .4rem;
				position: absolute;
				bottom: 0;
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
					height: 1.6rem;
					vertical-align: 0.05rem;
				}
			}
		}
	}
</style>
