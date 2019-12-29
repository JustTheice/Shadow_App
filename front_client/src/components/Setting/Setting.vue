<template>
	<section id="setting">
		<div class="back iconfont icon-back" @click="shows.setting=false"></div>
		<div class="font-setting">
			<h3 class="adjust">字体大小</h3>
			<div class="right">
				<mt-range v-model="fontLv" :min="1" :max="4" value="2">
				  <div slot="start" style="font-size: .5rem;">小</div>
				  <div slot="end" style="font-size: 1.5rem;">大</div>
				</mt-range>
			</div>
		</div>
		<div class="change-pwd">
			<h3>修改密码</h3>
			<mt-field label="旧密码" placeholder="请输入旧密码" type="password" v-model="pwds.oldPwd"></mt-field>
			<mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="pwds.newPwd"></mt-field>
			<mt-button size="large" type="primary">确认修改</mt-button>
		</div>
		<div class="logout">
			<mt-button size="large" type="danger">退出账号</mt-button>
		</div>
		<div class="logoff">
			<mt-button size="large" type="danger">注销账号</mt-button>
		</div>
	</section>
</template>

<script>
		
	export default {
		props: ['shows'],
		data(){
			return {
				fontLv: 2,
				pwds: {
					oldPwd: '',
					newPwd: ''
				}
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#setting{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(100%);
		background: whitesmoke;
		transition: .3s;
		z-index: 10;
		color: rgb(25,25,25);
		.back{
			position: absolute;
			left: .8rem;
			top: .8rem;
			font-size: 1rem;
		}
		.font-setting{
			width: 16rem;
			box-sizing: border-box;
			padding: .5rem 1rem .5rem 1rem;
			margin-top: 3rem;
			// border-top: 1px solid;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.oneLine(rgb(50,50,50));
			&::before{
				width: 14rem;
			}
			h3{
				width: 30%;
			}
			.right{
				width: 60%;
			}
		}
		.change-pwd{
			padding: .5rem 1rem .5rem 1rem;
			box-sizing: border-box;
			h3{
				margin: .5rem 0;
			}
			
			.oneLine(rgb(50,50,50));
			&::before{
				width: 14rem;
			}
		}
		.logout{
			padding: .5rem 1rem .5rem 1rem;
			box-sizing: border-box;
			.oneLine(rgb(50,50,50));
			&::before{
				width: 14rem;
			}
		}
		.logoff{
			padding: .5rem 1rem .5rem 1rem;
			box-sizing: border-box;
			.oneLine(rgb(50,50,50));
			&::before{
				width: 14rem;
			}
		}
		.mint-cell-title{
			height: 1.1rem;
		}
	}
</style>
