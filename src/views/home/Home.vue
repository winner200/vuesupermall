<template>
	<div id="home">
		<nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <scroll class="wrapper" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-popular />
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow"/>
	</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'
  import Tabcontrol from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop"

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import TabControl from "@/components/content/tabControl/TabControl"
	export default {
		name: 'Home',
    components: {
      TabControl,
      NavBar,// 首页导航
      HomeSwiper,// 首页轮播图
      HomeRecommend, //首页推荐
      HomePopular, //首页流行
      Tabcontrol, // 首页导航
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
		  return {
		    result: null,
        banners: [], //首页轮播图列表
        recommends: [],
        goods: {
          'pop': {page: 0, lists: []},
          'new': {page: 0, lists: []},
          'sell': {page: 0, lists: []}
        },
        currentType: 'pop',
        isBackTopShow: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].lists
      }
    },
    created() {
		  this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //监听goodsItem图片加载完成
      this.$bus.$on('goodsImageLoad', () => {
        console.log('-------');
        // console.log(this.$refs.scroll.refresh())
        this.$refs.scroll.refresh()
      })
    },
    methods: {
		  /**
       * 事件监听相关的方法
       */
		  tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },

      /*
      * 返回到顶部
      */
      backTopClick() {
        console.log('监听返回到顶部')
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 返回顶部按钮隐藏与显示
      contentScroll(position) {
        console.log(position.y);
        this.isBackTopShow = (-position.y) > 1000
      },
      /**
       * 网络请求相关方法
       */
		  // 首页数据
      getHomeMultidata() {
        getHomeMultidata().then(res=> {
          console.log('数据获取成功', res);
          this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }).catch(err => {
          console.log('数据获取失败');
        })
      },
      // 请求首页商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log('商品数据获取成功', res);
          this.goods[type].lists.push(...res.data.list)
          this.goods[type].page += 1

        }).catch(err => {
          console.log('商品数据获取失败', err);
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-high-text);
    color: #FFFFFF;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #FFFFFF;
    z-index: 9;
  }
  .wrapper {
    overflow:hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.wrapper {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
