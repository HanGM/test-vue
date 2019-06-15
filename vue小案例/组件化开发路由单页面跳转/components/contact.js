export default {
	template: `
	<div class="contact">
		<top-title>联系人</top-title>
		<main>	
		<div class="media" v-for="item in friendList">
			<router-link :to="{name: 'wechat',params: {name: item.name}}">
				<div class="media-left">
				    <a href="#">
				      <img width=50 height=50 class="media-object img-circle" :src="item.pic" alt="...">
				    </a>
				</div>
				<div class="media-body">
				    <h4 class="media-heading">{{item.name}}</h4>
				    <p>{{item.tips}}</p>
				</div>
			</router-link>
		</div>
		</main>
	</div>
	`,
	computed: {
		friendList (){
			return this.$store.state.friendList;
		}
	}
}
