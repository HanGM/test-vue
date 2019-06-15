export default {
	template: `
				<div>
					<button class="btn btn-default" @click="$router.back()">返回</button>
					<h1>{{$route.params.name}}</h1>
					<div>聊天内容区</div>
					<footer><input type="text"/><button>点击</button></footer>
				</div>
				`,
	mounted (){
		if(this.$route.meta.ishidenav){
			this.$store.commit('changeFlag',false)
		}else{
			this.$store.commit('changeFlag',true)
		}
	}
}

