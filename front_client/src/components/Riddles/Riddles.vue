<template>
	<section id="riddles">
		<div class="top">
			<div class="iconfont icon-back" @touchend="back"></div>
			<h3>猜灯谜</h3>
		</div>
		<div class="content">
			<div class="answer">
				<p class="result">回答正确</p>
				<p class="description">吹不散的雾，隐没了意图，谁轻柔踱步————停住，还来不及哭穿透的子弹就带走温度</p>
			</div>
			<div class="question">
				<p class="riddle">微凉的晨露沾湿黑礼服，石板上有雾父在低诉。无奈的觉悟只能更残酷，一切都为了通往圣堂的路</p>
				<p class="type">打一二三</p>
			</div>
			
		</div>
		<div class="control">
			<input type="text">
			<mt-button size="large" type="default">确定答案</mt-button>
			<mt-button size="large" type="primary">再来一题/不会</mt-button>
		</div>
		<div class="instruction">
			<p>根据提示，在输出框内输入答案即可</p>
		</div>
	</section>
</template>

<script>
	import {MessageBox} from 'mint-ui'
	export default {
		props: ['shows'],
		methods: {
			back(){
				// MessageBox('不玩了吗？').then(action => this.shows.riddles=false);
				this.shows.riddles=false
			}
		}
	}
</script>

<style lang="less">
	#riddles{
		width: 100%;
		height: 100%;
		background: rgb(233,245,190);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 30;
		.top{
			height: 8%;
			position: relative;
			.icon-back{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				color: rgb(100,100,100);
				font-size: 1rem;
				left: .5rem;
			}
			h3{
				text-align: center;
				color: rgb(100,100,100);
				position: absolute;
				width: 50%;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.content{
			color: rgb(50,50,50);
			box-sizing: border-box;
			min-height: 42%;
			padding: 1rem 2rem;
			.question{
				box-sizing: border-box;
				min-height: 40%;
				padding-top: 1rem;
				.riddle{
					font-size: .8rem;
					line-height: 1rem;
					letter-spacing: .05rem;
				}
				.type{
					margin-top: .3rem;
					text-align: center;
				}
			}
			.answer{
				min-height: 60%;
				margin-bottom: .5rem;
				.result{
					color: red;
					text-align: center;
					font-size: 1.2rem;
					padding-bottom: .3rem;
				}
				.description{
					font-size: .7rem;
					line-height: .9rem;
					letter-spacing: .03rem;
					transition: .3s;
				}
			}
		}
		.control{
			box-sizing: border-box;
			max-height: 50%;
			padding: 0 2rem 1rem 2rem;
			input{
				display: block;
				width: 100%;
				box-sizing: border-box;
				border-radius: .2rem;
				padding: .2rem;
				margin-bottom: .1rem;
			}
		}
		.instruction{
			color: rgb(50,50,50);
			padding: 0 2rem;
			position: absolute;
			bottom: 1rem;
			box-sizing: border-box;
			width: 100%;
			font-size: .6rem;
			p{
				text-align: center;
			}
		}
	}
</style>
