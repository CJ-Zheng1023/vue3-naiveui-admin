<template>
  <div class="container full">
    <n-spin :show="loading" style="height: 100%;">
      <div class="management">
        <div class="table">
          <card :header-bordered="true" :full="true">
            <template #caption>
              <Caption :name="t('management.result.title')" icon="Result" />
            </template>
            <template #actions>
              <n-space>
                <Button type="info" icon="Add" :name="t('management.result.actions.create')" @click="openFormModal(false)" />
                <Button type="error" :disabled="!checkedRowKeys.length" icon="Delete" :name="t('management.result.actions.delete.text')" @click="batchRemove" />
                <column-setting v-model:configs="columnConfigs" />
              </n-space>
            </template>
            <template #default>
              <n-data-table
                children-key="menuList"
                :columns="filteredColumns"
                :data="data"
                :row-key="rowKey"
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
    <form-modal :willOperateButton="willOperateButton" :parentId="currentParentId" @refresh="loadData(1)" v-model:visible="formModalVisible" :id="currentId" />
  </div>
</template>

<script setup lang="tsx">
import Card from '@/components/card/index.vue'
import Button from '@/components/button/index.vue'
import Caption from '@/components/caption/index.vue'
import { useTable } from '@/hooks/useTable'
import { queryForList, remove, MenuForList } from '@/api/menu'
import ColumnSetting from '@/components/columnSetting/index.vue'
import FormModal from './formModal.vue'
import { MenuTypeEnum } from '@/enum'
import { menuTypeMap } from './constant'
import { naiveUITypes } from '@/types'
import { ID } from '@/types'
import { NPopconfirm, NSpace, NTag } from 'naive-ui'
const checkedRowKeys = ref<ID[]>([])
const formModalVisible =ref(false)
const currentId = ref<number>()
const currentParentId = ref<number | null>(null)
const willOperateButton = ref(false)
const { t } = useI18n()
const {
  loading,
  loadData,
  data,
  pagination,
  columnConfigs,
  filteredColumns,
  rowKey
} = useTable<MenuForList, typeof queryForList>({
  api: queryForList,
  beforeLoadData: () => {
    checkedRowKeys.value = []
  },
  columns: () => [
    {
      type: 'selection',
      width: 10,
    },
    {
      title: '菜单名称',
      key: 'name',
      width: 15
    },
    {
      title: '地址',
      key: 'router',
      width: 22
    },
    {
      title: '前端组件/授权标识',
      width: 23,
      key: 'id',
      render: rowData => (
        rowData.type === MenuTypeEnum.BUTTON ? <span>{rowData.authorizationId}</span> : <span>{rowData.component}</span>
      )
    },
    {
      title: '类型',
      key: 'type',
      width: 10,
      render: rowData => {
        let tagType: naiveUITypes
        const menuType = rowData.type
        if (menuType === MenuTypeEnum.DIRECTORY) {
          tagType = 'success'
        } else if (menuType === MenuTypeEnum.MENU) {
          tagType = 'warning'
        } else {
          tagType = 'error'
        }
        return <NTag bordered={true} type={tagType} size="small">{ menuTypeMap[menuType] }</NTag>
      }
    },
    {
      title: '操作',
      key: 'operate',
      width: 20,
      render: rowData => (
        <NSpace>
          {
            rowData.type === MenuTypeEnum.DIRECTORY
              ? <Button
                  name='添加子菜单'
                  ghost={true}
                  type="success"
                  onClick={
                    () => openFormModal(false, undefined, rowData.id)
                  }
                />
              : rowData.type === MenuTypeEnum.MENU
              ? <Button
                  name='添加按钮'
                  ghost={true}
                  type="success"
                  onClick={
                    () => openFormModal(true, undefined,  rowData.id)
                  }
                />
              : null
          }
          <Button
            name={t('management.result.table.actions.update')}
            ghost={true}
            type="info"
            onClick={
              () => openFormModal(rowData.type === MenuTypeEnum.BUTTON, rowData.id)
            }
          />
          <NPopconfirm onPositiveClick={ () => handleRemove([rowData.id]) }>
            {{
              default: () => t('management.result.table.actions.delete.tip'),
              trigger: () => <Button name={t('management.result.table.actions.delete.text')} ghost={true} type="error" />
            }}
          </NPopconfirm>
        </NSpace>
      )
    }
  ]
})

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
      handleRemove(checkedRowKeys.value)
    }
  })
}
const openFormModal = (flag: boolean, id?: number, parentId: number | null = null) => {
  willOperateButton.value = flag
  currentId.value = id
  currentParentId.value = parentId
  formModalVisible.value = true
}
</script>

<style scoped>

</style>