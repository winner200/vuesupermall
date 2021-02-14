<template>
  <div class="goods-info">
    <p>{{detailInfo.desc}}</p>
    <p>{{detailInfo.detailImage[0].key}}</p>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt=""/>
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
