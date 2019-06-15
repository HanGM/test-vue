export default {
	template: `
	<div>
	  <table class="table table-bordered">
  		<tbody>
  		  <tr>
  		    <th width="50"><input type="checkbox"/></th>
  		    <th>商品</th>
  		    <th>价格</th>
  		    <th width="100">操作</th>
  		  </tr>
  		  <tr v-for="(item,index) in buyCarList">
  		    <td style="line-height:34px;"><input type="checkbox" checked/></td>
  		    <td style="line-height:34px;">{{item.title}}</td>
  		    <td style="line-height:34px;">{{item.price}}</td>
  		    <td><button class="btn btn-danger" @click="remove(index)">删除</button></td>
  		  </tr>
  		</tbody>
	  </table>
	  <p>商品总价为:{{totlePrice}}</p>
	</div>`,
	computed : {
		buyCarList (){
			return this.$store.state.buyCarList;
		},
		totlePrice (){
			return this.$store.getters.totlePrice
		}
	},
	methods: {
		remove (i){
			this.$store.commit('remove',i)
		}
	}
}
