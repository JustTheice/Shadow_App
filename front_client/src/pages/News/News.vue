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
				<li v-for="(item, index) in news">
					<router-link :to="'/topic?url='+item.url">
						<div class="left">
							<img :src="item.picUrl" alt="暂无"/>
						</div>
						<div class="right">
							<h4>{{item.title}}</h4>
							<span class="time">{{item.ctime}}</span>
						</div>
					</router-link>
				</li>
			</ul>
		</section>
	</section>
</template>

<script>
	import BScroll from 'better-scroll';
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	export default{
		components: {
			HeaderTop,
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
							listScroll.on('scroll', ({x,y}) => {
								console.log(y)
							});
						});
					}
				});
			}else{
				this.news = this.$store.state.news['IT'];
			}
		
			
		},
		data(){
			return {
				news: [],
				cIndex: 0
			}
		},
		methods: {
			toggleGrade(index){ //切换新闻分类
				this.cIndex = index;
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
				if(!this.$store.state.news[type].length){
					this.$store.dispatch('getNews', {
						type,
						cb: (type) => {
							this.news = this.$store.state.news[type];
						}
					});
				}else{
					this.news = this.$store.state.news[type];
				}
				this.cIndex = index;
			}
		}
	}
</script>

<style lang="less">
	#news{
		overflow: hidden;
		height: 100%;
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
			ul{
				width: 100%;
				margin: 0 auto;
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
								background: blue;
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
