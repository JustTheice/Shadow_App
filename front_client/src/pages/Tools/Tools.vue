<template>
	<section id="container">
		<HeaderTop title="实用工具"></HeaderTop>
		<section id="tools">
			<div class="row row-life">
				<h3>生活类</h3>
				<div class="items">
					<div class="item-tool" @touchend="shows.weather=true">
						<i class="iconfont icon-weather"></i>
						<span>天气预报</span>
					</div>
				</div>
			</div>
			<div class="row row-life">
				<h3>小游戏</h3>
				<div class="items">
					<div class="item-tool" @touchend="shows.riddles=true">
						<i class="iconfont icon-lantern"></i>
						<span>猜灯谜</span>
					</div>
				</div>
			</div>
		</section>
		<Weather v-if="shows.weather" :shows="shows"></Weather>
		<Riddles v-if="shows.riddles" :shows="shows"></Riddles>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
	import Weather from '../../components/Weather/Weather.vue';
	import Riddles from '../../components/Riddles/Riddles.vue';
	export default{
		components: {
			HeaderTop, Weather, Riddles
		},
		data(){
			return {
				shows: {
					weather: false,
					riddles: false
				}
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	section{
		position: relative;
		overflow: hidden;
		height: 100%;
		#tools{
			padding: .8rem;
			.row{
				box-sizing: border-box;
				width: 100%;
				color: gray;
				h3{
					font-size: .9rem;
					// border-bottom: 1px solid gray;
					// color: gray;
					.oneLine(gray);
					padding: .2rem 0;
				}
				.items{
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: flex-start;
					.item-tool{
						width: 33.3%;
						box-sizing: border-box;
						padding: .2rem;
						height: 4rem;
						text-align: center;
						i{
							font-size: 2.5rem;
						}
						span{
							display: block;
							font-size: .7rem;
							margin-top: .2rem;
						}
					}
				}
			}
		}
	}
</style>
