<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in swiperImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "GoodsDetailSwiper",
  data() {
    return {

    }
  },
  created() {
    console.log('121212', this.swiperImages)
  },
  props: {
    swiperImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
 .detail-swiper {
   height: 300px;
   overflow: hidden;
 }
</style>
