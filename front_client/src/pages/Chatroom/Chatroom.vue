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
					<li>
						<span class="title">我</span>
						<div>
							<span class="iconfont icon-avatar">头像</span>
							<p>内容</p>
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
			let scale = document.documentElement.clientWidth/16;
			let chatWrap = this.$refs.chatroom;
			chatWrap.style.height = (document.documentElement.clientHeight-document.querySelector('#nav').offsetHeight) + 'px';
			chatWrap.querySelector('.content').style.height = (chatWrap.offsetHeight - chatWrap.querySelector('header').offsetHeight - chatWrap.querySelector('.recreations').offsetHeight-2*scale) + 'px';
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
						.title{
							font-size: .5rem;
							>div{
								display: inline-block;
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
					height: 1.6rem;
					vertical-align: 0.05rem;
				}
			}
		}
	}
</style>
