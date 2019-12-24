<template>
	<section>
		<HeaderTop title="实用工具"></HeaderTop>
		<section id="tools">
			<div class="row row-life">
				<h3>生活类</h3>
				<div class="items">
					<div class="item-tool">
						<i class="iconfont"></i>
						<span>天气预报</span>
					</div>
				</div>
			</div>
			<div class="row row-life">
				<h3>小游戏</h3>
				<div class="items">
					<div class="item-tool">
						<i class="iconfont icon-lantern"></i>
						<span>猜灯谜</span>
					</div>
					<div class="item-tool">
						<i class="iconfont icon-light"></i>
						<span>脑筋急转弯</span>
					</div>
				</div>
			</div>
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
	section{
		#tools{
			.row{
				box-sizing: border-box;
				padding: .8rem;
				width: 100%;
				color: gray;
				h3{
					font-size: .9rem;
					border-bottom: 1px solid gray;
					color: gray;
					padding: .2rem 0;
				}
				.items{
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: flex-start;
					.item-tool{
						width: 33%;
						box-sizing: border-box;
						padding: .1rem;
						height: 4rem;
						text-align: center;
						i{
							font-size: 2.5rem;
						}
						span{
							display: block;
							font-size: .7rem;
						}
					}
				}
			}
		}
	}
</style>
