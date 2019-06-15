export default new Vuex.Store({
		state: {
			num : 0,
			list : [{
				username : "小明",
				gender : "男",
				age : 16,
				flag : true
			},{
				username : "小辉",
				gender : "男",
				age : 18,
				flag : true
			},{
				username : "小红",
				gender : "女",
				age : 14,
				flag : true
			},]
		},
		mutations: {//待触发事件
			addlist (state,data){//向仓库添加数据
				state.list.push(data)
			},
			updatelist (state,data){//将仓库中数据更新
				state.list = data;
				console.log(state.list)
			},
			getIndex (state,data){//更新仓库num值
				state.num = data;
			},
			removelist (state){//因数据都在仓库中，删除数据时直接让外部组件调用内部执行函数即可
				state.list.splice(state.num,1);
			}
		}
	
});