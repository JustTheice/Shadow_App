import ajax from './ajax';
let Base_Url = 'http://api.tianapi.com/txapi/'
let key = 'c16974c0d9041314dc51d9ce502d0d05'

//左边转换
// export const reqAddress = (data) => ajax(Base_Url+'/geoconvert/index', {lat: data.latitude, lng:data.longtitude, key})
//天气查询
export const reqWeather = (city) => ajax(Base_Url+'tianqi/index', {key,city});
//获取灯谜
export const reqRiddle = () => ajax(Base_Url+'/caizimi/index', {key});
//获取疫情主体信息
export const reqNcov = () => ajax(Base_Url+'/ncov/index', {key});
//获取疫情省市信息
export const reqNcovCity = () => ajax(Base_Url+'/ncovcity/index', {key});