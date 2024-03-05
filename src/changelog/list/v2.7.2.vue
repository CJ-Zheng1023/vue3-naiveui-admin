<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['新功能', [
    '课题模块中数据集增加分享功能。课题负责人可以把数据集分享给任意课题。'
  ]]
]
const date = '2024-01-03'
</script>
