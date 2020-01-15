<template>
	<section id="drawsth" ref="wrap">
		<div class="top" ref="top">
			<div class="iconfont icon-back back" @click="$router.back"></div>
			<h3 @click="showPlayers=!showPlayers">你画我猜</h3>
		</div>
		<div class="players" ref="players" :style="{height: showPlayers?'5rem':0}">
			<div class="player-item" v-for="(player,index) in players" :key="index">
				<img src="./img/avatar.png" alt="玩家">
				<p>{{player.name}}</p>
				<span>{{player.score}}</span>
				<div class="mask" v-show="player.addScore">+{{player.addScore}}</div>
			</div>
		</div>
		<div class="draw-content" ref="content">
			<div class="tools" ref="tools">
				<div class="left">
					<button class="pencil" :class="{active: type===0}" @click="type=0"></button>
					<button class="eraser" :class="{active: type===1}" @click="type=1"></button>
				</div>
				<div class="tip">
					<!-- {{painter==userInfo.name ? '你要画的是:'+title : `${answer.length} ${tip}`}} -->
					{{isPlaying ? (title.length===0?'':`提示: ${title.length}个字 ${tip}`) : '等待开始'}}
				</div>
				<div class="right">
					<button class="line" @click="toggleRight('lineControl')"></button>
					<button class="color" @click="toggleRight('colorControl')"></button>
				</div>
				<div class="color-control" v-show="shows.colorControl">
					<div @touchstart="changeColor('red')"></div>
					<div @touchstart="changeColor('orange')"></div>
					<div @touchstart="changeColor('yellow')"></div>
					<div @touchstart="changeColor('limegreen')"></div>
					<div @touchstart="changeColor('rgb(0,230,190)')"></div>
					<div @touchstart="changeColor('deepskyblue')"></div>
					<div @touchstart="changeColor('mediumpurple')"></div>
					<div @touchstart="changeColor('black')"></div>
				</div>
				<div class="line-control" v-show="shows.lineControl">
					<div @touchstart="changeLine(1)"><span></span></div>
					<div @touchstart="changeLine(2)"><span></span></div>
					<div @touchstart="changeLine(5)"><span></span></div>
					<div @touchstart="changeLine(9)"><span></span></div>
					<div @touchstart="changeLine(20)"><span></span></div>
				</div>
			</div>
			<canvas ref="canvas"></canvas>
			<div class="ready" v-show="!isPlaying">
				<button @click="toggleReady">准备</button>
			</div>
		</div>
		<div class="msgbox" ref="msgbox">
			<ul class="msgs">
				<li v-for="(msg,index) in msgs" :key="index">
					<span class="name" v-show="msg.name">{{msg.name}}说:</span> <span class="msg">{{msg.content}}</span>
				</li>
			</ul>
		</div>
		<div class="control" ref="control">
			<input type="text" v-model="answer">
			<mt-button type="primary" @click="sendAnswer">发送</mt-button>
		</div>
		<div class="turn-mask" v-show="showMask" @click="showMask=false">
			<p class="your" v-show="painter==userInfo.name">你的回合</p>
			<p class="your" v-show="painter!=userInfo.name">回合结束</p>
			<p class="title" v-show="painter==userInfo.name">请画：<span>{{title}}</span></p>
			<p class="title" v-show="painter!=userInfo.name">答案是：<span>{{title}}</span></p>
		</div>
		<div class="rank" v-show="isOver">
			<ul>
				<li v-for="(player,index) in rank" :key="index">
					<div class="left">
						<strong>{{index+1}}</strong>
						<img src="./img/avatar.png" alt="头像">
						<span>{{player.name}}</span>
					</div>
					<span class="right">{{player.score}}</span>
				</li>
			</ul>
		</div>
		
	</section>
</template>

