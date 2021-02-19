<template>
  <div class="check-buttom" :class="{check: isChecked}">
    <img class="check-img" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check-buttom {
    width: 20px;
    border-radius: 50%;
    border: 2px solid #aeadad;
    text-align: center;
  }

  .check {
    border-color: red;
    background: red;
  }

  .check-img {
  }
</style>
