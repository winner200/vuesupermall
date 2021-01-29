<template>
	<div class="tab-bar-item" @click="itemClick">
	<!-- 	<img src="../../assets/tabbar/home.svg" alt="" />
		<div>首页</div> -->
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<!-- 动态绑定class -->
		<!-- <div :class="{active: isActive}">
			<slot name="item-text"></slot>
		</div> -->
		
		<!-- <div :style="isActive ? {color: this.activeColor} : {}">
			<slot name="item-text"></slot>
		</div> -->
		
		<!-- 通过计算属性动态绑定样式 -->
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props: {
			link: String,
			activeColor: {
				type: String,
				default: 'red'
			}
			
		},
		data() {
			return {
				// isActive: true
			}
		},
		computed: {
			isActive() {
				// home -> item1(/home) = true
				// home -> item2(/class) = false
				// home -> item3(/home) = true
				// home -> item4(/home) = true
				return this.$route.path.indexOf(this.link) !== -1
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods: {
			itemClick() {
				console.log('itemClick', this.link)
				this.$router.replace(this.link)
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}
	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}
	.active {
		color: red;
	}
</style>
