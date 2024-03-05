<template>
  <n-switch v-model:value="value" v-bind="$attrs">
    <template #checked>{{ positiveText }}</template>
    <template #unchecked>{{ negativeText }}</template>
  </n-switch>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  positiveText?: string
  negativeText?: string
}>(), {
  positiveText: '',
  negativeText: ''
})
const value = defineModel<boolean>('value')
</script>

<style scoped>

</style>