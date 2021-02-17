<template>
  <div id="detail">
    <goods-detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <goods-detail-swiper :swiper-images="topImages"/>
      <detail-base-info :goods-info="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :goods-param="goodsParam" />
      <detail-coment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>

import GoodsDetailNavBar from "./childComps/GoodsDetailNavBar";
import GoodsDetailSwiper from "./childComps/GoodsDetailSwiper";
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailComentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import {itemListenerMixin} from "common/mixin";

export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommends: []
      }
    },
  mixins: [itemListenerMixin],
    components: {
      DetailComentInfo,
      DetailShopInfo,
      GoodsDetailSwiper,
      GoodsDetailNavBar,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
    },
    created() {
      console.log('-----',this.$route.params.iid)
      // 1.保存iid
      this.iid = this.$route.params.iid
      this._getDetail()
      this._getRecommend()
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

          console.log('wdebug20210104', this.goods.services.length)
          // 3.创建店铺基本信息
          this.shopInfo = new Shop(data.shopInfo)

          // 4.保存商品详情数据
          this.detailInfo = data.detailInfo

          // 5.保存商品参数信息
          this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          // 6.取出评论信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }

        }).catch(error=> {
          console.log('商品详情数据请求失败', error)
        })
      },

      // 获取推荐数据
      _getRecommend() {
        getRecommend().then(res => {
          console.log('获取推荐数据成功', res)
          this.recommends = res.data.list
        }).catch(error=> {
          console.log('获取推荐数据失败')
        })
      },

      // 监听图片是否加载完成
      imageLoad() {
        this.$refs.scroll.refresh(this.$refs.scroll.refresh, 500)
      }
    },
    mounted() {
     console.log('我是正常mounted的内容')
    },
    destroyed() {
      this.$bus.$off(this.itemImgListener)
    }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #FFFFFF;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background: #FFFFFF;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
