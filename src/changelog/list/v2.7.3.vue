<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['新功能', [
    '影像检索增加模态类型MG,NM,RF,DX。',
    '影像检索导入功能执行成功后缓存导入配置，在下次打开导入窗口时默认展示。'
  ]]
]
const date = '2024-01-11'
</script>
