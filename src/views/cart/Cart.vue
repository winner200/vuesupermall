<template>
	<div class="cart">
  <!-- 导航 -->
		<nav-bar class="nav-bar">
      <div slot="center">购物车（{{ length }}）</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
	</div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import { mapGetters } from 'vuex'

  import CartList from "./childComps/CartList";
  import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // }
      // 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength',
      })

    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-high-text);
    color: #FFFFFF;
  }
</style>
