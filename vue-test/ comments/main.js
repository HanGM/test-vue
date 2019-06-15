import store from './vuex/index.js'
import postComments from './components/postcomments.js'
import showComments from './components/showcomments.js'

new Vue({
	el: '#app',
	store,
	components: {
		postComments,
		showComments
	}
})
