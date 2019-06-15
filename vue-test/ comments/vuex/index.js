export default new Vuex.Store({
	state: {
		list: [],
	},
	mutations: {
		addList (state,data){
			state.list.push(data)
		},
		
	}
})
