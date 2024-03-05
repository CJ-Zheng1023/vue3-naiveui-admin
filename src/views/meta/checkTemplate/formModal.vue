<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    :spinning="loading"
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
        <n-form-item label="匹配规则" path="rule">
          <n-input v-model:value="form.rule" clearable type="textarea" />
        </n-form-item>
        <n-form-item label="医学影像" path="ifUpload">
          <boolean-switch v-model:value="form.ifUpload" positiveText="可用" negativeText="不可用" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import BooleanSwitch from '@/components/booleanSwitch/index.vue'
import { add, update, queryForUpdate, CheckTemplateForUpdate, CheckTemplateForForm, CheckTemplateForSubmit } from '@/api/checkTemplate'
import { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
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
} = useFormModal<CheckTemplateForUpdate, CheckTemplateForForm, CheckTemplateForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    name: '',
    rule: '',
    ifUpload: false,
    fieldList: []
  }),
  rules: {
    name: {
      required: true,
      message: '请输入标签名称'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: CheckTemplateForSubmit = {
      name: form.name,
      rule: form.rule,
      ifUpload: form.ifUpload
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