import {debounce} from "common/utils";

import {
  POP,
  NEW,
  SELL
} from './const'

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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      console.log('idex', index)
      switch (index) {
        case 0:
          this.currentType = POP
          break;
        case 1:
          this.currentType = NEW
          break;
        case 2:
          this.currentType = SELL
          break;
      }
    }
  }
}
