import Vue from 'vue'
import Router from 'vue-router'

const News = () => import('../pages/News/News.vue');
const Chatroom = () => import('../pages/Chatroom/Chatroom.vue');
const Tools = () => import('../pages/Tools/Tools.vue');
const Profile = () => import('../pages/Profile/Profile.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
		{
			path: '/news',
			component: News
		},
		{
			path: '/chatroom',
			component: Chatroom
		},
		{
			path: '/tools',
			component: Tools
		},
		{
			path: '/profile',
			component: Profile
		},
  ]
})
