
import store from './vuex/index.js';
import myForm from './comonents/myform.js';
import myTable from './comonents/mytable.js';

new Vue({
	el: '#app',//控制范围
	data: {//数据
		
	},
	store,//添加数据仓库
	components: {//组件
		myForm,
		myTable
	},
	methods: {
		remove (){//删除数据
			this.$store.commit('removelist')
		}
	}
})