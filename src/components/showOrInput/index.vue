<template>
  <div class="show-or-input">
    <div class="editor" v-if="editable">
      <n-input size="small" ref="inputRef" v-model:value="inputValue" @blur="handleBlur" />
    </div>
    <div @click="handleClick" class="content" v-else>{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { InputInst } from 'naive-ui'
const props = defineProps({
  value: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:value'])
const editable = ref(false)
const inputValue = ref(props.value)
const inputRef = ref<InputInst | null>(null)
const handleBlur = () => {
  if (props.value !== inputValue.value) {
    emit('update:value', inputValue.value)
  }
  editable.value = false
}
const handleClick = () => {
  editable.value = true
  inputValue.value = props.value
  nextTick(() => {
    inputRef.value?.focus()
  })
}
</script>

<style scoped>

</style>