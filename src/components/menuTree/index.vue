<template>
  <fragment>
    <div v-show="loading">
      <n-skeleton text :repeat="16" />
    </div>
    <div v-show="!loading">
      <n-tree
      block-line
      checkable
      default-expand-all
      :data="tree"
      v-model:checked-keys="checkedKeys"
      key-field="id"
      label-field="name"
      children-field="menuList"
      v-bind="$attrs"
    />
    </div>
  </fragment>
</template>

<script setup lang="ts">
import { ID } from '@/types'
import { SimpleMenuTree, queryForTree } from '@/api/menu'
import { MenuTypeEnum } from '@/enum'
import useLoading from '@/hooks/useLoading';
const checkedKeys = defineModel<ID[]>('checkedKeys', { required: true })
const tree = ref<SimpleMenuTree[]>()
const { loading, start, stop } = useLoading()
onMounted(() => {
  _loadData()
})
const _loadData = () => {
  start()
  queryForTree(MenuTypeEnum.BUTTON).then(res => {
    tree.value = res.data
  }).finally(() => {
    stop()
  })
}
</script>

<style scoped>

</style>