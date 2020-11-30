<template>
	<section id="profile">
		<HeaderTop title="个人信息"></HeaderTop>
		<div id="info">
			<div class="avatar" ref="avatarWrap">
				<img :src="userInfo.avatar ? userInfo.avatar : './static/img/avatar.png'">
			</div>
			<div class="right">
				<div class="not-login" v-show="!userInfo._id" @touchstart="shows.login=true">
					<p>登陆/注册&gt;&gt;</p>
				</div>
				<div class="logined" v-show="userInfo._id" @touchstart="shows.userInfo=true">
					<div class="lv">
						<span>LV{{userInfo.lv}}</span>
						<span>弟中弟</span>
					</div>
					<p class="name">
						<strong>{{userInfo.name}}</strong>
					</p>
					<p>今日未签到</p>
				</div>
			</div>
		</div>
		<div id="cells">
			<mt-cell title="我的积分" is-link @touchend.native="shows.score=true">
			  <span slot="icon" class="iconfont icon-score"></span>
			</mt-cell>
			<mt-cell title="设置" is-link to="javascript:;" @touchend.native="shows.setting=true">
			  <span slot="icon" class="iconfont icon-setting"></span>
			</mt-cell>
		</div>
		<Login :style="{transform: shows.login?'translateX(0)':'translateX(100%)'}" :shows="shows"></Login>
		<Setting :style="{transform: shows.setting?'translateX(0)':'translateX(100%)'}" :shows="shows" :userId="userInfo._id"></Setting>
		<UserInfo :style="{transform: shows.userInfo?'translateX(0)':'translateX(100%)'}" :shows="shows" :avatarImg="$refs.avatarWrap"></UserInfo>
		<Score :style="{transform: shows.score?'translateX(0)':'translateX(100%)'}" :shows="shows"></Score>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import Login from '../../components/Login/Login.vue';
	import Setting from '../../components/Setting/Setting.vue';
	import UserInfo from '../../components/UserInfo/UserInfo.vue';
	import Score from '../../components/Score/Score.vue';
	import {mapState} from 'vuex';
	import { Cell, Toast } from 'mint-ui';
	export default{
		components: {
			HeaderTop, Login, Setting, UserInfo, Score
		},
		data(){
			return {
				shows: {
					login: false,
					setting: false,
					userInfo: false,
					score: false
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		watch: {
			shows: { //监视shows，如果有一个二级组件被加载，则加载一次历史记录以供返回到一级页面
				deep: true,
				handler(v){ 
					for (let key in v) {
						if(v[key]){
							window.history.pushState(null, null, '#/profile');
						}
					}
				}
			}
		},
		mounted() {
			Toast('由于家境贫寒，仅在家里局域网环境内才可登陆');
		},
		methods: {
			backFn(ev){
				let vm = this;
				ev.preventDefault();
				let {shows} = vm
				for (let key in shows) {
					if(shows[key]){
						shows[key] = false;
					}
				}
			},
		},
		destroyed() {
			window.removeEventListener('popstate', this.backFn);
		},
		beforeRouteEnter(to, from, next) {
			next(function(vm){
				window.addEventListener('popstate', vm.backFn, false);
			});
		},
		beforeRouteLeave(to, from, next) {
			window.removeEventListener('popstate', this.backFn);
			
			next();
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#profile{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		#info{
			width: 16rem;
			height: 5.83rem;
			background: url(./img/info-bg2.jpg);
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
				img{
					display: block;
					position: relative;
					width: 100%;
					height: 100%;
					border-radius: 50%;
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
					color: darkorange;
					font-size: 1rem;
					&.not-login{
						p{
							text-align: center;
							line-height: 5.83rem;
						}
					}
					&.logined{
						padding: 1rem;
						.lv{
							>span{
								&:nth-child(1){
									color: white;
									width: 1.5rem;
									height: .8rem;
									line-height: .8rem;
									font-size: .6rem;
									display: inline-block;
									background: orangered;
									border-radius: 15%;
									vertical-align: middle;
									text-align: center;
									vertical-align: middle;
								}
								&:nth-child(2){
									display: inline-block;
									text-align: center;
									width: 5rem;
									font-size: .8rem;
									vertical-align: middle;
								}
							}
						}
						.name{
							font-size: 1.2rem;
							strong{
								
							}
						}
						p{
							margin-top: 0.2rem;
						}
					}
				}
			}
			.showPage{
				transform: translateX(0)!important;
			}
		}
	}
</style>
