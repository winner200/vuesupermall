<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <p>{{detailInfo.desc}}</p>
    <p>{{detailInfo.detailImage[0].key}}</p>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imageLoad"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imageLoad() {

      // 判断，所有的图片都加载完了，那么进行一次回调就可以了。
      if(++this.counter === this.imagesLength) {
        console.log('图片加载了');
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    // 获取图片的个数
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
  p {
    font-size: var(--font-size);
    margin-bottom: 10px;
  }
  .info-list img{
    width: 100%;
  }
</style>
