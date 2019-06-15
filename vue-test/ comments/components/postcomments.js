export default {
	template:`
	<div>
		<textarea class="form-control" rows="3" v-model="main"></textarea><br />
		<button class="btn btn-primary btn-block" @click="addList">发布评论</button>
	</div>
	`,
	data (){
		return {
			main: ''
		}
	},
	methods: {
		addList (){
			this.$store.commit('addList',{
				main: this.main,
			})
		}
	}
}
