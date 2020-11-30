<template>
	<section id="riddles" ref="riddles">
		<div class="top">
			<div class="iconfont icon-back" @touchend="btnBack"></div>
			<h3>猜灯谜</h3>
		</div>
		<div class="content" ref="content">
			<div class="answer" :style="{opacity: status===0 ? 0 : 1}">
				<p class="result" :style="{'font-size': settings.adjustSize*0.5+'rem'}">{{status===1 ? '回答正确' : (status===2?'回答错误':'这都不会？')}}
					<span v-show="status!==1" :style="{'font-size': settings.adjustSize*0.45+'rem'}">答案是{{answer}}</span>
				</p>
				<p class="description" :style="{'font-size': settings.adjustSize*0.35+'rem','line-height':settings.adjustSize*0.4+'rem'}">{{description}}</p>
			</div>
			<div class="question" ref="question">
				<p class="riddle" :style="{'font-size': settings.adjustSize*0.4+'rem','line-height':settings.adjustSize*0.45+'rem'}">{{riddle}}</p>
				<p class="type" :style="{'font-size': settings.adjustSize*0.45+'rem','line-height':settings.adjustSize*0.5+'rem'}">{{type}}</p>
			</div>
		</div>
		<div class="control" ref="control">
			<input type="text" v-model="value">
			<mt-button size="large" type="default" @touchend.native="submit(true)">确定答案</mt-button>
			<mt-button size="large" type="primary" @touchend.native="submit(false)" v-show="status===0">不会</mt-button>
			<mt-button size="large" type="primary" @touchend.native="next" v-show="status!==0">再来一题</mt-button>
		</div>
		<div class="instruction" ref="instruction">
			<p>根据提示，在输出框内输入答案即可</p>
		</div>
	</section>
</template>

<script>
	import {MessageBox, Toast, Indicator} from 'mint-ui'
	import {reqRiddle} from '../../api/tools.js';
	import {mapState} from 'vuex';
	export default {
		props: ['shows'],
		data(){
			return {
				riddle: '',
				answer: '',
				type: '',
				description: '',
				value: '',
				status: 0, //回答状态  0未回答，1回答正确，2回答错误 3不会
			}
		},
		computed: {
			...mapState(['settings'])
		},
		mounted() {
			Indicator.open('寻找灯谜中');
			this.updateRiddle(() => {
				this.$refs.question.style.transform = 'translateX(0)';
			});
			let {instruction, content, control, riddles} = this.$refs;
			instruction.style.height = (riddles.clientHeight-content.offsetHeight-control.offsetHeight) + 'px';
		},
		methods: {
			btnBack(){ //返回
				window.history.back();
			},
			submit(r){ //处理回答
				if(r){
					if(this.status!==0){
						return;
					}
					if(this.value==this.answer){
						this.status = 1;
					}else{
						this.status = 2;
					}
					this.value = '';
				}else{
					this.status = 3;
				}
			},
			updateRiddle(cb){ //再来一道
				this.value = '';
				reqRiddle().then(
					ret => {
						Indicator.close();
						if(ret.code===200){
							let {riddle, answer, type, description} = ret.newslist[0];
							this.riddle = riddle;
							this.answer = answer;
							this.type = type;
							this.description = description;
							cb && cb();
						}
					}, err => {
						console.log(+err);
						Toast('灯谜获取失败，请稍后在玩');
					}
				);
			},
			next(){
				this.status = 0;
				this.$refs.question.style.transform = 'translateX(100%)'
				this.$refs.question.style.transition = 'none';
				this.updateRiddle(() => {
					this.$refs.question.style.transform = 'translateX(0)';
					this.$refs.question.style.transition = '.2s';
				})
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
			min-height: 2rem;
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
				transition: .2s;
				min-height: 40%;
				padding-top: 1rem;
				transform: translateX(100%);
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
				transition: .2s;
				.result{
					color: red;
					text-align: center;
					font-size: 1.1rem;
					padding-bottom: .3rem;
					>span{
						color: rgb(50,50,50);
						font-size: 1rem;
					}
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
			bottom: 1rem;
			box-sizing: border-box;
			width: 100%;
			font-size: .6rem;
			position: relative;
			p{
				width: 12rem;
				text-align: center;
				position: absolute;
				bottom: 2rem;
			}
		}
	}
</style>
