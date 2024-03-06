<template>
  <modal
    v-model:visible="visible"
    :showOk="false"
    title="字段配置"
    :spinning="loading"
    width="1250px"
  >
    <template #default>
      <div class="field-config-header">
        <div class="actions">
          <n-space>
            <Button type="info" icon="Add" :name="t('management.result.actions.create')" @click="addRow" />
            <import-button @refresh="loadData" v-if="importable" :id="id" type="warning" icon="DocumentImport" name="从模板导入" />
          </n-space>
        </div>
      </div>
      <div class="field-config-body">
        <n-data-table
          :virtual-scroll="true"
          :single-line="false"
          size="small"
          class="origin"
          :columns="columns"
          :data="data"
          :row-key="(rowData: FieldForList) => rowData.id"
          :max-height="400"
        />
      </div>
    </template>
  </modal>
</template>

<script setup lang="tsx">
import useLoading from '@/hooks/useLoading'
import Button from '@/components/button/index.vue'
import ImportButton from './importButton.vue'
import ShowOrEdit from '@/components/showOrEdit/index.vue'
import { inputTypeOptions, searchTypeOptions } from './constant'
import { ID } from '@/types'
import { FieldForList, fieldForSubmit, queryForList, add, update, remove } from '@/api/field'
import { DataTableColumns, NPopconfirm, NSpace } from 'naive-ui'
import { InputTypeEnum, SearchTypeEnum } from './enum'

const props = defineProps<{
  id: ID,
  importable?: boolean
}>()
const visible = defineModel<boolean>('visible', { required: true })
const data = ref<FieldForList[]>([])
const { loading, start: startLoading, stop: stopLoading } = useLoading()
const { t } = useI18n()
watch(() => visible.value, newValue => {
  if (newValue) {
    loadData()
  } else {
    data.value = []
  }
})
const columns: DataTableColumns<FieldForList> = [
  {
    title: '字段名称',
    key: 'tag',
    width: 34,
    render: rowData => (
      <ShowOrEdit
        value={rowData.tag}
        type='input'
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        maxlength={20}
        showCount={true}
        clearable={true}
        onSubmit={
          value => rowData.tag = value
        }
      />
    )
  },
  {
    title: '字段值',
    key: 'name',
    width: 34,
    render: rowData => (
      <ShowOrEdit
        value={rowData.name}
        type='input'
        min={0}
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        maxlength={20}
        showCount={true}
        clearable={true}
        onUpdateValue={
          value => rowData.name = value
        }
      />
    )
  },
  {
    title: '单位',
    key: 'unit',
    width: 31,
    render: rowData => (
      <ShowOrEdit
        value={rowData.unit}
        type='input'
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        maxlength={20}
        showCount={true}
        clearable={true}
        onUpdateValue={
          value => rowData.unit = value
        }
      />
    )
  },
  {
    title: '输入类型',
    key: 'inputType',
    width: 27,
    render: rowData => (
      <ShowOrEdit
        value={rowData.inputType}
        type='select'
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        op={inputTypeOptions}
        onUpdateValue={
          value => rowData.inputType = value
        }
        transform={
          (value: InputTypeEnum | null) => {
            const item = inputTypeOptions.find(item => item.id === value)
            return item?.name
          }
        }
      />
    )
  },
  {
    title: '检索类型',
    key: 'searchType',
    width: 37,
    render: rowData => (
      <ShowOrEdit
        value={rowData.searchType}
        type='select'
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        op={searchTypeOptions}
        onUpdateValue={
          value => rowData.searchType = value
        }
        transform={
          (value: SearchTypeEnum | null) => {
            const item = searchTypeOptions.find(item => item.id === value)
            return item?.name
          }
        }
      />
    )
  },
  {
    title: '排序编号',
    key: 'orderNum',
    width: 28,
    render: rowData => (
      <ShowOrEdit
        value={rowData.orderNum}
        type='number'
        min={0}
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        onUpdateValue={
          value => rowData.orderNum = value
        }
      />
    )
  },
  {
    title: '是否可分析',
    key: 'ifAnalysis',
    width: 23,
    render: rowData => (
      <ShowOrEdit
        value={rowData.ifAnalysis}
        type='switch'
        negativeText='不可分析'
        positiveText='可分析'
        editable={rowData.editable}
        ifSubmit={rowData.ifSubmit}
        onUpdateValue={
          value => rowData.ifAnalysis = value
        }
        transform={
          (value: boolean) => {
            return value ? '可分析' : '不可分析'
          }
        }
      />
    )
  },
  {
    title: '操作',
    key: 'operate',
    width: 30,
    render: (rowData, index) => {
      return rowData.editable
        ? <NSpace>
            <Button
              name='确定'
              ghost={true}
              type="success"
              onClick={
                () => save(rowData)
              }
            />
            <Button
              name='取消'
              ghost={true}
              onClick={
                () => {
                  if (rowData.id > 0) {
                    rowData.editable = false
                  } else {
                    data.value.splice(index, 1)
                  }
                }
              }
            />
          </NSpace>
        : <NSpace>
            <Button
              name={t('management.result.table.actions.update')}
              ghost={true}
              type="info"
              onClick={
                () => rowData.editable = true
              }
            />
            <NPopconfirm onPositiveClick={ () => handleRemove([rowData.id!]) }>
              {{
                default: () => t('management.result.table.actions.delete.tip'),
                trigger: () => <Button name={t('management.result.table.actions.delete.text')} ghost={true} type="error" />
              }}
            </NPopconfirm>
          </NSpace>
    }
  }
]
const addRow = () => {
  data.value.push({
    // 用负数表示为新增的数据
    id: -+new Date(),
    tag: '',
    name: '',
    unit: '',
    inputType: null,
    searchType: null,
    orderNum: 0,
    ifAnalysis: false,
    editable: true,
    checkItemId: props.id
  })
}
const handleRemove = (ids: ID[]) => {
  remove(ids).then(res => {
    window.$message.success(res.msg)
    data.value = data.value.filter(item => item.id < 0 || !ids.includes(item.id))
  })
}
const loadData = () => {
  startLoading()
  queryForList(props.id).then(res => {
    data.value = res.data
  }).finally(() => {
    stopLoading()
  })
}
const save = async (rowData: FieldForList) => {
  rowData.ifSubmit = true
  // 等待数据渲染完毕
  await nextTick()
  const submitData: fieldForSubmit = {
    tag: rowData.tag,
    name: rowData.name,
    unit: rowData.unit,
    inputType: rowData.inputType,
    searchType: rowData.searchType,
    orderNum: rowData.orderNum,
    ifAnalysis: rowData.ifAnalysis,
    checkItemId: rowData.checkItemId
  }
  if (rowData.id > 0) {
    submitData.id = rowData.id
    const res = await update(submitData)
    window.$message.success(res.msg)
  } else {
    const res = await add(submitData)
    rowData.id = res.data
    window.$message.success(res.msg)
  }
  rowData.ifSubmit = false
  rowData.editable = false
}
</script>

<style scoped lang="less">
.field-config-header{
  display: flex;
  justify-content: flex-end;
}
.field-config-body {
  margin-top: 12px;
}
</style>