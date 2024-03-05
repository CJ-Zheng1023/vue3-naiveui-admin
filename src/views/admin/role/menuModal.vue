<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    title="绑定菜单"
    :spinning="loading"
    height="400px"
  >
    <template #default>
      <menu-tree v-model:checked-keys="checkedKeys"  />
    </template>
  </modal>
</template>

<script setup lang="ts">
import MenuTree from '@/components/menuTree/index.vue'
import { queryMenus, bindMenus } from '@/api/role'
import { ID } from '@/types'
import useLoading from '@/hooks/useLoading'
const props = defineProps<{
  roleId: ID
}>()
const visible = defineModel<boolean>('visible', { default: false })
const { loading, start, stop } = useLoading()
// 选中树节点
const checkedKeys = ref<ID[]>([])
// 打开窗口触发加载数据
watch(() => visible.value,  newValue => {
  if(newValue) {
    _showMappedMenu()
  } else {
    checkedKeys.value = []
  }
})
// 获取角色已绑定菜单id
const _showMappedMenu = () => {
  return queryMenus(props.roleId).then(res => {
    checkedKeys.value = res.data
  })
}
// 绑定操作
const handleOk = () => {
  start()
  bindMenus(props.roleId, checkedKeys.value).then(res => {
    window.$message.success(res.msg)
  }).finally(() => {
    stop()
  })
}
</script>

<style scoped lang="less">
</style>