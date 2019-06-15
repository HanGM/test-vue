export default {
	template: `
	<div class="row">
	  <div class="col-sm-6 col-md-4" v-for="item in goodsList">
	    <div class="thumbnail">
	      <img :src="item.pic" alt="...">
	      <div class="caption">
	        <h3>{{item.title}}</h3>
	        <p>￥ {{item.price}}</p>
	        <p><a href="#" class="btn btn-primary" role="button" @click="addBuyCar(item)">加入购物车</a></p>
	      </div>
	    </div>
	  </div>
	</div>`,
	computed: {
		goodsList (){
			return this.$store.state.goodsList;
		}
	},
	methods: {
		addBuyCar (data){
			this.$store.commit('addBuyCar',data)
		}
	}
}
