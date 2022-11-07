// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/';
import VueLazyload from 'vue-lazyload';
import dateFns from 'date-fns/format';
//websocket
import VueSocketIO from 'vue-socket.io'

import '../static/js/backfix.js';
import { baseUrl_Server } from './api/server'

Vue.config.productionTip = true;

Vue.use(MintUI);
Vue.use(new VueSocketIO({
	debug: true,
	connection: baseUrl_Server,
	// connection: 'http://127.0.0.1:5000',
	sockets: {
		connect: function () {
				console.log('socket.io连接成功')
		},
		customEmit: function (data) {
				console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
		}
	},
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
	}
}));

//图片懒加载
Vue.use(VueLazyload, {
	loading: '../static/img/loading.gif'
});

Vue.filter('dateFormat', function(v,format='yyyy-MM-dd HH:mm:ss'){
	return dateFns(v, format);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>',
});
