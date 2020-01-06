<template>
	<section id="weather">
		<div id="w-top">
			<div class="back iconfont icon-back" @click="shows.weather=false"></div>
			<h2>邯郸</h2>
		</div>
		<div id="today">
			<div class="base">
				<div class="real">
					<p v-if="days.length">{{days[0].real | getNum}}<sub>℃</sub></p>
				</div>
				<div class="scene">
					<img v-if="days.length" :src="'./static/img/'+days[0].weatherimg">
					<p v-if="days.length">{{days[0].weather}}</p>
				</div>
				<div class="right">
					<p v-if="days.length">{{days[0].highest}}/{{days[0].lowest}}</p>
				</div>
			</div>
			<div class="tip">
				<p v-if="days.length">“{{days[0].tips}}”</p>
			</div>
			<div class="air">
				<div class="pollute">
					<p>
					<span v-if="days.length">{{days[0].air}}</span>
					</p>
					<h4>修仙指数</h4>
				</div>
				<div class="wind">
					<p><span v-if="days.length">{{days[0].windspeed}}</span></p>
					<h4>
						<span v-if="days.length">{{days[0].wind}}</span>
					</h4>
				</div>
				<div class="humidity">
					<p>
						<span v-if="days.length">{{days[0].humidity}}%</span>
					</p>
					<h4>湿度</h4>
				</div>
			</div>
		</div>
		<div id="later-day">
			<ul>
				<li v-for="(day,index) in days" :key="index" v-if="index!=0">
					<div class="icon">
						<img :src="'./static/img/'+day.weatherimg">
					</div>
					<span class="tem">{{day.highest | getNum}}°/{{day.lowest | getNum}}°</span>
					<span class="sc">{{day.weather}}</span>
					<p>{{index===1 ? '明天' : day.week}}</p>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	import {reqWeather, reqAddress} from '../../api/tools';
	export default {
		props: ['shows'],
		data(){
			return {
				days: [],
				location: {},
				address: '',
				city: '邯郸'
			}
		},
		mounted() {
			reqWeather('邯郸').then(
				(ret) => {
					if(ret.code===200){
					  this.days = ret.newslist.slice(0,4);
					}
				},(err) => {
					console.log(err)
				}
			);
			
		},
		filters: {
			getNum(val){
				return val.slice(0,-1)
			}
		},
		methods: {
			getPosition() {
			  return new Promise((resolve, reject) => {
			    if (navigator.geolocation) {
			      navigator.geolocation.getCurrentPosition(function (position) {
			        let latitude = position.coords.latitude
			        let longitude = position.coords.longitude
			        let data = {
			          latitude: latitude,
			          longitude: longitude
			        }
			        resolve(data)
			      }, function (err) {
			        reject(err)
			      })
			    } else {
			      reject('你的浏览器不支持当前地理位置信息获取')
			    }
			  })
			}
		}
	}
</script>

<style lang="less">
	#weather{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 30;
		top: 0;
		left: 0;
		background: url(./img/weather.jpg);
		background-size: 100% 100%;
		#w-top{
			height: 10%;
			position: relative;
			.back{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: .5em;
				font-size: 1rem;
				color: rgba(220,220,150,.8);
			}
			h2{
				width: 50%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				text-align: center;
				font-size: 1rem;
				color: rgba(220,220,150,.8);
			}
		}
		#today{
			height: 60%;
			.base{
				padding: 0 .5rem;
				height: 20%;
				display: flex;
				align-items: center;
				.real{
					width: 20%;
					font-size: 3rem;
					sub{
						font-size: 1rem;
					}
				}
				.scene{
					width: 15%;
					text-align: center;
					img{
						width: 100%;
					}
					p{
						padding-top: .1rem;
						font-size: .7rem;
					}
				}
				.right{
					width: 65%;
					height: 100%;
					float: right;
					position: relative;
					p{
						position: absolute;
						font-weight: 300;
						right: 0;
						bottom: 15%;
						font-size: 1.5rem;
					}
				}
			}
			.tip{
				padding: 0 .5rem;
				height: 65%;
				position: relative;
				p{
					max-width: 80%;
					left: 10%;
					position: absolute;
					color: rgba(50,50,50);
					font-size: .8rem;
					bottom: 10%;
					line-height: .9rem;
				}
			}
			.air{
				height: 15%;
				color: rgb(50,50,50);
				background: rgba(250,250,250,.7);
				display: flex;
				div{
					width: 33.33%;
					height: 100%;
					text-align: center;
					p{
						height: 50%;
						box-sizing: border-box;
						padding-top: 5%;
						font-weight: 400;
						font-size: .9rem;
					}
					h4{
						height: 50%;
						padding-top: 5%;
						font-size: .7rem;
						font-weight: 200;
					}
					&.wind{
						p{
							font-size: .8rem;
						}
					}
				}
			}
		}
		#later-day{
			height: 30%;
			ul{
				height: 100%;
				li{
					// border: 1px solid;
					background: rgba(250,250,250,.9);
					height: 33.33%;
					display: flex;
					align-items: center;
					// i{
					// 	padding-left: .2rem;
					// 	font-size: 1.5rem;
					// 	line-height: 2rem;
					// 	height: 2rem;
					// 	width: 15%;
					// 	box-sizing: border-box;
					// }
					.icon{
						box-sizing: border-box;
						width: 15%;
						padding-left: .5rem;
						height: 2rem;
						line-height: 2rem;
						position: relative;
						img{
							width: 1.9rem;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
						}
					}
					span{
						line-height: 2rem;
						font-size: .8rem;
						height: 2rem;
						box-sizing: border-box;
						&.sc{
							width: 40%;
							padding-left: .3rem;
						}
						&.tem{
							padding-left: .5rem;
							font-weight: 400;
							width: 22%;
						}
					}
					p{
						width: 23%;
						text-align: right;
						box-sizing: border-box;
						padding-right: .8rem;
						font-size: .9rem;
					}
				}
			}
		}
	}
</style>
