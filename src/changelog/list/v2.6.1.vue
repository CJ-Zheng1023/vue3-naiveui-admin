<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['调整', [
    '影像检索页面默认pageSize和pageSize选项调整。'
  ]]
]
const date = '2023-10-20'
</script>
