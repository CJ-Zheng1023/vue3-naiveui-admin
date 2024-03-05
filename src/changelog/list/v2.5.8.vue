<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['新功能', [
    '登录页面增加用户须知勾选项、查看用户须知等功能。',
    '数据集详情增加标注功能。',
    '数据集详情增加标注管理功能。'
  ]],
  ['调整', [
    '影像检索默认检查时间段调整。',
    '进入影像检索页面默认触发检索。'
  ]]
]
const date = '2023-10-11'
</script>
