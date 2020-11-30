<template>
	<section id="virus">
		<div class="top">
			<div class="iconfont icon-back" @touchend="btnBack" ref="top"></div>
			<h3>实时疫情</h3>
		</div>
		<div class="container" ref="container">
			<div class="type" ref="type">
				<h4 class="type-info" @touchend="type=0">感染信息</h4>
				<h4 class="type-news" @touchend="type=1">最新消息</h4>
				<div class="slide" :style="{left: type===0?'0.25rem':'8.25rem'}"></div>
				<div class="cut"></div>
			</div>
			<div class="plates" ref="plates" :style="{transform: type===0?'translateX(0)':'translateX(-100%)'}">
				<div class="virus-info" ref="virusInfo">
					<div class="roll-content">
						<div class="base">
								<div class="total">
									<div>
										<p :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.5+'rem'}">{{desc.confirmedCount}}</p>
										<h6 :style="{'font-size': settings.adjustSize*0.3+'rem','line-height':settings.adjustSize*0.35+'rem'}">确诊</h6>
									</div>
									<div>
										<p :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.5+'rem'}">{{desc.suspectedCount}}</p>
										<h6 :style="{'font-size': settings.adjustSize*0.3+'rem','line-height':settings.adjustSize*0.35+'rem'}">疑似</h6>
									</div>
									<div>
										<p :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.5+'rem'}">{{desc.curedCount}}</p>
										<h6 :style="{'font-size': settings.adjustSize*0.3+'rem','line-height':settings.adjustSize*0.35+'rem'}">治愈</h6>
									</div>
									<div>
										<p :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.5+'rem'}">{{desc.deadCount}}</p>
										<h6 :style="{'font-size': settings.adjustSize*0.3+'rem','line-height':settings.adjustSize*0.35+'rem'}">死亡</h6>
									</div>
								</div>
								<h5 :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}">{{desc.note1}}</h5>
								<!-- <p class="total" :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.45+'rem'}">{{desc.countRemark}}</p> -->
								<img v-lazy="desc.imgUrl" alt="总体"/>
								<img v-lazy="pic.imgUrl" v-for="(pic,index) in desc.quanguoTrendChart" :key="index"/>
								<div class="other">
									<p class="infectSource" :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}"><span>病源：</span>{{desc.note2}}</p>
									<p class="passWay" :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}"><span>传播方式：</span>{{desc.note3}}</p>
									<p v-if="index!==0" class="remark" v-for="(remark,index) in remarks" :key="index" :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}">
										{{remark}}
									</p>
								</div>
								<p class="time" v-if="desc.modifyTime" :style="{'font-size': settings.adjustSize*0.3+'rem'}">更新于{{desc.modifyTime | dateFormat}}</p>
							</div>
							<div class="case">
								<!-- <h5>各省状况</h5> -->
								<div class="news-title">
									<h5>地区</h5>
									<h5>确诊</h5>
									<h5>疑似</h5>
									<h5>治愈</h5>
									<h5>死亡</h5>
								</div>
								<ul>
									<li v-for="(item,index) in caseP" :key="index" :class="{active: tagsControl[index]}">
										<div class="main" @click="controlShow(index)">
											<div class="left">
												<!-- <div class="line"></div> -->
												<div class="more"></div>
												<span>{{item.provinceShortName}}</span>
											</div>
											<div class="right">
												<span>{{item.confirmedCount}}</span>
												<span>{{item.suspectedCount===0?'未知':item.suspectedCount}}</span>
												<span>{{item.curedCount}}</span>
												<span>{{item.deadCount}}</span>
											</div>
										</div>
										<div class="more-content">
											<div class="item-city" v-for="(city,index) in item.cities" :key="index">
												<span>{{city.cityName}}</span>
												<span>{{city.confirmedCount}}</span>
												<span>{{city.suspectedCount===0?'未知':city.suspectedCount}}</span>
												<span>{{city.curedCount}}</span>
												<span>{{city.deadCount}}</span>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<p class="end">数据由第三方接口提供，杜绝传谣！</p>
					</div>
				</div>
				<div class="virus-news" ref="virusNews">
					
					<ul>
						<li v-for="(item,index) in news" :key="index">
							<p class="time" :style="{'font-size': settings.adjustSize*0.35+'rem'}">{{item.modifyTime | dateFormat}}</p>
							<div class="msg">
								<h5 class="title" :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.45+'rem'}">{{item.title}}</h5>
								<p class="content" :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}">{{item.summary}}</p>
								<div class="other">
									<span class="province" :style="{'font-size': settings.adjustSize*0.3+'rem'}">{{item.provinceName}}</span>
									<p :style="{'font-size': settings.adjustSize*0.3+'rem'}">来源：<a :href="item.sourceUrl" target="_search">{{item.infoSource}}</a></p>
								</div>
							</div>
							<div class="end"></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
	</section>
</template>

