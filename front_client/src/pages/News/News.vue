<template>
	<section id="news">
		<HeaderTop title="科技新闻"></HeaderTop>
		<nav id="news-nav" ref="navTop">
			<ul>
				<li :class="{active: cIndex===0}" @click="toggleGrade(0)">
					<a href="javcript:;">IT综合</a>
				</li>
				<li :class="{active: cIndex===1}" @click="toggleGrade(1)">
					<a href="javacript:;">游戏竞技</a>
				</li>
				<li :class="{active: cIndex===2}" @click="toggleGrade(2)">
					<a href="javacript:;">影视资讯</a>
				</li>
				<li :class="{active: cIndex===3}" @click="toggleGrade(3)">
					<a href="javacript:;">动漫快车</a>
				</li>
				<li :class="{active: cIndex===4}" @click="toggleGrade(4)">
					<a href="javacript:;">互联网</a>
				</li>
			</ul>
		</nav>
		<section id="container">
			<ul>
				<li class="more">
				</li>
				<li v-for="(item, index) in news">
					<!-- <router-link :to="'/topic?url='+item.url">
						<div class="left">
							<img v-lazy="item.picUrl" alt="暂无"/>
						</div>
						<div class="right">
							<h4>{{item.title}}</h4>
							<span class="time">{{item.ctime}}</span>
						</div>
					</router-link> -->
					<a @click="toTopic(item.url)">
						<div class="left">
							<img v-lazy="item.picUrl" alt="暂无"/>
						</div>
						<div class="right">
							<h4>{{item.title}}</h4>
							<span class="time">{{item.ctime}}</span>
						</div>
					</a>
				</li>
			</ul>
		</section>
		<Topic :url="cUrl" :shows="shows" :style="{transform: shows.topic?'translateX(0)':'translateX(100%)'}" ref="topic"></Topic>
		<!-- <Topic :url="cUrl" :shows="shows" v-if="shows.topic"></Topic> -->
	</section>
</template>

<script>
	import BScroll from 'better-scroll';
	import { Indicator } from 'mint-ui';
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import Topic from '../../components/Topic/Topic.vue';
	export default{
		components: {
			HeaderTop, Topic
		},
		data(){
			return {
				cUrl: '',
				shows: {
					topic: false
				},
				news: [],
				cIndex: 0
			}
		},
		
		mounted() {
			//新闻导航滚动
			let navTop = this.$refs.navTop;
			let navScroll = new BScroll(navTop, {
				scrollY: false,
				scrollX: true,
				click: true
			});
			
			//获取新闻列表并添加滚动
			let newsContainer = document.getElementById('container');
			newsContainer.style.height = (document.documentElement.clientHeight-document.querySelector('#header-top').offsetHeight-document.querySelector('#news-nav').offsetHeight-document.querySelector('#nav').offsetHeight)+'px';
			let listScroll;
			if(!this.$store.state.news['IT'].length){
				this.$store.dispatch('getNews', {
					type: 'IT',
					cb: (type) => {
						this.news = this.$store.state.news['IT'];
						this.$nextTick(() => {
							listScroll = new BScroll('#container', {
								scrollX: false,
								scrollY: true,
								click: true
							});
							//下拉重新获取
							listScroll.on('touchEnd', ({x,y}) => {
								if(y>document.querySelector('.more').offsetHeight*3/4){
									this.getNews(this.getType(this.cIndex), () => {
										this.$nextTick(() => {
											Indicator.close();
										})
									});
									Indicator.open('加载中...');
								}
							});
						});
					}
				});
			}else{
				this.news = this.$store.state.news['IT'];
			}
		
		},
		methods: {
			getType(index){ //获取相应新闻类型
				let type = '';
				switch (index){
					case 0:
						type = 'IT';
						break;
					case 1:
						type = 'Game';
						break;
					case 2:
						type = 'Film';
						break;
					case 3:
						type = 'Cartoon';
						break;
					case 4:
						type = "Internet"
						break;
				}
				return type;
			},
			getNews(type, cb){ //更新新闻信息到vuex
				//通知action执行
				this.$store.dispatch('getNews', {
					type,
					cb
				});
			},
			toggleGrade(index=this.cIndex){ //切换新闻分类
				let type = this.getType(index);
				if(!this.$store.state.news[type].length){
					Indicator.open('加载中...');
					this.getNews(type, (type) => {
						this.news = this.$store.state.news[type];
						this.$nextTick(() => {
							Indicator.close();
						});
					})
				}else{
					this.news = this.$store.state.news[type];
				}
				this.cIndex = index;
			},
			toTopic(url){
				this.cUrl = url;
				this.shows.topic=true;
			}
		},
		destroyed() {
			window.removeEventListener('popstate', this.backFn);
		}
	}
</script>

<style lang="less">
	#news{
		overflow: hidden;
		position: relative;
		height: 100%;
		width: 16rem;
		#news-nav{
			width: 100%;
			height: 1.7rem;
			box-sizing: border-box;
			padding: .1rem;
			background: rgb(233,233,233);
			ul{
				display: flex;
				flex-direction: row;
				white-space: nowrap;
				float: left;
				li{
					height: 1.5rem;
					box-sizing: border-box;
					padding: .1rem;
					margin: 0 .1rem;
					display: inline-block;
					transition: .3s;
					&.active{
						border-radius: .2rem;
						background: limegreen;
						a{
							color: whitesmoke;
						}
					}
					a{
						
						display: block;
						height: 100%;
						line-height: 1.3rem;
						font-size: .9rem;
						color: rgb(25,25,25);
					}
				}
			}
		}
		#container{
			overflow: hidden;
			position: relative;
			
			ul{
				width: 100%;
				margin: 0 auto;
				>.more{
					position: absolute;
					top: -5rem;
					height: 5rem;
					text-align: center;
					background: url(img/more.gif) no-repeat;
					background-size: 6rem 6rem;
					background-position: 50% 50%;
				}
				li{
					box-sizing: border-box;
					width: 15.6rem;
					height: 5rem;
					background: rgb(245,245,245);
					padding: .2rem;
					margin: .2rem;
					box-shadow: 0px 0px 1px 1px whitesmoke;
					>a{
						display: block;
						height: 100%;
						.left{
							float: left;
							width: 7.14rem;
							height: 100%;
							img{
								display: inline-block;
								width: 100%;
								height: 100%;
							}
						}
						.right{
							position: relative;
							width: 7.5rem;
							height: 100%;
							float: right;
							color: rgb(25,25,25);
							h4{
								font-size: .8rem;
								line-height: 1rem;
								margin-top: .2rem;
								max-height: 3rem;
								-webkit-line-clamp: 3;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							span{
								font-size: .6rem;
								position: absolute;
								bottom: .1rem;
								right: .2rem;
							}
						}
					}
				}
			}
		}
	}
</style>
