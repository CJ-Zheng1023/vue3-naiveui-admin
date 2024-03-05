<template>
  <n-input-group>
    <n-input-group-label>{{ labelName }}</n-input-group-label>
    <n-popover trigger="hover" :disabled="disabled">
      <template #trigger>
        <n-input ref="inputRef" :style="{ width: width }" :value="value" @update:value="handleUpdateValue" :placeholder="placeHolder" />
      </template>
      <span>{{ value }}</span>
    </n-popover>
  </n-input-group>
</template>

<script setup lang="ts">
import { InputInst } from 'naive-ui'

defineProps({
  labelName: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: '180px'
  },
  value: {
    type: String,
    required: true
  },
  placeHolder: {
    type: String,
    default: '多个关键词用逗号分隔'
  }
})
const emit = defineEmits(['update:value'])
const inputRef = ref<InputInst | null>(null)
const disabled = ref(true)
const handleUpdateValue = (value: string) => {
  disabled.value = inputRef.value?.inputElRef?.offsetWidth === inputRef.value?.inputElRef?.scrollWidth
  emit('update:value', value)
}
</script>

<style scoped>

</style>