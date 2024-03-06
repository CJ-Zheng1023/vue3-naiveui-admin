<template>
  <template v-if="editable">
    <template v-if="type === 'number'">
      <n-input-number
        v-bind="$attrs"
        :value="numberValue"
        clearable
        style="width: 100%;"
        @update:value="handleUpdateValue"
        size="small"
      />
    </template>
    <template v-else-if="type === 'input'">
      <n-input
        v-bind="$attrs"
        :value="inputValue"
        clearable
        style="width: 100%;"
        @update:value="handleUpdateValue"
        size="small"
      />
    </template>
    <template v-else-if="type === 'select'">
      <loadable-select
        v-bind="$attrs"
        :type="LoadableSelectTypeEnum.LOCAL"
        :value="selectValue"
        style="width: 100%;"
        @update:value="handleUpdateSelectValue"
        size="small"
      />
    </template>
    <template v-else>
      <boolean-switch
        v-bind="$attrs"
        :value="booleanValue"
        @update:value="handleUpdateValue"
        size="small"
      />
    </template>
  </template>
  <template v-else>
    <div>{{ transform ? transform(value) : value }}</div>
  </template>
</template>

<script setup lang="ts">
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import BooleanSwitch from '@/components/booleanSwitch/index.vue'
import { Value } from 'naive-ui/es/select/src/interface'
type ShowOrEditType = 'number' | 'input' | 'select' | 'switch'
type ValueType = Value | boolean | null | undefined
type NumberValueType = number | null
type InputValueType = string | null
const props = defineProps<{
  value: ValueType,
  type: ShowOrEditType,
  editable?: boolean,
  ifSubmit?: boolean,
  transform?: (value: ValueType) => string
}>()
const emit = defineEmits<{
  'submit': [value: ValueType]
}>()
const numberValue = computed(() => realValue.value as NumberValueType)
const inputValue = computed(() => realValue.value as InputValueType)
const selectValue = computed(() => realValue.value as Value | null)
const booleanValue = computed(() => realValue.value as boolean)
const realValue = ref<ValueType>()
watch(() => props.ifSubmit, newValue => {
  if (newValue) {
    emit('submit', realValue.value)
  }
})
watch(() => props.editable, newValue => {
  if (newValue) {
    realValue.value = props.value
  }
})
const handleUpdateValue = (value: ValueType) => {
  realValue.value = value
}
const handleUpdateSelectValue = (value: Value | null | undefined) => {
  realValue.value = value as Value | null
}
</script>

<style scoped>

</style>