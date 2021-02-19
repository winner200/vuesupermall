<template>
  <div class="bottom-bar">
    <div class="bottom-check">
      <check-buttom/>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：{{totalPrice}}</span>
    </div>
    <div class="calculate">
      <button>去计算: ({{checkLength}})</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CheckButtom from 'components/content/checkButton/CheckButton'
export default {
  name: "CartBottomBar",
  components: {
    CheckButtom
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item=> {
        return item.check
      }).reduce((prvValue, item)=> {
        return prvValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item=> item.check).length
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background: #eee;
  }

  .bottom-check {
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .total-price {
    width: 150px;
    margin-left: 20px;
  }
  .calculate {
    width: 170px;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: flex-end;
  }
  .calculate button {
    width: 95px;
    height: 100%;

    border: none;
    outline: none;

    background: red;
    color: #FFFFFF;
  }
</style>
