<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"/>
    </div>
  </div>
</template>

<script>
import { getCategory } from "network/category";

import TabMenu from "./childComps/TabMenu";

import NavBar from "components/common/navbar/NavBar";


export default {
  name: "Category",
  data() {
    return {
      categories: []
    }
  },
  components: {
    TabMenu,
    NavBar
  },
  created() {
    getCategory().then(res => {
      console.log('分类数据', res)
      this.categories = res.data.category.list
    }).catch(error=> {

    })
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .category-nav {
    background-color: var(--color-high-text);
    color: #FFFFFF;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
</style>
