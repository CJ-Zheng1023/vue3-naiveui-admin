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
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="form.username" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="form.password" type="password" show-password-on="mousedown" maxlength="20" clearable />
        </n-form-item>
        <n-form-item label="真实姓名" path="name">
          <n-input v-model:value="form.name" maxlength="20" show-count clearable />
        </n-form-item>
        <n-form-item label="组" path="groupId">
          <loadable-select v-model:value="form.groupId" :type="LoadableSelectTypeEnum.GROUP" />
        </n-form-item>
        <n-form-item label="角色" path="roleIds" v-if="!isAdmin">
          <loadable-select v-model:value="form.roleIds" :type="LoadableSelectTypeEnum.ROLE" :multiple="true" />
        </n-form-item>
        <n-form-item label="电话" path="telephone">
          <n-input v-model:value="form.telephone" />
        </n-form-item>
        <n-form-item label="电子邮箱" path="email">
          <n-input v-model:value="form.email" />
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
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { add, update, queryForUpdate, UserForUpdate, UserForForm, UserForSubmit } from '@/api/user'
import { ID } from '@/types'
import { useFormModal } from '@/hooks/useFormModal'
import { FormItemRule } from 'naive-ui'
const props = defineProps<{
  id?: ID,
  isAdmin: boolean
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
} = useFormModal<UserForUpdate, UserForForm, UserForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  createDefault: () => ({
    username: '',
    name: '',
    telephone: '',
    email: '',
    status: true,
    groupId: null,
    roleIds: null,
    password: ''
  }),
  rules: {
    username: {
      required: true,
      message: '请输入用户名'
    },
    password: {
      required: true,
      message: '请输入密码'
    },
    name: {
      required: true,
      message: '请输入真实姓名'
    },
    groupId: {
      type: 'number',
      required: true,
      message: '请选择组'
    },
    roleIds: {
      type: 'array',
      required: true,
      message: '请选择组'
    },
    telephone: {
      validator: (_: FormItemRule, value: any) => {
        if (!value) {
          return true
        }
        if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value)) {
          return new Error('请输入有效号码')
        }
      },
      trigger: 'blur'
    },
    email: {
      validator: (_: FormItemRule, value: any) => {
        if (!value) {
          return true
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
          return new Error('请输入有效邮箱')
        }
      },
      trigger: 'blur'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: UserForSubmit = {
      username: form.username,
      name: form.name,
      telephone: form.telephone,
      email: form.email,
      status: form.status,
      groupId: form.groupId!,
      roleIds: form.roleIds,
      password: form.password
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