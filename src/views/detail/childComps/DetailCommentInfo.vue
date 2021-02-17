<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-top">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="info-center">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <p>{{commentInfo.content}}</p>
    <p class="info-time">
      <span>{{commentInfo.created | showData}}</span>
      <span>{{commentInfo.style}}</span>
    </p>
    <div class="info-bottom">
      <div class="comment-img">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showData(value) {
      // 1.将时间戳转成Date对象
      const date = new Date( value * 1000 )

      // 2.将data进行格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    width: 96%;
    margin: 0 auto;
    font-size: var(--font-size);
  }
  .info-top,.info-center {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(100,100,100,.1);
    height: 35px;
  }
  .info-center {
    border: none;
    height: 55px;
  }
  .info-center img{
    width: 35px;
    height: 35px;
  }

  .info-time {
    display: flex;
    margin-top: 10px;
  }
  .info-time span:first-child {
    margin-right: 15px;
  }
</style>
