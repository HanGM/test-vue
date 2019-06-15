import store from './vuex/index.js'
import router from './component/routers.js'

new Vue({
	el: '#app',
	router,
	store,
	computed:{
		flag (){
			return this.$store.state.flag
		}
	}
})