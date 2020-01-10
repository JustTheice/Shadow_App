<template>
	<section id="drawsth" ref="wrap">
		<div class="top" ref="top">
			<div class="iconfont icon-back back" @click="$router.back"></div>
			<h3 @click="showPlayers=!showPlayers">你画我猜</h3>
		</div>
		<div class="players" ref="players" :style="{height: showPlayers?'5rem':0}">
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
				<div class="mask">+4</div>
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
				<span>10</span>
			</div>
		</div>
		<div class="draw-content" ref="content">
			<div class="tools" ref="tools">
				<div class="left">
					<button class="pencil" :class="{active: type===0}" @click="type=0"></button>
					<button class="eraser" :class="{active: type===1}" @click="type=1"></button>
				</div>
				<div class="tip">
					你要画的是: 脑残
				</div>
				<div class="right">
					<button class="line" @click="shows.lineControl=!shows.lineControl"></button>
					<button class="color" @click="shows.colorControl=!shows.colorControl"></button>
				</div>
				<div class="color-control" v-show="shows.colorControl">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div class="line-control" v-show="shows.lineControl">
					<div><span></span></div>
					<div><span></span></div>
					<div><span></span></div>
					<div><span></span></div>
					<div><span></span></div>
				</div>
			</div>
			<canvas ref="canvas"></canvas>
		</div>
		<div class="msgbox" ref="msgbox">
			<ul class="msgs">
				<li><span class="name">XXX</span>说: <span class="msg">xxx</span></li>
			</ul>
		</div>
		<div class="control" ref="control">
			<input type="text">
			<mt-button type="primary">发送</mt-button>
		</div>
		<div class="turn-mask">
			<p class="your">你的回合</p>
			<p class="title">请画：<span>脑残</span></p>
		</div>
	</section>
</template>

