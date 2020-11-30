let baseUrl_api = '/server';
import ajax from './ajax.js';
let baseUrl_Server = 'http://192.168.2.104:5000';
// let baseUrl_Server = 'http://127.0.0.1:5000';

export const reqPhoneCode = (phone) => ajax(baseUrl_Server+'/getPhoneCode', {phone}, 'get', { withCredentials: true});
export const reqLogin = (sendData) => ajax(baseUrl_Server+'/login', sendData, 'POST', { withCredentials: true});
//自动登录
export const autoLogin = () => ajax(baseUrl_Server+'/autoLogin', {}, 'get', {withCredentials: true});
//更新用户信息
export const updateInfo = (info) => ajax(baseUrl_Server+'/updateInfo', info, 'POST', {withCredentials: true}); 
//修改密码
export const updatePwd = (pwds) => ajax(baseUrl_Server+'/updatePwd', pwds, 'POST', {withCredentials: true});
//注销账号
export const signout = () => ajax(baseUrl_Server+'/signout', {}, 'get', {withCredentials: true});
//获取积分榜
export const getRank = () => ajax(baseUrl_Server+'/getRank', {}, 'get');
//上传头像
export const uploadAvatar = (file) => {
	return ajax(baseUrl_Server+'/uploadAvatar', file, 'POST', {withCredentials: true})
 };
	// headers:{'Content-Type':'multipart/form-data'}