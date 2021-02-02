<template>
  <div>
    <goods-detail/>
  </div>
</template>

<script>

  import GoodsDetail from "./childComps/GoodsDetail";
  export default {
    name: "Detail",
    data() {
      return {
        iid: null
      }
    },
    components: {
      GoodsDetail
    },
    created() {
      console.log('-----',this.$route.params.iid)
      this.iid = this.$route.params.iid
    }
  }
</script>

<style scoped>

</style>
