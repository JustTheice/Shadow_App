/**
 *  发送ajax请求
 */
import axios from 'axios';
// axios.defaults.withCredentials = true;

export default function ajax(url, data={}, type='get', config={}){
	return new Promise(function(resolve, reject){
		let pms;
		//如果是get，就把data对象中的名值对提取出来拼接到url后。其它情况直接发送即可
		if(type == 'get'){
			let dataStr = '';
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			});
			if(dataStr != ''){
				url = url + '?' + dataStr;
			}
			pms = axios.get(url, config);
		}else{
			pms = axios.post(url, data, config);
		}
		
		//当前请求回来后，更新外部promise的状态
		pms.then((ret) => {
			resolve(ret.data);
		},(err) => {
			reject(err);
		});
	});
}