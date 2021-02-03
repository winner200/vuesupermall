<template>
  <div>
    <goods-detail-nav-bar/>
    <goods-detail-swiper :swiper-images="topImages"/>
    <detail-base-info :goods-info="goods"/>
  </div>
</template>

<script>

import GoodsDetailNavBar from "./childComps/GoodsDetailNavBar";
import GoodsDetailSwiper from "./childComps/GoodsDetailSwiper";
import DetailBaseInfo from './childComps/DetailBaseInfo'

import {getDetail, Goods} from 'network/detail'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {}
      }
    },
    components: {
      GoodsDetailSwiper,
      GoodsDetailNavBar,
      DetailBaseInfo
    },
    created() {
      console.log('-----',this.$route.params.iid)
      // 1.保存iid
      this.iid = this.$route.params.iid
      this._getDetail()
    },
    methods: {
      _getDetail() {
        // 1.根据iid请求详情数据
        getDetail(this.iid).then(res => {
          console.log('商品详情数据请求成功', res)
          const data = res.result
          // 1.获取顶部的图片轮播图数据
          this.topImages = data.itemInfo.topImages

          // 2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        }).catch(error=> {
          console.log('商品详情数据请求失败', error)
        })
      },
    }
  }
</script>

<style scoped>

</style>
