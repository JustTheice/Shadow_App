<template>
	<section id="profile">
		<HeaderTop title="个人信息"></HeaderTop>
		<div id="info">
			<div class="avatar">
				<i class="iconfont icon-avatar"></i>
			</div>
			<div class="right">
				<div class="not-login" v-show="false">
					<p>登陆/注册&gt;&gt;</p>
				</div>
				<div class="logined">
					<p>
						<strong>昵称</strong>
						<strong>LV1</strong>
					</p>
					<p>今日未签到</p>
				</div>
			</div>
		</div>
		<div id="cells">
			<mt-cell title="我的积分" is-link>
			  <span slot="icon" class="iconfont icon-score"></span>
			</mt-cell>
			<mt-cell title="设置" is-link>
			  <span slot="icon" class="iconfont icon-setting"></span>
			</mt-cell>
		</div>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import { Cell } from 'mint-ui';
	export default{
		components: {
			HeaderTop,
		}
	}
</script>

<style lang="less">
	#profile{
		#info{
			width: 16rem;
			height: 5.83rem;
			background: url(./img/info-bg.jpg);
			background-size: 100% 100%;
			.avatar{
				float: left;
				box-sizing: border-box;
				padding: 1rem;
				width: 5.83rem;
				height: 5.83rem;
				margin-left: 1rem;
				text-align: center;
				line-height: 3.83rem;
				i{
					position: relative;
					font-size: 3.5rem;
					color: yellow;
					&&:before{
						position: absolute;
						bottom: .1rem;
						left: 90%;
						display: block;
						background: orangered;
						content: 111;
					}
				}
			}
			.right{
				float: left;
				width: 9.17rem;
				height: 100%;
				div{
					color: whitesmoke;
					font-size: 1rem;
					&.not-login{
						p{
							text-align: center;
							line-height: 5.83rem;
						}
					}
					&.logined{
						padding: 1.3rem;
						p:nth-child(1){
							strong{
								&:nth-child(1){
									font-size: 1.5rem;
									vertical-align: middle;
								}
								&:nth-child(2){
									width: 2rem;
									font-size: 1rem;
									display: inline-block;
									background: orangered;
									border-radius: 20%;
									vertical-align: middle;
									text-align: center;
								}
							}
						}
						p{
							margin-top: 0.2rem;
						}
					}
				}
			}
		}
	}
</style>
