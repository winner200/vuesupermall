<template>
  <div class="param-size" v-if="Object.keys(goodsParam).length !== 0">
    <table class="content-table" v-for="(table, index) in goodsParam.sizes" :key="index">
      <tr class="content-tr" v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="param-info">
      <tr class="info-content" v-for="(item, index) in goodsParam.infos" :key="index">
        <td class="info-td1">{{ item.key }}</td>
        <td class="info-td2">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    goodsParam: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param-size {
    width: 96%;
    height: 100%;
    margin: 0 auto;
    margin-top: 10px;
    font-size: var(--font-size);
  }
  .content-table {
    width: 100%;
  }
  .content-tr {
    width: 100%;
    height: 40px;
    line-height: 40px;

    border-bottom: 1px solid rgba(100,100,100,.1);
    display: inline-block;
  }
  .content-tr td {
    width: 50px;
    text-align: left;
  }

  .param-info {
    width: 100%;
    margin: 0 auto;
    margin-top: 25px;
  }
  .info-content {
    margin-bottom: 12px;
    padding-bottom: 8px;
    display: block;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .info-td1 {
    width: 15%;
    display: inline-block;
  }
  .info-td2 {
    width: 85%;
    display: inline-block;
    color: var(--color-text);
  }
</style>
