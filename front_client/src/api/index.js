import ajax from './ajax.js';
let baseUrl_News = 'http://api.tianapi.com/';
let key_News = 'c16974c0d9041314dc51d9ce502d0d05&num=10';
export default {
	reqITNews(){
		return ajax(baseUrl_News+'/it/index', {key: key_News});
	}
}
	