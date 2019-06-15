export default {
	template: `
	<h2 class="top-title">
		<i class="fa fa-arrow-left" v-show="$route.meta.isShowBack"  @click="$router.back()"></i>
		<slot></slot>
	</h2>
	`,
}
