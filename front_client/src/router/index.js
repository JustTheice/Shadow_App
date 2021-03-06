import Vue from 'vue'
import Router from 'vue-router'

const News = () => import('../pages/News/News.vue');
const Chatroom = () => import('../pages/Chatroom/Chatroom.vue');
const Tools = () => import('../pages/Tools/Tools.vue');
const Profile = () => import('../pages/Profile/Profile.vue');
// const Topic = () => import('../pages/Topic/Topic.vue');
const DrawSth = () => import('../pages/DrawSth/DrawSth.vue');
// const Login = () => import('../pages/Login/Login.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news',
			
    },
		{
			path: '/news',
			component: News,
			meta: {
				showFooter: true,
				keepAlive: true
			}
		},
		{
			path: '/chatroom',
			component: Chatroom,
			meta: {
				showFooter: true,
				keepAlive: true
			}
		},
		{
			path: '/tools',
			component: Tools,
			meta: {
				showFooter: true,
				keepAlive: true
			}
		},
		{
			path: '/profile',
			component: Profile,
			meta: {
				showFooter: true,
				keepAlive: true
			}
		},
		{
			path: '/drawsth',
			component: DrawSth,
			meta: {
				keepAlive: false,
				showFooter: false
			}
		},
		// {
		// 	path: '/topic',
		// 	component: Topic,
		// 	meta: {
		// 		keepAlive: false,
		// 		showFooter: false
		// 	}
		// },
		// {
		// 	path: '/login',
		// 	component: Login,
		// 	meta: {
		// 		keepAlive: false,
		// 		showFooter: false,
		// 		transition: 'right'
		// 	}
		// }
  ]
})
