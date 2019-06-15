export default new Vuex.Store({
	state: {
		goodsList: [{
			id: 0,
			title: '商品1',
			pic: 'img/image01.png',
			price: 988
		},{
			id: 1,
			title: '商品2',
			pic: 'img/image02.png',
			price: 1988
		},{
			id: 2,
			title: '商品3',
			pic: 'img/image03.png',
			price: 2988
		},{
			id: 3,
			title: '商品4',
			pic: 'img/image04.png',
			price: 3988
		},{
			id: 4,
			title: '商品5',
			pic: 'img/image05.png',
			price: 4988
		},{
			id: 5,
			title: '商品6',
			pic: 'img/image06.png',
			price: 6988
		}],
		buyCarList: []
	},
	mutations: {
		addBuyCar (state,data){
			state.buyCarList.push(data)
		},
		remove (state,data){
			state.buyCarList.splice(data,1)
		}
	},
	getters: {
		totlePrice (state){
			var result = 0;
			for(var i=0;i<state.buyCarList.length;i++){
				result += state.buyCarList[i].price;
			}
			return '￥' + result;
		}
	}
})
