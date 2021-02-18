<template>
  <div id="detail">
    <goods-detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <goods-detail-swiper :swiper-images="topImages"/>
      <detail-base-info :goods-info="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :goods-param="goodsParam" />
      <detail-coment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar class="bottom-bar"/>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

import {itemListenerMixin} from "common/mixin";

import {debounce} from "common/utils";

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
        recommends: [],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex: 0
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
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    created() {
      console.log('-----',this.$route.params.iid)
      // 1.保存iid
      this.iid = this.$route.params.iid
      this._getDetail()
      this._getRecommend()

      // 给getThemeTopY赋值(给this.getThemeTopY赋值操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      })

      /*
      this.$nextTick(() => {
        // 根据最新数据，对应的DOM渲染出来了。但是图片没有渲染下来（目前的offsetTop不包含其中的图片）
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      })
       */
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
          // console.log('商品详情数据请求失败', error)
        })
      },

      // 获取推荐数据
      _getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list
        }).catch(error=> {
          // console.log('获取推荐数据失败')
        })
      },

      // 监听图片是否加载完成
      imageLoad() {
        this.$refs.scroll.refresh(this.$refs.scroll.refresh, 500)
        // 获取图片的高度，进行点击tabbar跳转
        this.getThemeTopY()
      },

      // 监听详情页tabbar点击
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]+44, 200)
      },

      // 监听滚动
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y + 44

        // 2.positionY和主题中的值进行对比
        // [0, 6191, 6802, 7000, Number.MAX_VALUE], Number.MAX_VALUE是js里面获取最大值
        // console.log(Number.MAX_VALUE)

        // positionY 在 0 和 6191 之间，index = 0
        // positionY 在 6191 和 6802 之间，index = 1
        // positionY 在 6802 和 7000 之间，index = 2

        // positionY 大于都等于 7000，index = 3
        let length = this.themeTopYs.length
        /*
        for(let i = 0; i < length; i++) {
          //console.log(i) // string 0 + 1 =01
          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
          //   console.log(i)
          // }

          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }
         */

        for(let i = 0; i < length-1; i++) {
         if(this.currentIndex !==i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
           this.currentIndex = i
           this.$refs.navBar.currentIndex = this.currentIndex
         }
        }
      }
    },
    mounted() {
     // console.log('我是正常mounted的内容')

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
    height: calc(100% - 44px - 50px);
  }
</style>
