<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    :spinning="loading"
    width="500px"
    height="400px"
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
        <n-form-item label="账号数量" path="accountCt">
          <n-input-number :min="0" v-model:value="form.accountCt" clearable style="width: 100%;" />
        </n-form-item>
        <n-form-item label="绑定菜单" path="menuIds">
          <menu-tree v-model:checked-keys="form.menuIds"  />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import MenuTree from '@/components/menuTree/index.vue'
import { add, update, queryForUpdate, MemberForUpdate, MemberForForm, MemberForSubmit } from '@/api/member'
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
} = useFormModal<MemberForUpdate, MemberForForm, MemberForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    name: '',
    menuIds: [],
    accountCt: 0
  }),
  rules: {
    name: {
      required: true,
      message: '请输入名称'
    },
    accountCt: {
      required: true,
      message: '请输入账号数量'
    },
    menuIds: {
      type: 'array',
      required: true,
      message: '请绑定菜单',
      trigger: 'change'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: MemberForSubmit = pick(form, ['name', 'accountCt', 'menuIds'])
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