<template>
  <div>
    <goods-detail-nav-bar/>
    <goods-detail-swiper :swiper-images="topImages"/>
  </div>
</template>

<script>

import GoodsDetailNavBar from "./childComps/GoodsDetailNavBar";
import GoodsDetailSwiper from "@/views/detail/childComps/GoodsDetailSwiper";

import {getDetail} from 'network/detail'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages:[]
      }
    },
    components: {
      GoodsDetailSwiper,
      GoodsDetailNavBar
    },
    created() {
      console.log('-----',this.$route.params.iid)
      // 1.保存iid
      this.iid = this.$route.params.iid
      this._getDetail()
    },
    methods: {
      _getDetail() {
        getDetail(this.iid).then(res => {
          console.log('商品详情数据请求成功', res)
          this.topImages = res.result.itemInfo.topImages
        }).catch(error=> {
          console.log('商品详情数据请求失败', error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
