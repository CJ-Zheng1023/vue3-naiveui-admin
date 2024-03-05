<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
  ['调整', [
    '平台唤醒客户端的交互方式调整。'
  ]]
]
const date = '2023-12-27'
</script>
