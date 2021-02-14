<template>
  <div class="shopInfo">
    <div class="shop-logo">
      <img :src="shopInfo.logo" alt="">
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="shop-content">
      <div class="content-info-1">
        <div>
          <span>{{salesVolume}}万</span>
          <span class="info-1">总销量</span>
        </div>
        <div>
          <span>{{shopInfo.goodsCount}}</span>
          <span class="info-1">全部宝贝</span>
        </div>
      </div>
      <div class="content-info-2">
        <div v-for="item in shopInfo.score">
          <span>{{item.name}}</span>
          <span>{{item.score}}</span>
          <span class="info2-score-style" :class="[item.isBetter ? 'info2-score-false' : 'info2-score']">{{item.isBetter ? '高' : '低'}}</span>
        </div>
      </div>
    </div>
    <div class="enter-shop">
      <button>进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    salesVolume() {
      return (this.shopInfo.fans / 10000).toFixed(2);
    }
  }
}
</script>

<style scoped>
  .shopInfo {
    width: 96%;
    height: 220px;
    margin: 0 auto;
    font-size: var(--font-size);
  }
  .shop-logo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 80px;
  }

  .shop-logo img {
    width: 45px;
    height: 45px;
    margin-right: 15px;
  }

  .shop-content {
    width: 94%;
    height: 90px;
    align-items: center;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .content-info-1, .content-info-2 {
    width: 48%;
  }
  .content-info-1 {
    height: 45px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    border-right: 1px solid #cdcdcd;
  }
  .content-info-1 div {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .info-1 {
    margin-top: 8px;
  }
  .content-info-2 div {
    display: flex;
    align-items: center;
    height: 25px;
  }
  .content-info-2 div span {
    width: 100%;

    display: inline-block;
    text-align: center;
  }

  .info2-score {
    background: green;
  }

  .info2-score-false {
    background: #ff8198;
  }

  .info2-score-style{
    color: #FFFFFF;
    width: 20px !important;
    height: 20px;
  }
  .enter-shop {
    text-align: center;
    margin-top: 5px;
  }
</style>
