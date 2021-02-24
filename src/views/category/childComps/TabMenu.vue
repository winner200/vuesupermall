<template>
  <div id="tab-menu">
    <scroll class="menu-list" ref="scroll">
    <div class="menu-list-item"
      v-for="(item, index) in categories"
      :class="{active: index===currentIndex}"
      @click="itemClick(index)">
      {{item.title}}
    </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.$refs.scroll.refresh()
  },
  activated() {
    console.log('wdebug 2021-2-22',this.$refs.scroll);
    this.$refs.scroll.refresh()
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
  #tab-menu {
    width: 100px;
    height: 100%;
    background: #f6f6f6;
    box-sizing: border-box;
  }
  .menu-list {
    height: 100%;
    overflow: hidden;
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px var(--color-high-text) solid;
  }
</style>
