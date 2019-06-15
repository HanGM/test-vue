import qq from './qq.js'

import address from './address.js'

import play from './play.js'

import globe from './globe.js'

import wechat from './wechat.js'

export default new VueRouter({
	routes:[{//所有路径都设置在路由中
		path:'/qq',
		component: qq
	},{
		path:'/address',
		component: address
	},{
		path:'/play',
		component: play
	},{
		path:'/globe',
		component: globe
	},{
		path:'*',//路径错误时，设置默认路径
		redirect: '/qq'//重定位路径
	},{
		path:'/wechat/:name',//
		name: 'wechat',
		component: wechat,
		meta: {
			ishidenav: true
		}
	},]
});