<template>
  <n-tag :type="tagType" v-bind="$attrs">{{ text }}</n-tag>
</template>

<script setup lang="ts">
import { Size } from 'naive-ui/es/button/src/interface'
const props = withDefaults(defineProps<{
  flag: boolean,
  positiveText?: string
  negativeText?: string
  size?: Size
}>(), {
  positiveText: '启用',
  negativeText: '停用',
  size: 'small'
})
const tagType = computed(() => props.flag ? 'success' : 'warning')
const text = computed(() => props.flag ? props.positiveText : props.negativeText)
</script>

<style scoped>

</style>