<script>
	export default {
		mounted() {
			let wrap = this.$refs.wrap;
			let canvas = this.$refs.canvas;
			let content = this.$refs.content;
			let tools = this.$refs.tools;
			let msgbox = this.$refs.msgbox;
			let players = this.$refs.players;
			let top = this.$refs.top;
			let control = this.$refs.control;
			canvas.width = tools.clientWidth;
			canvas.height = tools.clientWidth;
			
			msgbox.style.height = (wrap.offsetHeight-content.offsetHeight-players.offsetHeight-control.offsetHeight-top.offsetHeight) + 'px';
			this.pH = players.offsetHeight;
			window.onresize = () => {
				wrap.style.height = document.documentElement.clientHeight;
			};
			
		},
		data(){
			return {
				allH: document.documentElement.clientHeight,
				showPlayers: true,
				pH: 0,
				type: 0,
				shows: {
					colorControl: false,
					lineControl: false
				}
			}
		},
		watch: {
			showPlayers(newV){
				let playersH = 0;
				if(newV){
					playersH = this.pH;
				}
				this.$refs.msgbox.style.height = (this.allH-this.$refs.content.offsetHeight-playersH-this.$refs.control.offsetHeight-this.$refs.top.offsetHeight) + 'px';
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/mixin.less';
	#drawsth{
		width: 100%;
		height: 100%;
		background: whitesmoke;
		position: relative;
		.top{
			height: 2rem;
			color: rgb(25,25,25);
			position: relative;
			.back{
				position: absolute;
				left: .5rem;
				top: 50%;
				transform: translateY(-50%);
			}
			h3{
				width: 8rem;
				margin: 0 auto;
				padding: .5rem 0;
				text-align: center;
				font-size: 1rem;
				
			}
		}
		.players{
			transition: .2s;
			display: flex;
			height: 5rem;
			background: whitesmoke;
			justify-content: space-around;
			flex-wrap: wrap;
			overflow: hidden;
			.player-item{
				width: 2.5rem;
				box-sizing: border-box;
				padding: 0 .2rem;
				height: 2.5rem;
				position: relative;
				img{
					width: 100%;
				}
				p{
					overflow: hidden;
					height: .3rem;
					line-height: .3rem;
					font-size: .3rem;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				span{
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					position: absolute;
					width: .8rem;
					height: .8rem;
					border-radius: 50%;
					background: deepskyblue;
					font-size: .6rem;
					line-height: .8rem;
					text-align: center;
					color: white;
					z-index: 99;
				}
			}
				.mask{
					position: absolute;
					background: rgba(25,25,25,.8);
					width: 2.1rem;
					height: 2.1rem;
					top: 0;
					z-index: 10;
					text-align: center;
					line-height: 2.1rem;
					font-size: .8rem;
					left:.2rem;
					color: white;
					border-radius: 50%;
				}
		}
		.draw-content{
			width: 16rem;
			background: pink;
			box-sizing: border-box;
			height: 16.3rem;
			padding: .1rem .5rem 0 .5rem;
			canvas{
				box-sizing: border-box;
				background: white;
			}
			.tools{
				position: relative;
				height: 1rem;
				.left,.right{
					height: 1rem;
					float: left;
					width: 50%;
					button{
						display: inline-block;
						border: 0;
						background-color: transparent;
						outline: none;
						width: 1rem;
						height: 1rem;
						background-size: 100% 100% !important;
						
						&.active{
							background-color: rgba(255,255,255,.5);
						}
					}
				}
				.left{
					.pencil{
						background: url(./img/pencil.png);
					}
					.eraser{
						background: url(./img/eraser.png);
					}	
				}
				.right{
					float: right;
					text-align: right;
					.color{
						background: url(./img/color.png);
					}
					.line{
						background: url(img/line.png);
					}
				}
				.tip{
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					width: auto;
					height: 1rem;
					line-height: 1rem;
					font-size: .8rem;
					background: orange;
					text-align: center;
				}
				.color-control{
					position: absolute;
					box-sizing: border-box;
					top: 1rem;
					display: flex;
					border-radius: 0 0 .5rem .5rem;
					right: 0rem;
					width: 12rem;
					height: 2rem;
					background: rgba(233,233,233,.7);
					justify-content: space-around;
					align-items: center;
					>div{
						box-sizing: border-box;
						width: 1.4rem;
						height: 1.4rem;
						border-radius: 50%;
						&:nth-child(1){
							background: red;
						}
						&:nth-child(2){
							background: orange;
						}
						&:nth-child(3){
							background: yellow;
						}
						&:nth-child(4){
							background: limegreen;
						}
						&:nth-child(5){
							background: rgb(0,230,190);
						}
						&:nth-child(6){
							background: deepskyblue;
						}
						&:nth-child(7){
							background: mediumpurple;
						}
					}
				}
				.line-control{
					position: absolute;
					box-sizing: border-box;
					top: 1rem;
					display: flex;
					justify-content: space-around;
					align-items: center;
					border-radius: 0 0 .5rem .5rem;
					right: 1rem;
					width: 10rem;
					height: 2rem;
					background: rgba(233,233,233,.7);
					>div{
						width: 1.5rem;
						height: 1.5rem;
						position: relative;
						>span{
							display: inline-block;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							border-radius: 50%;
							background: black;
						}
						&:nth-child(1){
							>span{
								width: 0.2rem;
								height: 0.2rem;
							}
						}
						&:nth-child(2){
							>span{
								width: 0.4rem;
								height: 0.4rem;
							}
						}
						&:nth-child(3){
							>span{
								width: 0.6rem;
								height: 0.6rem;
							}
						}
						&:nth-child(4){
							>span{
								width: 0.8rem;
								height: 0.8rem;
							}
						}
						&:nth-child(5){
							>span{
								width: 1rem;
								height: 1rem;
							}
						}
					}
				}
				
			}
			
		}
		.msgbox{
			color: rgb(25,25,25);
			background: skyblue;
			box-sizing: border-box;
			padding: .2rem .5rem;
			transition: .2s;
			ul{
				background: white;
				li{
					padding: 0 .2rem;
					height: 1rem;
					font-size: .8rem;
					line-height: 1rem;
				}
			}
		}
		.control{
			background: yellow;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: .15rem .5rem;
			height: 1.5rem;
			input{
				display: inline-block;
				width: 12rem;
				height: 1.2rem;
				// vertical-align: middle;
			}
			button{
				float: right;
				display: inline-block;
				width: 2.5rem;
				height: 1.2rem;
				text-align: center;
				font-size: .7rem;
				transform: translateY(0.03rem);
			}
		}
		.turn-mask{
			width: 9rem;
			height: 6rem;
			background: url(./img/turn.png);
			background-size: 100% 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			color: rgb(25,25,25);
			display: none;
			.your{
				padding-top: 1.5rem;
				font-size: .8rem;
				text-align: center;
			}
			.title{
				padding-top: .5rem;
				text-align: center;
				span{
					color: orangered;
				}
			}
		}
	}
</style>
