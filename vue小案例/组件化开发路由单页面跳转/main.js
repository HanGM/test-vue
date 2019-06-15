import store from './store/store.js'
import router from './router/router.js'
import topTitle from './components/top-title.js'
Vue.component('topTitle',topTitle)
var vm = new Vue({
	el: '#app',
	store,
	router,	
	computed: {
		mainList (){
			return this.$store.state.mainList;
		},
		flag (){
			return this.$store.state.flag;
		}
	}
});
//router.afterEach((to,from) =>{//全局后置钩子函数，可以获取to和from路由$route对象
//	vm.$store.commit('changeFlag',to.meta.isShowBack == undefined ? true : false)
//})