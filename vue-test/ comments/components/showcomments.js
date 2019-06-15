export default {
	template:`
	<div>
		<h4 class="text-center">评论区</h4>
		<div v-for="(item,index) in list">
		<span>{{index+1}}楼用户:</span>
		<span>{{item.main}}</span>
		</div>
	</div>
	`,
	computed: {
		list (){
			return this.$store.state.list;
		}
	}
}
