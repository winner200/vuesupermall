<template>
  <!-- TODO
  v-if="Object.keys(goodsInfo).length !==0" 如果要是不加这个，下面的v-for="index in goodsInfo.services.length-1"这就会报错，
  会影响一定的性能，但是还没有找到好的解决方案。
  1.使用了watch监听，但是还是有问题。
  -->
  <div class="border" v-if="Object.keys(goodsInfo).length !==0">
    <div class="title">
      <p>{{goodsInfo.title}}</p>
    </div>
    <div class="price">
      <span class="price-1">{{goodsInfo.newPrice}}</span>
      <span class="price-2">{{goodsInfo.oldPrice}}</span>
      <img src="" alt="">
    </div>
    <div class="statistics">
      <span v-for="item in goodsInfo.columns">{{item}}</span>
    </div>
    <div class="after-sale">
      <div v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{goodsInfo.services[index-1].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: {}
    }
  },
  computed: {
    goodsList() {
      return this.goodsInfo
    }
  },
  watch: {
    goodsList: {
      handler(newV, oldV) {
        console.log('我是：newV',newV);
        console.log('我是：oldV',oldV);
      },
      deep: true
    }
  },
}
</script>

<style scoped>
 .price, .statistics, .after-sale, .title{
   padding: 0px 10px 0px 10px;
   font-size: var(--font-size);
 }
 .title {
   margin: 10px 0px 5px 0px;
   line-height: 1.7;
 }
 .price {
   height: 50px;

   display: flex;
   align-items: center;
  }
 .price-1 {
   font-size: 25px;
   color: var(--color-text);
 }
 .price-2 {
   width: 20px;
   color: #cdcdcd;

   margin: 5px 0px 0px 10px;
 }
 .price-2 :after{
   background-color: red;
 }
  .statistics {
    height: 30px;
    color: #aeadad;

    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cdcdcd;

  }
  .after-sale {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 5px solid #ededed;
  }
 .after-sale div {
   display: flex;
   align-items: center;
 }
  .after-sale div img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
</style>
