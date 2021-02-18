import {debounce} from "common/utils";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('goodsImageLoad', this.itemImgListener)
    // console.log('我是混入的mounted');
  }
}
// 返回顶部封装

import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  data(){
    return {
      isBackTopShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    /*
    * 返回到顶部
    */
    backTopClick() {
      console.log('监听返回到顶部')
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isBackTopShow = (-position.y) > 1000
    }
  }

}
