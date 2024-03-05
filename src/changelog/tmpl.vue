<template>
  <div class="tmpl">
    <div class="date">
      <n-text italic>于{{ date }}日发布</n-text>
    </div>
    <div class="item" v-for="item in data">
      <n-h4>{{ item[0] || '' }}</n-h4>
      <n-ol>
        <n-li v-for="it in item[1]">{{ it }}</n-li>
      </n-ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
defineProps({
  data: {
    type: Array as PropType<[string, string[]][]>,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="less">
.date{
  font-size: 12px;
  margin-top: 14px;
  margin-bottom: 18px;
  text-align: right;
}
.tmpl{
  padding: 0 16px;
  .item{
    margin-bottom: 14px;
  }
}
</style>