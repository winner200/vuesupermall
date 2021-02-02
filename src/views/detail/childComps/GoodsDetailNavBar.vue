<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt=""/>
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
export default {
  name: "GoodsDetail",
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      console.log('点击商品详情标题');
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }

}
</script>

<style scoped>
  .title {
    display: flex;
    justify-content: space-between;
  }
  .active {
    color: var(--color-high-text);
  }

  .back img {
    display: flex;
    align-items: center;
  }
</style>
