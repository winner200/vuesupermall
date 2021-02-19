<template>
  <div class="bottom-bar">
    <div class="bottom-check">
      <check-buttom
        :isChecked="isSelectAll" @click.native="checkSelectAll"/>
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
    },
    isSelectAll() {

      if(this.cartList.length === 0) return false;
      // 1.使用数组的高阶函数 filter 44
      // return !(this.cartList.filter(item => !item.check).length)

      // 2.使用数组的高阶函数 find
      // return !this.cartList.find(item => !item.check)

      // 3.使用遍历
      for (let item of this.cartList) {
        if (!item.check) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkSelectAll() {
      console.log('全选按钮');
      if(this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.check = false)
      } else { // 部分或者全部不选中
        this.cartList.forEach(item => item.check = true)
      }
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
