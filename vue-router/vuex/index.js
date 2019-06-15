export default new Vuex.Store({
	state: {
		flag: true,
	},
	mutations: {
		changeFlag (state,data){
			state.flag = data;
		}
	}
})
