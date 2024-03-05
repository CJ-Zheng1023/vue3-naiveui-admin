<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
['新功能', [
    '增加自动检查更新功能，每半小时检查一次，有更新在页面提示。'
  ]],
  ['修复', [
    '下拉框组件过滤功能未忽略大小写的问题修改。'
  ]]
]
const date = '2023-10-25'
</script>
