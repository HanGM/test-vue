export default {
	template: `<div>
			  <h2 class="text-center">表单</h2>
			  <div class="form-group">
			    <label for="username">姓名</label>
			    <input type="text" class="form-control" id="username" v-model="username" placeholder="姓名">
			  </div>
			  <div class="form-group">
			    <label for="gender">性别</label>
			    <input type="text" class="form-control" id="gender" v-model="gender" placeholder="性别">
			  </div>
			  <div class="form-group">
			    <label for="age">年龄</label>
			    <input type="text" class="form-control" id="age" v-model="age" placeholder="年龄">
			  </div>
			  <div class="form-group">
			  <button type="submit" class="btn btn-primary btn-block" @click="add">添加</button>
			  </div>
			</div>`,
	data (){
		return {
			username : "",
			gender : "",
			age : "",
		}
	},
	methods: {
		add (){//form表单向仓库添加数据
			this.$store.commit('addlist',{
				name: this.username,
				gender: this.gender,
				age: this.age,
				flag: true
			})
		}
	}
}
