<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: '我是一个弹窗'
    // },
    // show: {
    //   type:Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='我是一个total', duration=2000) {
      // es5参数默认值
      // duration = duration || 2000
      // console.log(message, duration)

      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      }, duration)
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
    z-index: 999;
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
