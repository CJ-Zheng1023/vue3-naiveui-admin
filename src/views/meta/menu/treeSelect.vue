<template>
  <n-tree-select
    :options="options"
    v-model:value="value"
    filterable
    clearable
    default-expand-all
    v-bind="$attrs"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { SimpleMenuTree, queryForTree } from '@/api/menu'
import { MenuTypeEnum } from '@/enum'
const props = defineProps<{
  scope: MenuTypeEnum
}>()
const value = defineModel<number | null>('value', { required: true })
const options = ref<SimpleMenuTree[]>([])
const loading = ref(false)
onMounted(() => {
  _loadData()
})
const _loadData = () => {
  loading.value = true
  queryForTree(props.scope).then(res => {
    options.value = res.data
  }).finally(() => {
    loading.value = false
  })
}
</script>

<style scoped>

</style>