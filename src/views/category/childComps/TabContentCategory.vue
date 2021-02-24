<template>
  <div>
    <grid-view></grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
