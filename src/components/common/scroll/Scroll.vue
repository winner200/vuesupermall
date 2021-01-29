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
    }
  },
  mounted() {
    // console.log('我是scroll',this.$refs.wrapper)
    // 1.创建BetterScroll对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      // pullUpLoad: true
      // listenScroll:true
    })
    // console.log('BetterScroll对象',this.scroll)
    // this.scroll.refresh()

    // this.scroll.scrollTo(0, 0)

    // 2. 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      console.log('监听滚动位置',position);
      this.$emit('scroll', position)
    })
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  activated() {
    // this.scroll.refresh()
  }
}
</script>

<style scoped>

</style>
