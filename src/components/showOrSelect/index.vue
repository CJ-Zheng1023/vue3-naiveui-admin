<template>
  <div class="show-or-edit" v-show="!loading">
    <template v-if="editable">
      <custom-select
        :options="options"
        :value="value"
        multiple
        width="100%"
        @update:value="handleUpdateValue"
        valueField="key"
        size="small"
      />
    </template>
    <template v-else>
      <n-space>
        <n-tag
          v-for="item in tagNames"
          :key="item" size="small"
          :bordered="true"
          type="info"
        >
          {{ item }}
        </n-tag>
      </n-space>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import CustomSelect from '@/components/select/index.vue'
const props = defineProps({
  value: {
    type: Array as PropType<Array<string | number>>,
    default: []
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<Array<{ key: string | number, label: string }>>,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:value'])
// 映射对应的名称
const tagNames = computed(() => {
  return props.value.map(item => {
    const option = props.options.find(op => op.key === item)
    return option ? option.label : item
  })
})
// 监听value更新
const handleUpdateValue = (value: Array<string | number>) => {
  emit('update:value', value)
}
</script>

<style scoped lang="less">

</style>