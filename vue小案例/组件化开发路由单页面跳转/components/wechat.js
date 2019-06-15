export default {
	template: `
	<div class="wechat">
		<top-title>{{$route.params.name}}</top-title>
		<div>聊天内容区</div>
		<footer><input type="text"/><button>发送</button></footer>
	</div>
	`,
	mounted (){
		this.$store.commit('changeFlag',false)
	},
	destroyed (){
		this.$store.commit('changeFlag',true)
	}
}
