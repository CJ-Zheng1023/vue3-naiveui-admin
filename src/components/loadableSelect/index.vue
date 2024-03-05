<template>
  <n-select
    v-bind="$attrs"
    filterable
    clearable
    v-model:value="value"
    :valueField="valueField"
    :labelField="labelField"
    :options="options"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { Value } from 'naive-ui/es/select/src/interface';
import { useLoadData, LoadableSelectTypeEnum, Options } from './useLoadData'
const props = withDefaults(defineProps<{
  type: LoadableSelectTypeEnum,
  valueField?: string,
  labelField?: string,
  op?: Options,
  params?: (string | number | null)[]
}>(), {
  valueField: 'id',
  labelField: 'name',
  op: () => [],
  params: () => []
})
const value = defineModel<Value | null | undefined>('value')
const { options, loading } = useLoadData(props.type, props.op, toRef(props, 'params'))
</script>

<style scoped>

</style>