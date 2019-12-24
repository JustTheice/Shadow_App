<template>
	<section id="news">
		<HeaderTop title="科技新闻"></HeaderTop>
		<section id="container">
			<ul>
				<li>
					<a href="javascript:;">
						<div class="left">
							<img src="" alt="暂无"/>
						</div>
						<div class="right">
							<h4>新闻标题</h4>
							<span class="time">2019-12-24 20:36</span>
						</div>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<div class="left">
							<img src="" alt="暂无"/>
						</div>
						<div class="right">
							<h4>新闻标题</h4>
							<span class="time">2019-12-24 20:36</span>
						</div>
					</a>
				</li>
			</ul>
		</section>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	export default{
		components: {
			HeaderTop,
		}
	}
</script>

<style lang="less">
	#news{
		#container{
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
								font-size: 1rem;
								margin-top: .2rem;
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
