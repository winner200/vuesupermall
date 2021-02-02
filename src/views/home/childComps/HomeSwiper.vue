<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // import {Swiper} from 'components/common/swiper/Swiper'
  // import {SwiperItem} from 'components/common/swiper/SwiperItem'
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  export default {
    name: 'HomeSwiter',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imageLoad() {
        console.log('监听轮播图加载')
        if(!this.isLoad)
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
</script>

<style>
</style>
