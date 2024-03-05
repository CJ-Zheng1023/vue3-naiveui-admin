<template>
  <tmpl :data="data" :date="date" />
</template>

<script setup lang="ts">
import Tmpl from '../tmpl.vue'
const data: [string, string[]][] = [
['新功能', [
    '增加用户手册浏览功能。'
  ]]
]
const date = '2023-10-31'
</script>
