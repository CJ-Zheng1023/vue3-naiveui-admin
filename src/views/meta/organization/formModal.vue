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
        <n-form-item label="会员等级" path="memberLevelId">
          <loadable-select :type="LoadableSelectTypeEnum.MEMBER" v-model:value="form.memberLevelId" />
        </n-form-item>
        <n-form-item label="到期时间" path="expirationTime">
          <n-date-picker v-model:value="form.expirationTime" type="datetime" clearable style="width: 100%;" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="form.description" maxlength="50" show-count clearable type="textarea" />
        </n-form-item>
        <n-form-item label="联系人" path="contacts">
          <n-input v-model:value="form.contacts" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="联系电话" path="telephone">
          <n-input v-model:value="form.telephone" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="状态" path="status">
          <boolean-switch v-model:value="form.status" positiveText="启用" negativeText="停用" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import BooleanSwitch from '@/components/booleanSwitch/index.vue'
import { add, update, queryForUpdate, OrganizationForUpdate, OrganizationForForm, OrganizationForSubmit } from '@/api/organization'
import { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
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
} = useFormModal<OrganizationForUpdate, OrganizationForForm, OrganizationForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    name: '',
    description: '',
    memberLevelId: null,
    expirationTime: null,
    contacts: '',
    telephone: '',
    status: true
  }),
  rules: {
    name: {
      required: true,
      message: '请输入标签名称'
    },
    memberLevelId: {
      type: 'number',
      required: true,
      message: '请选择会员等级'
    },
    expirationTime: {
      required: true,
      message: '请选择过期时间'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: OrganizationForSubmit = {
      name: form.name,
      description: form.description,
      memberLevelId: form.memberLevelId!,
      expirationTime: form.expirationTime!,
      contacts: form.contacts,
      telephone: form.telephone,
      status: form.status
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
</script>

<style scoped lang="less">

</style>