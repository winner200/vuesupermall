<template>
  <div class="border-all">
    <div class="border-content" v-for="(item, index) in titles"
         :class="{active: index === currentIndex}"
         @click="tabClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .border-all {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 15px;
  }
  .border-content {
    height: 30px;
    display: flex;
    align-items: center;
  }
  .border-content span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
  }
  .active span {
  }
</style>
