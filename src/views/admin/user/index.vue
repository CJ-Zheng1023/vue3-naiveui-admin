<template>
  <div class="container full">
    <n-spin :show="loading" style="height: 100%;">
      <div class="management">
        <div class="search">
          <Search :condition="condition" @search="loadData(1)" @reset="handleReset" />
        </div>
        <div class="table">
          <card :header-bordered="true" :full="true">
            <template #caption>
              <Caption :name="t('management.result.title')" icon="Result" />
            </template>
            <template #actions>
              <n-space>
                <Button type="info" icon="Add" :name="t('management.result.actions.create')" @click="openFormModal()" />
                <Button type="error" :disabled="!checkedRowKeys.length" icon="Delete" :name="t('management.result.actions.delete.text')" @click="batchRemove" />
                <column-setting v-model:configs="columnConfigs" />
              </n-space>
            </template>
            <template #default>
              <n-data-table
                :columns="filteredColumns"
                :data="data"
                :row-key="rowKey"
                :remote="true"
                style="height: 100%;"
                flex-height
                :pagination="pagination"
                v-model:checked-row-keys="checkedRowKeys"
                :scroll-x="700"
              />
            </template>
          </card>
        </div>
      </div>
    </n-spin>
    <form-modal :isAdmin @refresh="loadData(1)" v-model:visible="formModalVisible" :id="currentId" />
  </div>
</template>

<script setup lang="tsx">
import Card from '@/components/card/index.vue'
import Button from '@/components/button/index.vue'
import Caption from '@/components/caption/index.vue'
import BooleanTag from '@/components/booleanTag/index.vue'
import ColumnSetting from '@/components/columnSetting/index.vue'
import FormModal from './formModal.vue'
import Search from './search.vue'
import { useTable } from '@/hooks/useTable'
import type { UserForList } from '@/api/user'
import { queryForList, remove } from '@/api/user'
import { ID } from '@/types'
import { NPopconfirm, NSpace, NTag } from 'naive-ui'
const checkedRowKeys = ref<ID[]>([])
const formModalVisible =ref(false)
const currentId = ref<ID>()
const isAdmin = ref(false)
const { t } = useI18n()
const {
  loading,
  loadData,
  data,
  pagination,
  condition,
  columnConfigs,
  filteredColumns,
  rowKey,
  resetCondition
} = useTable<UserForList, typeof queryForList>({
  api: queryForList,
  params: {
    name: '',
    username: '',
    status: null
  },
  beforeLoadData: () => {
    checkedRowKeys.value = []
  },
  columns: () => [
    {
      type: 'selection',
      width: 10,
    },
    {
      title: '用户名',
      key: 'username',
      width: 30
    },
    {
      title: '真实姓名',
      key: 'name',
      width: 40
    },
    {
      title: '组',
      key: 'groupName',
      width: 20,
      render: rowData => (
        <NTag bordered={false} size='small' type='warning'>{rowData.groupName}</NTag>
      )
    },
    {
      title: '电话',
      key: 'telephone',
      width: 23
    },
    {
      title: '邮箱',
      key: 'email',
      width: 23
    },
    {
      title: '状态',
      key: 'status',
      width: 15,
      render: rowData => (
        <BooleanTag flag={rowData.status} />
      )
    },
    {
      title: '操作',
      key: 'operate',
      width: 20,
      render: rowData => (
        <NSpace>
          <Button
            name={t('management.result.table.actions.update')}
            ghost={true}
            type="info"
            onClick={
              () => openFormModal(rowData.id, rowData.ifOrgAdmin)
            }
          />
          <NPopconfirm onPositiveClick={ () => handleRemove([rowData.id]) }>
            {{
              default: () => t('management.result.table.actions.delete.tip'),
              trigger: () => <Button disabled={rowData.ifOrgAdmin} name={t('management.result.table.actions.delete.text')} ghost={true} type="error" />
            }}
          </NPopconfirm>
        </NSpace>
      )
    }
  ]
})
const handleReset = () => {
  resetCondition()
  loadData(1)
}
const handleRemove = (ids: ID[]) => {
  remove(ids).then(res => {
    window.$message.success(res.msg)
    loadData(1)
  })
}
const batchRemove = () => {
  window.$dialog.warning({
    title: t('management.result.actions.delete.tip.title'),
    content: t('management.result.actions.delete.tip.content'),
    positiveText: t('management.result.actions.delete.tip.positive'),
    negativeText: t('management.result.actions.delete.tip.negative'),
    onPositiveClick: () => {
      if (data.value.filter(item => checkedRowKeys.value.includes(item.id)).some(item => item.ifOrgAdmin)) {
        window.$message.warning('组织机构管理员不可删除')
        return
      }
      handleRemove(checkedRowKeys.value)
    }
  })
}
const openFormModal = (id?: ID, flag: boolean = false) => {
  isAdmin.value = flag
  currentId.value = id
  formModalVisible.value = true
}
</script>

<style scoped>

</style>