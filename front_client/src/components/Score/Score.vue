<template>
	<section id="score" ref="score">
		<div class="top" ref="top">
			<div class="back iconfont icon-back" @touchend="shows.score=false">
			</div>
			<h2>积分</h2>
		</div>
		<div class="mid" ref="mid">
			<p>{{$store.state.userInfo._id ? '当前积分：'+$store.state.userInfo.integral : '请先登录'}}</p>
		</div>
		<div class="content" ref="content">
			<div class="type" ref="type">
				<h3 :class="{active: type===0}" @touchstart="type=0">排行榜</h3>
				<h3 :class="{active: type===1}" @touchstart="type=1">积分兑奖</h3>
			</div>
			<div class="rank" ref="rank" v-show="type===0">
				<ul>
					<li v-for="(rank,index) in ranks" :key="index">
						<span class="rank-place">{{index+1}}</span>
						<img src="./img/avatar.png" alt="头像">
						<span class="rank-name">{{rank.name==$store.state.userInfo.name?'我':rank.name}}</span>
						<span class="rank-score">{{rank.integral}}</span>
					</li>
				</ul>
			</div>
			<div class="prize" ref="prize" v-show="type===1">
				<ul>
					<li>
						<img alt="暂无">
						<div class="right">
							<span class="prize-name">虚空之物</span>
							<span class="description">此物源于虚空不作多言</span>
							<div>
								<span class="prize-left">还剩-1件</span>
								<a href="javascript:;">兑换</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
	import {getRank} from '../../api/server.js'
	export default {
		props: ['shows'],
		mounted() {
			this.$refs.content.style.height = (this.$refs.score.offsetHeight-this.$refs.top.offsetHeight-this.$refs.mid.offsetHeight)+'px'
			this.$refs.rank.style.height = (this.$refs.content.clientHeight-this.$refs.type.offsetHeight)+'px';
			this.$refs.prize.style.height = (this.$refs.content.clientHeight-this.$refs.type.offsetHeight)+'px';
			
			//获取最高分
			getRank().then(
				(ret) => {
					this.ranks = ret;
				},
				(err) => {
					console.log(err);
				}
			);
		},
		data(){
			return {
				type: 0,
				ranks: []
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#score{
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(100%);
		transition: .3s;
		background: whitesmoke;
		z-index: 10;
		color: rgb(25,25,25);
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
			}
		}
		.mid{
			width: 100%;
			height: 6rem;
			background: black;
			p{
				padding: 2rem 0;
				font-size: 2rem;
				text-align: center;
				line-height: 2rem;
				color: white;
			}
		}
		.content{
			.type{
				display: flex;
				h3{
					width: 50%;
					text-align: center;
					height: 1.5rem;
					line-height: 1.5rem;
					font-size: .9rem;
					background: white;
					box-sizing: border-box;
					&.active{
						background: whitesmoke;
					}
				}
			}
			.rank{
				ul{
					height: auto;
					li{
						.clearfix();
						box-sizing: border-box;
						padding-top: .5rem;
						height: 3rem;
						line-height: 2.5rem;
						span,img{
							display: inline-block;
						}
						.rank-place{
							float: left;
							margin-left: .5rem;
							font-size: 1.5rem;
						}
						.rank-score{
							float: right;
							margin-right: 1rem;
							color: orange;
							font-size: 1.5rem;
						}
						.rank-name{
							float: left;
							font-size: 1rem;
						}
						img{
							float: left;
							border-radius: 50%;
							height: 100%;
						}
					}
				}
			}
			.prize{
				ul{
					li{
						box-sizing: border-box;
						height: 5rem;
						padding: .3rem;
						.oneLine(rgb(40,40,40));
						&::before{
							width: 15.4rem;
						}
						img{
							display: inline-block;
							height: 4.4rem;
							width: 4.4rem;
							background: red;
						}
						.right{
							float: right;
							width: 10rem;
							height: 100%;
							.prize-name{
								display: block;
								text-align: center;
								margin-bottom: .3rem;
							}
							.description{
								display: block;
								font-size: .65rem;
								margin-bottom: 1.3rem;
								color: rgb(100,100,100);
							}
							>div{
								.prize-left{
									display: inline-block;
									font-size: .8rem;
									color: rgb(100,100,100);
									float: left;
									margin-left: 1rem;
									height: 1rem;
									line-height: 1rem;
								}
								a{
									display: inline-block;
									width: 4rem;
									height: 1rem;
									background: orangered;
									border-radius: .3rem;
									color: white;
									font-size: .8rem;
									line-height: 1rem;
									text-align: center;
									float: right;
									margin-right: 1rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
