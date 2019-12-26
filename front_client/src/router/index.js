import Vue from 'vue'
import Router from 'vue-router'

const News = () => import('../pages/News/News.vue');
const Chatroom = () => import('../pages/Chatroom/Chatroom.vue');
const Tools = () => import('../pages/Tools/Tools.vue');
const Profile = () => import('../pages/Profile/Profile.vue');
const Topic = () => import('../pages/Topic/Topic.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
		{
			path: '/news',
			component: News,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/chatroom',
			component: Chatroom,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/tools',
			component: Tools,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/profile',
			component: Profile,
			meta: {
				showFooter: true
			}
		},
		{
			path: '/topic',
			component: Topic
		}
  ]
})
