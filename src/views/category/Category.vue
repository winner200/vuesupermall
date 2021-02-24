<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
    </div>
  </div>
</template>

<script>
import { getCategory, getSubcategory, getCategoryDetail } from "network/category";

import {POP, NEW, SELL} from 'common/const'

import TabMenu from "./childComps/TabMenu";

import NavBar from "components/common/navbar/NavBar";


export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    }
  },
  components: {
    TabMenu,
    NavBar
  },
  created() {
    this._getCategory()
    this._getCategoryDetail()
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        console.log('分类数据', res)
        this.categories = res.data.category.list
      }).catch(error=> {

      })
    },
    _getSubcategory(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey;
      console.log('-----',mailKey)
      getSubcategory(mailKey).then(res => {
        console.log('------',res)
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}

      })


    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      // const miniWallkey = this.categories[this.currentIndex].miniWallkey

      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail('10062603', 'pop').then(res => {
        console.log('分类数据详情',res)
        // this.categoryData[this.currentIndex].categoryDetail[type] = res
      })
    },
    selectItem(index) {
      this._getSubcategory(index)
    }
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
