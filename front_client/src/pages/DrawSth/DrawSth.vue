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
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
			</div><div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
			</div>
			<div class="player-item">
				<img src="./img/avatar.png" alt="玩家">
				<p>哇哈哈哈哈哈哈</p>
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
					<button class="line"></button>
					<button class="color"></button>
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
				type: 0
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
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					position: absolute;
					width: .7rem;
					height: .7rem;
					border-radius: 50%;
					background: orangered;
					font-size: .5rem;
					line-height: .7rem;
					text-align: center;
				}
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
	}
</style>
