
import store from './vuex/index.js';
import goods from './comonents/goods.js';
import buyCar from './comonents/buycar.js';

new Vue({
	el: '#app',//控制范围
	store,//添加数据仓库
	components: {//组件
		goods,
		buyCar
	}
})