<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll"
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpload: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // console.log('我是scroll',this.$refs.wrapper)
    // 1.创建BetterScroll对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpload
      // listenScroll:true
    })
    // console.log('BetterScroll对象',this.scroll)
    // this.scroll.refresh()

    // this.scroll.scrollTo(0, 0)

    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log('监听滚动位置',position);
      this.$emit('scroll', position)
    })

    // 3.监听上拉加载更多
    this.scroll.on('pullingUp', ()=> {
      console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      console.log('-----scroll')
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
  activated() {
    // this.scroll.refresh()
  }
}
</script>

<style scoped>

</style>