<script>
	import {mapState} from 'vuex';
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
			
			this.socketInit();
			this.canvasInit();
			this.gameInit();
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
				},
				line: 1,
				color: 'black',
				colorE: 'white',
				scale: document.documentElement.clientWidth/16,
				msgs: [],
				canvasInfo: {
					cL: 0,
					cT: 0,
					cW: 0,
					cH: 0
				},
				players: [],
				title: '',
				painter: '',
				tip: '',
				answer: '',
				showMask: false,
				isPlaying: false,
				isOver: false,
				rank: [],
				isReady: false
			}
		},
		computed: {
			...mapState(['userInfo']),
			myTurn(){ //是否为自己回合
				return this.painter===this.userInfo.name;
			}
		},
		watch: {
			showPlayers(newV){
				let playersH = 0;
				if(newV){
					playersH = this.pH;
				}
				this.$refs.msgbox.style.height = (this.allH-this.$refs.content.offsetHeight-playersH-this.$refs.control.offsetHeight-this.$refs.top.offsetHeight) + 'px';
			},
			type(newV){ //切换画笔/橡皮
				this.$socket.emit('toggleType', {type:newV});
			},
			msgs: {
				deep: true,
				handler(newV){
					this.$nextTick(() => {
						let msgbox = this.$refs.msgbox;
						let maxL = Math.floor(msgbox.clientHeight/msgbox.querySelector('li').offsetHeight);
						if(newV.length>maxL){
							this.msgs.splice(0,1);
						}
					})
					
				}
			}
		},
		methods: {
			toggleRight(type){ //切换右侧工具栏的显示隐藏
				type === 'colorControl' ? (this.shows.lineControl=false) : (this.shows.colorControl=false);
				this.shows[type] = !this.shows[type];
			},
			canvasInit(){ //初始化canvas
				let canvas = this.$refs.canvas;
				let content = this.$refs.content;
				if(canvas.getContext){
					this.ctx = canvas.getContext('2d');
				}
				let {ctx, color, canvasInfo, scale} = this;
				this.line = 1*scale*0.05;
				let {line} = this;
				let vm = this;
				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';
				ctx.lineWidth = line;
				ctx.strokeStyle = color;
				
				canvasInfo.cW = canvas.clientWidth;
				canvasInfo.cH = canvas.clientHeight;
				canvasInfo.cL = canvas.offsetLeft;
				canvasInfo.cT = canvas.offsetTop;
				//手指按下
				canvas.addEventListener('touchstart', function(ev){
					ev.preventDefault();
					if(!vm.myTurn){
						return;
					}
					ctx.save();
					let touch = ev.changedTouches[0];
					let x = touch.clientX-canvasInfo.cL-content.offsetLeft, y = touch.clientY-canvasInfo.cT-content.offsetTop;
					vm.$socket.emit('startDraw', {x:x/scale, y:y/scale});
				});
				//手指移动
				canvas.addEventListener('touchmove', function(ev){
					ev.preventDefault();
					if(!vm.myTurn){
						return;
					}
					let touch = ev.changedTouches[0];
					let x = touch.clientX-canvasInfo.cL-content.offsetLeft, y = touch.clientY-canvasInfo.cT-content.offsetTop;
					vm.$socket.emit('moveDraw', {x:x/scale,y:y/scale});
				});
				
				vm.$refs.players.addEventListener('transitionend', function(){
					vm.canvasInfo.cT = vm.$refs.canvas.offsetTop;
				});
				
				//手指按下
				vm.sockets.subscribe('startDraw', function(point){
					let {x,y} = point;
					vm.startDraw(x*vm.scale,y*vm.scale);
				});
				//移动中
				vm.sockets.subscribe('moveDraw', function(point){
					let {x,y} = point;
					vm.moveDraw(x*vm.scale,y*vm.scale);
				});
				//切换画笔/橡皮
				vm.sockets.subscribe('toggleType', function({type}){
					vm.type = type;
					type===0 ? ctx.strokeStyle = vm.color : ctx.strokeStyle = vm.colorE;
				});
				//切换颜色
				vm.sockets.subscribe('changeColor', function({color}){
					vm.color = color;
					vm.ctx.strokeStyle = color;
				});
				//切换线宽
				vm.sockets.subscribe('changeLine', function({line}){
					let {scale} = vm;
					vm.line = line*0.05*scale;
					vm.ctx.lineWidth = vm.line;
				});
			},
			socketInit(){ //服务器连接初始化
				let {userInfo} = this;
				let vm = this;
				this.$socket.emit('joinDrawRoom', {id:userInfo._id, name:userInfo.name});
				this.sockets.subscribe('joinDrawRoom', function({msg,players,isPlaying}){
					vm.msgs.push(msg);
					vm.players = players;
					vm.isPlaying = isPlaying;
				});
			},
			gameInit(){ //游戏逻辑初始化
				//开始倒计时
				this.sockets.subscribe('willStart', ({msg}) => {
					this.msgs.push(msg)
					this.isPlaying = true;
				});
				//每回合开始
				this.sockets.subscribe('turnPainter', ({name, title}) => {
					console.log(title)
					this.ctx.clearRect(0,0,this.canvasInfo.cW,this.canvasInfo.cH)
					this.title = title;
					this.players.forEach((item,index) => {
						item.addScore = 0;
					});
					this.tip = '';
					this.painter = name;
					this.showMask = false;
					if(name===this.userInfo.name){
						this.showMask = true;
					}
					
					this.msgs.push({content: `现在由${name}绘画`});
				});
				//每回合结束
				this.sockets.subscribe('turnOver', () => {
					this.showMask = true;
					this.painter = '';
				});
				//有人回答
				this.sockets.subscribe('turnAnswer', ({name, addScore, msg}) => {
					if(addScore){
						var player = this.players.find((item,index) => {
							return item.name == name;
						});
						player.addScore = addScore;
						player.score += player.addScore;
					}
					this.msgs.push({content: msg, name});
				});
				//收到提示
				this.sockets.subscribe('turnTip', ({turnTip}) => {
					this.tip = turnTip;
				});
				//游戏结束
				this.sockets.subscribe('gameOver', ({inRooms, rank}) => {
					this.players = inRooms;
					console.log(rank)
					this.isPlaying = false;
					this.isOver = true;
					this.rank = rank;
					setTimeout(() => {
						this.isOver = false;
						this.showMask = false;
						this.ctx.clearRect(0,0,this.canvasInfo.cW,this.canvasInfo.cH);
						this.tip = '';
						this.title = '';
					},5000);
				});
				this.sockets.subscribe('toggleReady', (isReady, name) => { //更新准备状态
					let player = this.players.find((item,index) => item.name==name);
					player.isReady = isReady;
					player.addScore = 'R';
				});
			},
			toggleReady(ev){ //切换准备状态
				this.isReady = !this.isReady;
				let {isReady} = this;
				ev.target.innerHtml = this.isReady ? '已准备' : '准备';
				this.$socket.emit('toggleReady', {isReady, name});
			},
			changeLine(lv){ //更新线宽
				this.$socket.emit('changeLine', {line:lv});
			},
			changeColor(color){ //更新颜色
				this.$socket.emit('changeColor', {color});
			},
			sendAnswer(){
				let {userInfo, answer, players, myTurn} = this;
				//如果回答为空/观战/是画手 都不能发送消息
				if(!answer || !(players.find((item,index) => item.name==userInfo.name)) || myTurn){
					return;
				}
				this.$socket.emit('turnAnswer', {answer, name:userInfo.name});
				this.answer = '';
			},
			startDraw(x,y, cb){
				let {ctx} = this;
				ctx.beginPath();
				ctx.moveTo(x,y);
				ctx.lineTo(x+1,y+1);
				ctx.stroke();
				cb && cb();
			},
			moveDraw(x,y, cb){
				let {ctx} = this;
				ctx.lineTo(x,y);
				ctx.stroke();
				cb && cb();
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
			position: relative;
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
					font-size: .7rem;
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
						&:nth-child(8){
							background: black;
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
			.ready{
				position: absolute;
				top: 0;
				left: 0;
				background: rgba(25,25,25,.8);
				width: 100%;
				height: 100%;
				button{
					display: block;
					border: 0;
					border-radius: 10%;
					width: 30%;
					font-size: 2rem;
					position: absolute;
					left: 50%;
					top: 40%;
					transform: translate(-50%,-50%);
					color: white;
					background: rgba(50,100,233,.8);
					height: 20%;
					&:hover{
						background: rgba(60,120,233,.8);
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
				min-height: 100%;
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
				box-sizing: border-box;
				padding: .2rem;
				font-size: .8rem;
				line-height: 1.2rem;
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
		.rank{
			background: rgba(255,255,180,.8);
			width: 13rem;
			height: 20rem;
			position: absolute;
			top: 47%;
			left: 50%;
			transform: translate(-50%,-50%);
			ul{
				li{
					height: 2rem;
					padding-top: .2rem;
					.left{
						float: left;
						height: 100%;
						line-height: 2rem;
						padding-left: .5rem;
						strong,img,span{
							display: inline-block;
							padding: 0 .1rem;
							vertical-align: middle;
						}
						strong{
							color: orange;
						}
						img{
							height: 100%;
						}
					}
					.right{
						vertical-align: middle;
						float: right;
						line-height: 2rem;
						padding-right: .5rem;
					}
				}
			}
		}
		
	}
</style>
