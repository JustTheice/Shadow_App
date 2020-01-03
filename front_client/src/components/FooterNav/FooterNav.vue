<template>
	<Nav id='nav'>
		<router-link to="/news" :class="{active: $route.path=='/news'}">
			<i class="iconfont icon-news"></i>
			<h2>资讯</h2>
		</router-link>
	
		<router-link to="chatroom" :class="{active: $route.path=='/chatroom'}">
			<i class="iconfont icon-chatroom"></i>
			<h2>聊天室</h2>
		</router-link>
	
		<router-link to="tools" :class="{active: $route.path=='/tools'}">
			<i class="iconfont icon-tools"></i>
			<h2>工具箱</h2>
		</router-link>
	
		<router-link to="profile" :class="{active: $route.path=='/profile'}">
			<i class="iconfont icon-profile"></i>
			<h2>我的</h2>
		</router-link>
	</Nav>
</template>

<script>
	export default{
		
	}
</script>

<style lang="less">
	#nav{
		width: 100%;
		height: 2.5rem;
		background: rgb(233,233,233);
		position: fixed;
		bottom: 0;
		/* flex布局 */
		display: flex;
		/* 主轴为x轴正方向 */
		flex-direction: row;
		flex-wrap: nowrap;
		/* 主轴和副轴对齐方式 */
		justify-content: space-around;
		align-items: center;
		a{
			display: block;
			width: 2rem;
			height: 2.1rem;
			text-align: center;
			color: gray;
			&.active{
				color: deepskyblue;
			}
			i{
				font-size: 1.5rem;
			}
			h2{
				padding-top: .1rem;
				font-size: .52rem;
			}
		}
	}
</style>
