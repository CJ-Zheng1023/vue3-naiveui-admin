<template>
  <div class="range-date-picker">
    <n-date-picker v-model:value="start" :type="type" class="date-picker-item" />
      <span class="range-mark">~</span>
    <n-date-picker v-model:value="end" :type="type" class="date-picker-item" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'date' | 'datetime'
}>(), {
  type: 'date'
})
const start = defineModel<number | null>('start', { required: true })
const end = defineModel<number | null>('end', { required: true })
</script>

<style scoped lang="less">
.range-date-picker{
  display: flex;
  width: 100%;
  align-items: center;
  .date-picker-item{
    flex-grow: 1;
  }
  .range-mark {
    margin: 0 4px;
    flex-shrink: 0;
  }
}
</style>