<template>
	<tab-bar>
		<tab-bar-item link="/home" activeColor="#1296db">
			<img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
			<img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="" />
			<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item link="/category" activeColor="#1296db">
			<img slot="item-icon" src="~assets/img/tabbar/class.svg" alt="" />
			<img slot="item-icon-active" src="~assets/img/tabbar/class_active.svg" alt="" />
			<div slot="item-text">品类</div>
		</tab-bar-item>
		<tab-bar-item link="/cart" activeColor="#1296db">
			<img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="" />
			<img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="" />
			<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item link="/profile" activeColor="#1296db">
			<img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" />
			<img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="" />
			<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar'
	import TabBarItem from 'components/common/tabbar/TabBarItem'

	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		}
	}
</script>

<style>
</style>
