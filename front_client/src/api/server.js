let baseUrl_api = '/server';
import ajax from './ajax.js';
let baseUrl_Server = 'http://192.168.2.104:5000';

export const reqPhoneCode = (phone) => ajax(baseUrl_api+'/getPhoneCode', {phone});
export const reqLogin = (type, data) => ajax(baseUrl_api+'/login', {type, data}, 'POST');