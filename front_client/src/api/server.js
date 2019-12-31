let baseUrl_api = '/server';
import ajax from './ajax.js';
let baseUrl_Server = 'http://192.168.2.104:5000';

export const reqPhoneCode = (phone) => ajax(baseUrl_Server+'/getPhoneCode', {phone}, 'get', { withCredentials: true});
export const reqLogin = (sendData) => ajax(baseUrl_Server+'/login', sendData, 'POST', { withCredentials: true});
export const autoLogin = () => ajax(baseUrl_Server+'/autoLogin', {}, 'get', { withCredentials: true});