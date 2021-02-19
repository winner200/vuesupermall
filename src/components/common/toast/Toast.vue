<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: '我是一个弹窗'
    },
    show: {
      type:Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .toast {
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
  }
  .toast div {
    width: 50%;
    height: 40px;
    color: #ffffff;
    background: rgba(0,0,0,.75);
    line-height: 40px;
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }
</style>
