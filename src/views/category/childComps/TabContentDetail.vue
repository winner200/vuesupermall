<template>
  <grid-view>
    <goods-item v-for="(item, index) in categoryDetail" :key="index" :goodsItem="item"></goods-item>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodsItem from "components/content/goods/GoodsItem";
export default {
  name: "TabContentDetail",
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  components: {
    GridView,
    GoodsItem
  }
}
</script>

<style scoped>

</style>
