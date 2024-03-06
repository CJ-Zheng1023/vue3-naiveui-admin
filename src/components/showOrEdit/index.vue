<template>
  <template v-if="editable">
    <template v-if="type === 'number'">
      <n-input-number
        v-bind="$attrs"
        :default-value="getNumberValue()"
        clearable
        style="width: 100%;"
        @update:value="handleUpdateValue"
        size="small"
      />
    </template>
    <template v-else-if="type === 'input'">
      <n-input
        v-bind="$attrs"
        :default-value="getInputValue()"
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
        :default-value="value"
        style="width: 100%;"
        @update:value="handleUpdateSelectValue"
        size="small"
      />
    </template>
    <template v-else>
      <boolean-switch
        v-bind="$attrs"
        :default-value="getBooleanValue()"
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
type ValueType = number | string | boolean| null
type NumberValueType = number | null
type InputValueType = string
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
const getNumberValue = () => props.value as NumberValueType
const getInputValue = () => props.value as InputValueType
const getBooleanValue = () => props.value as boolean
const realValue = ref<ValueType>(props.value)
const handleUpdateValue = (value: ValueType) => {
  realValue.value = value
}
watch(() => props.ifSubmit, newValue => {
  if (newValue) {
    emit('submit', realValue.value)
  }
})
const handleUpdateSelectValue = (value: Value | null | undefined) => {
  realValue.value = value as ValueType
}
</script>

<style scoped>

</style>