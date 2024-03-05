<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    :spinning="loading"
    width="600px"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        label-align="right"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="form.name" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="组织机构" path="orgId">
          <loadable-select @update:value="handleUpdateOrgId" v-model:value="form.orgId" :type="LoadableSelectTypeEnum.ORG" />
        </n-form-item>
        <n-form-item label="检查项目" path="checkItemIds" v-if="!isNil(form.orgId)">
          <loadable-select v-model:value="form.checkItemIds" :params="[form.orgId]" :type="LoadableSelectTypeEnum.CHECK" :multiple="true" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="form.description" clearable type="textarea" maxlength="50" show-count />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { add, update, queryForUpdate, GroupForUpdate, GroupForForm, GroupForSubmit } from '@/api/group'
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import { isNil } from 'lodash-es'
const props = defineProps<{
  id?: ID
}>()
const visible = defineModel<boolean>('visible', { default: false })
const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const {
  rules,
  formRef,
  validate,
  save,
  form,
  title,
  loading,
  startLoading,
  stopLoading,
  ifCreate
} = useFormModal<GroupForUpdate, GroupForForm, GroupForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    name: '',
    description: '',
    checkItemIds: null,
    orgId: null
  }),
  rules: {
    name: {
      required: true,
      message: '请输入标签名称'
    },
    orgId: {
      type: 'number',
      required: true,
      message: '请选择组织机构'
    },
    checkItemIds: {
      type: 'array',
      required: true,
      message: '请选择检查项目'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: GroupForSubmit = {
      name: form.name,
      description: form.description,
      checkItemIds: form.checkItemIds!,
      orgId: form.orgId!
    }
    if (!ifCreate.value) {
      data.id = props.id
    }
    return save.value(data)
  }).then(res => {
    window.$message.success(res.msg)
    emit('refresh')
    visible.value = false
  }).finally(() => {
    stopLoading()
  })
}
const handleUpdateOrgId = () => {
  form.checkItemIds = null
}
</script>

<style scoped lang="less">

</style>