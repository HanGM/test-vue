export default {
	template:`<div>
				<h2 class="text-center">表格</h2>
				<table class="table table-bordered">
  				  <tbody>
				  <tr>
				  	<th width="60px">序号</th>
				  	<th>姓名</th>
				  	<th>性别</th>
				  	<th>年龄</th>
				  	<th width="130px">操作</th>
				  </tr>
				  <tr v-for="(item,index) in getlist">
				  	<td style="line-height: 34px;">{{index+1}}</td>
				  	<td style="line-height: 34px;" v-for="(value,key) in item" v-if="key !== 'flag'"><span v-if="item.flag">{{value}}</span><input type="text" class="form-control" v-if="!item.flag" v-model="item[key]" /></td>
				  	<td>
				  		<div class="btn-group" role="group" aria-label="...">
						  <button type="button" class="btn btn-info" @click="update(item)">{{item.flag ? '修改' : '确定'}}</button>
						  <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal" @click="getIndex(index)">删除</button>
						</div>
				  	</td>
				  </tr>
				  </tbody>
				</table>
			  </div>`,
	computed: {
		getlist (){//从仓库获取list数据
			return this.$store.state.list;
		}
	},
	methods:{
		update (v){//更新数据并将数据同步到仓库中
			v.flag = !v.flag;
			this.$store.commit('updatelist',this.getlist);
		},
		getIndex (i){
			this.$store.commit('getIndex',i);
		}
	}
}
