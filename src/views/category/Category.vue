<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <scroll id="tab-content" ref="content">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
import  {tabControlMixin} from 'common/mixin'

import {POP, NEW, SELL} from 'common/const'

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from './childComps/TabContentDetail'

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1
    }
  },
  mixins: [tabControlMixin],
  components: {
    TabMenu,
    NavBar,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  created() {
    console.log('这不是威胁')
    this._getCategory()
  },
  mounted() {
    this.$refs.content.scroll.refresh()
  },
  activated() {
    this.$refs.content.scroll.refresh()
  },
  computed: {
    showSubcategory() {
      console.log('0000',this.categoryData)
      if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        console.log('分类数据', res)
        this.categories = res.data.category.list
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 请求第一个分类的数据
        this._getSubcategory(0)
      }).catch(error=> {

      })
    },
    _getSubcategory(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
      console.log('wdebug 2021-02-27 17:51')
      this.$refs.content.scroll.refresh()
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        console.log('分类数据详情',res)
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
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
  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
