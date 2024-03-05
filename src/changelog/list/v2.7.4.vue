<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['新功能', [
    '数据集详情增加数据集下载功能。'
  ]],
  ['调整', [
    '下载打开客户端时传参调整。'
  ]]
]
const date = '2024-02-02'
</script>
