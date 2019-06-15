export default {
	template: `
				<div>
					<h1>联系人</h1>
					<div class="media" v-for="item in friendList">
					  <router-link :to="{name: 'wechat',params: {name: item.name}}">
					  <div class="media-left">
					    <a href="#">
					      <img width=50 height=50 class="media-object img-circle" :src="item.pic" alt="...">
					    </a>
					  </div>
					  <div class="media-body">
					    <h4 class="media-heading">{{item.name}}</h4>
					    {{item.word}}
					  </div>
					  </router-link>
					</div>
				</div>
				`,
	data (){
		return {
			friendList: [{
				pic: 'img/image01.png',
				name: 'xiaoming',
				word: 'fasfsfsd'
			},{
				pic: 'img/image02.png',
				name: 'xiaohong',
				word: 'fasfsfsd'
			},{
				pic: 'img/image03.png',
				name: 'xiaohui',
				word: 'fasfsfsd'
			},{
				pic: 'img/image04.png',
				name: 'xiaogang',
				word: 'fasfsfsd'
			}]				
		}
	},
	mounted (){
		if(this.$route.meta.ishidenav){
			this.$store.commit('changeFlag',false)
		}else{
			this.$store.commit('changeFlag',true)
		}
	}
}