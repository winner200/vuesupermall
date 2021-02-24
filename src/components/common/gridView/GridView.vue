<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GridView",
  props: {
    cols: {
      type: Number,
      default: 2
    },
    hMargin: {
      type: Number,
      default: 8
    },
    vMargin: {
      type: Number,
      default: 8
    },
    itemSpace: {
      type: Number,
      default: 8
    },
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  mounted() {
    setTimeout(this._autoLayout, 20)
  },
  methods: {
    _autoLayout() {
      // 1.获取gridEL个children
      // 注：这里为什么不用document.querySelector呢？
      // 答：因为如果在项目中，多出动用到了grid-view，那么这里就不确定获取的是哪一个了。
      let gridEL = this.$refs.gridView
      console.log('分类wdebug-2021-02-24-5:05',gridEL)
    }
  }
}
</script>

<style scoped>
  .grid-view {
    display: flex;
    flex-flow: wrap;
  }
</style>