<script>
	import HeaderTop from '../HeaderTop/HeaderTop.vue';
	import {reqNcov, reqNcovCity} from '../../api/tools.js';
	import BScroll from 'better-scroll';
	import {Indicator} from 'mint-ui';
	import {mapState} from 'vuex';
	export default {
		components: {
			HeaderTop
		},
		data(){
			return {
				type: 0, //0感染信息 1最新消息
				news: [],
				caseP: [],
				desc: {},
				remarks: [],
				// tagsControl: [false,false],
				tagsControl: []
			}
		},
		computed: {
			...mapState(['settings'])
		},
		
		mounted() {
			this.$refs.container.style.height = (document.documentElement.clientHeight-this.$refs.top.offsetHeight)+'px';
			this.$refs.virusInfo.style.height = (this.$refs.container.clientHeight-this.$refs.type.offsetHeight)+'px';
			this.$refs.plates.style.height = (this.$refs.container.clientHeight-this.$refs.type.offsetHeight)+'px';
			this.$refs.virusNews.style.height = (this.$refs.container.clientHeight-this.$refs.type.offsetHeight)+'px';
			this.getInfo();
			
			new BScroll('.virus-info', {
				scrollY: true,
				scrollX: false,
				click: true
			});
			new BScroll('.virus-news', {
				scrollY: true,
				scrollX: false,
				click: true
			});
		},
		methods: {
			btnBack(){ //返回
				Indicator.close();
				window.history.back();
			},
			getInfo(){
				Indicator.open('获取中...');
				reqNcov().then(
					(ret) => {
						if(ret.code===200){
							let {news, desc} = ret.newslist[0];
							this.news = news;
							
							this.desc = desc;
							Object.keys(desc).forEach((key,index) => {
								if(key.startsWith('remark')){
									this.remarks.push(desc[key]);
								}
							});
							
						}
						Indicator.close();
					}, (err) => {
						console.log('请求疫情失败'+err);
					}
				);
				reqNcovCity().then((ret) => { //省市信息
					if(ret.code===200){
						var caseP = ret.newslist;
					}
					for(let i=0; i<caseP.length-1; i++){
						for(let j=0; j<caseP.length-1-i; j++){
							if(caseP[j].confirmedCount<caseP[j+1].confirmedCount){
								let t = caseP[j];
								caseP[j] = caseP[j+1];
								caseP[j+1] = t;
							}
						}
						let length = ret.newslist.length;
						for(let i=0; i<length; i++){
							this.tagsControl.push(false);
						}
					}
					this.caseP = caseP;
				}, (err) => {
					console.log('请求疫情省市信息失败'+err);
				})
			},
			controlShow(index){
				this.tagsControl.splice(index,1,!this.tagsControl[index]);
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#virus{
		
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 30;
		top: 0;
		left: 0;
		background-size: 100% 100%;
		background: whitesmoke;
		.top{
			position: relative;
			background: whitesmoke;
			height: 2rem;
			z-index: 999;
			.icon-back{
				position: absolute;
				overflow: hidden;
				top: 50%;
				transform: translateY(-50%);
				color: rgb(100,100,100);
				font-size: 1rem;
				left: .5rem;
			}
			h3{
				text-align: center;
				color: rgb(25,25,25);
				position: absolute;
				width: 50%;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			// .oneLine(black);
		}
		.container{
			.type{
				background: whitesmoke;
				z-index: 999;
				.oneLine(black);
				position: relative;
				width: 16rem;
				margin: 0 auto;
				height: 1.6rem;
				display: flex;
				justify-content: space-around;
				h4{
					float: left;
					height: 1.6rem;
					width: 7.5rem;
					font-size: .8rem;
					text-align: center;
					line-height: 1.5rem;
					box-sizing: border-box;
					// &:nth-child(1){
					// 	border-right: .2px solid;
					// }
					// &:nth-child(2){
					// 	border-left: .2px solid;
					// }
				}
				.slide{
					width: 7.5rem;
					height: .1rem;
					background: rgb(0,78,152);
					border-radius: .15rem;
					position: absolute;
					bottom: 0;
					left: .25rem;
					transition: .2s;
				}
				.cut{
					width: 1px;
					background: black;
					height: 1.6rem;
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}
			.plates{
				width: 32rem;
				transition: .2s;
				position: relative;
				.virus-info{
					width: 16rem;
					color: rgb(25,25,25);
					.roll-content{
						padding-bottom: 1.5rem;
						.base{
							box-sizing: border-box;
							color: rgb(25,25,25);
							padding: .5rem;
							h5{
								text-align: center;
								font-size: .7rem;
							}
							// .total{
							// 	margin-top: .2rem;
							// 	text-align: center;
							// 	font-size: .8rem;
							// 	font-weight: bold;
							// }
							.total{
								display: flex;
								justify-content: space-around;
								margin-bottom: .5rem;
								color: rgb(25,25,25);
								div{
									width: 4rem;
									text-align: center;
									p{
										font-size: .8rem;
										font-weight: bold;
									}
									h6{
										margin-top: .1rem;
										font-size: .6rem;
									}
									&:nth-child(1){
										p{
											color: rgb(230,30,0);
										}
									}
									&:nth-child(2){
										p{
											color: rgb(#FFA500);
										}
									}
									&:nth-child(3){
										p{
											color: rgb(0,220,0);
										}
									}
									&:nth-child(4){
										color: black;
									}
								}
								
							}
							img{
								margin-top: .2rem;
								width: 15rem;
							}
							.other{
								margin-top: .5rem;
								font-size: .7rem;
								p{
									padding: 0.15rem 1rem 0;
									line-height: .8rem;
									span{
										font-weight: bold;
									}
								}
							}
							.time{
								text-align: right;
								padding-right: .5rem;
								font-size: .6rem;
							}
						}
						.case{
							width: 16rem;
							margin-top: .5rem;
							box-sizing: border-box;
							padding: 0 .5rem .5rem;
							>h5{
								text-align: center;
							}
							.news-title{
								display: flex;
								margin: .15rem;
								h5{
									line-height: 1rem;
									height: 1rem;
									text-align: center;
									width: 20%;
									font-size: .7rem;
									color: white;
									&:nth-child(1){
										background: rgb(180,180,180);
									}
									&:nth-child(2){
										background: rgb(230,30,0);
									}
									&:nth-child(3){
										background: rgb(#FFA500);
									}
									&:nth-child(4){
										background: rgb(0,220,0);
									}
									&:nth-child(5){
										background: black;
									}
								}
							}
							ul{
								height: auto;
								li{
									background: white;
									margin: 0.15rem;
									min-height: 1.2rem;
									overflow: hidden;
									position: relative;
									width: 14.7rem;
									// padding: .15rem;
									// border: 1px solid lightgrey;
									.main{
										width: 100%;
										height: 1.2rem;
										color: rgb(25,25,25);
										.left{
											height: 1.2rem;
											float: left;
											line-height: 1.2rem;
											font-size: .8rem;
											width: 20%;
											.line{
												float: left;
												width: .2rem;
												height: 1.2rem;
												background: orange;
											}
											span{
												// margin-left: .15rem;
												width: 100%;
												display: block;
												text-align: center;
											}
											.more{
												position: absolute;
												.triangle(bottom,.4rem,lightgray);
												left: .1rem;
												top: .6rem;
												transform: translateY(-50%) rotate(-90deg);
												z-index: 50;
												transition: .2s;
											}
										}
										.right{
											height: 1.2rem;
											width: 80%;
											float: left;
											line-height: 1.2rem;
											font-size: .7rem;
											display: flex;
											span{
												display: block;
												width: 25%;
												text-align: center;
												&:nth-child(1){
													color: rgb(230,30,0);
												}
												&:nth-child(2){
													color: rgb(#FFA500);
												}
												&:nth-child(3){
													color: rgb(0,220,0);
												}
												&:nth-child(4){
													color: rgb(0,0,0);
												}
											}
											
										}
									}
									.more-content{
										box-sizing: border-box;
										height: 0;
										.item-city{
											display: flex;
											padding: .15rem 0;
											span{
												display: block;
												font-size: .7rem;
												width: 20%;
												text-align: center;
												&:nth-child(2){
													color: rgb(230,30,0);
												}
												&:nth-child(3){
													color: rgb(#FFA500);
												}
												&:nth-child(4){
													color: rgb(0,220,0);
												}
												&:nth-child(5){
													color: black;
												}
											}
										}
										
										.time{
											font-size: .6rem;
											text-align: center;
											margin-top: .15rem;
											padding-bottom: .2rem;
										}
									}
									&.active{
										.main{
											.left{
												.more{
													transform: translateY(-50%) rotate(0deg);
												}
											}
										}
										.more-content{
											height: auto;
										}
									}
								}
							}
						}
						.end{
							font-size: .6rem;
							text-align: center;
						}
					}
				}
				.virus-news{
					position: absolute;
					width: 16rem;
					top: 0;
					left: 100%;
					box-sizing: border-box;
					padding: .5rem;
					ul{
						li{
							color: rgb(25,25,25);
							box-sizing: border-box;
							padding-top: .2rem;
							padding-bottom: .3rem;
							.time{
								display: inline-block;
								padding: .05rem .1rem;
								font-size: .7rem;
								text-align: center;
								background: rgba(20,150,250);
								color: white;
								border-radius: .2rem .2rem 0 0;
							}
							.msg{
								background: white;
								padding: .2rem;
								.title{
									font-weight: 550;
									padding: .2rem 0 .3rem 0;
									font-size: .8rem;
									text-align: center;
								}
								.content{
									font-size: .7rem;
									line-height: .8rem;
									text-indent: 1.4rem;
								}
								.other{
									.clearfix();
									padding: .5rem .3rem 0;
									.province{
										float: left;
										font-size: .6rem;
										color: orange;
									}
									p{
										float: right;
										font-size: .6rem;
										a{
										}
									}
									
								}
								
							}
							.end{
								height: .3rem;
								width: 100%;
								background: rgba(20,150,250);
							}
						}
					}
				}
			}
		}
		
	}
</style>
