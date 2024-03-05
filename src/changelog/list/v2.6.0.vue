<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['新功能', [
    '高级检索厂商、机型、协议级联选择框中协议下拉框增加全选功能。'
  ]],
  ['调整', [
    '数据概览页面厂商列表随模态类型联动。',
    '高级检索厂商、机型、协议级联选择框随模态类型联动。'
  ]],
  ['修复', [
    '修改数据概览页面协议列表渲染大量数据时卡顿的问题。'
  ]]
]
const date = '2023-10-20'
</script>
