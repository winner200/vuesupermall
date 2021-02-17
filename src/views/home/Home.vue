<template>
	<div id="home">
		<nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-upload="true"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <home-popular/>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
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
        isBackTopShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
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
    destroyed() {
		  console.log('home destroyed')
    },
    activated() {
		  console.log('home -- activated')
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log(this.saveY);
      console.log('home -- deactivated')
		  this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件监听
      this.$bus.$off('goodsImageLoad', this.itemImgListener)
    },
    mounted() {
      //监听goodsItem图片加载完成
     /* this.$bus.$on('goodsImageLoad', () => {
        console.log('-------');
        // console.log(this.$refs.scroll.refresh())
        this.$refs.scroll.refresh()
      })*/

      // 使用防抖动函数
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)

      // this.$bus.$on('goodsImageLoad', () => {
      //   // console.log('-------');
      //   // console.log(this.$refs.scroll.refresh())
      //   // this.$refs.scroll.refresh()
      //   refresh()
      // })

      // 对监听事件保存
      this.itemImgListener = () => {
        // console.log('-------');
        // console.log(this.$refs.scroll.refresh())
        // this.$refs.scroll.refresh()
        refresh()
      }
      this.$bus.$on('goodsImageLoad', this.itemImgListener)
    },
    methods: {
		  /**
       * 事件监听相关的方法
       */
		  debounce(func, delay) {
        let timer = null
        return function(...ages) {
         if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, ages)
          }, delay)
        }
      },
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
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
        // 1.判断BackTop是否显示
        // console.log(position.y);
        this.isBackTopShow = (-position.y) > 1000

        // 2. 决定tabControlde的是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      /*
      * 上拉加载更多
      */
      pullingUp() {
        console.log('首页加载更多');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el，用于获取组件中的元素
        console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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

          this.$refs.scroll.finishPullUp()

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

    /*
    在使用浏览器原生滚动时，为了让导航不跟随一起滚动
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;*/
  }
  /*.tab-control {
    position: sticky;
    top: 44px;
    background-color: #FFFFFF;
    z-index: 9;
  }*/
  .wrapper {
    overflow:hidden;
    position: absolute;
    top: 45px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;

    background-color: #FFFFFF;
  }

  /*.wrapper {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
