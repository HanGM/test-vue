import msg from '../components/msg.js'
import contact from '../components/contact.js'
import look from '../components/look.js'
import globe from '../components/globe.js'
import wechat from '../components/wechat.js'

export default new VueRouter({
	routes: [{
		path: '/msg',
		component: msg
	},{
		path: '/contact',
		component: contact
	},{
		path: '/look',
		component: look
	},{
		path: '/globe',
		component: globe
	},{
		path: '*',
		redirect: '/msg'
	},{
		path: '/wechat/:name',
		name: 'wechat',
		component: wechat,
		meta: {
			isShowBack: true
		}
	}]
})