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
          <n-input v-model:value="form.name" placeholder="名称" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="form.description" placeholder="描述" maxlength="50" show-count clearable type="textarea" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { add, update, queryForUpdate, TagForUpdate, TagForForm, TagForSubmit } from '@/api/tag'
import { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import { pick } from 'lodash-es'
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
} = useFormModal<TagForUpdate, TagForForm, TagForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    name: '',
    description: ''
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
    const data: TagForSubmit = pick(form, ['name', 'description'])
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