<template>
  <div class="border-all">
    <div class="comment" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .border-all {
    width: 100%;
    /*height: 120px;*/
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 10px solid #e7e7e7;
    padding: 10px 0px 15px 0px;
  }
  .comment {
    width: 25%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
  .comment img {
    width: 75px;
    height: 75px;
  }
  .comment div {
    font-size: 13px;
    text-align: center;
    margin-top: 5px;
  }
</style>
