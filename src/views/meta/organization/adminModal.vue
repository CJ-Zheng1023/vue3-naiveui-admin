<template>
  <modal
    v-model:visible="visible"
    @ok="handleOk"
    title="编辑组织机构管理员"
    :spinning="loading"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-placement="left"
        label-width="80px"
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
          <loadable-select v-model:value="form.groupId" :params="[orgId]" :type="LoadableSelectTypeEnum.GROUP" />
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
import useLoading from '@/hooks/useLoading'
import { OrgAdminForForm, queryAdmin, saveAdmin, OrgAdminForSubmit } from '@/api/organization'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { FormItemRule } from 'naive-ui'
import { ID } from '@/types'
import { useForm } from '@/hooks/useForm'
const props = defineProps<{
  orgId: ID
}>()
const visible = defineModel<boolean>('visible', { default: false })
const id = ref<ID>()
watch(() => visible.value, newValue => {
  if (newValue) {
    _loadData()
  } else {
    restoreValidation()
    Object.assign(form, defaultForm)
  }
})
const { loading, start, stop } = useLoading()
const { formRef, validate, restoreValidation } = useForm()
const defaultForm: OrgAdminForForm = {
  username: '',
  password: '',
  name: '',
  telephone: '',
  email: '',
  status: true,
  groupId: null
}
const form = reactive({ ...defaultForm })
const rules: Record<string, FormItemRule> = {
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
const _loadData = () => {
  start()
  queryAdmin(props.orgId).then(({ data }) => {
    if (data) {
      form.email = data.email
      form.username = data.username
      form.password = data.password
      form.name = data.name
      form.telephone = data.telephone
      form.status = data.status
      form.groupId = data.groupId
      id.value = data.id
    } else {
      id.value = undefined
    }
  }).finally(() => {
    stop()
  })
}
const handleOk = () => {
  validate()?.then(() => {
    start()
    const data: OrgAdminForSubmit = {
      orgId: props.orgId,
      username: form.username,
      password: form.password,
      name: form.name,
      telephone: form.telephone,
      email: form.email,
      status: form.status,
      groupId: form.groupId!
    }
    if (id.value) {
      data.id = id.value
    }
    return saveAdmin(data)
  }).then(res => {
    window.$message.success(res.msg)
    visible.value = false
  }).finally(() => {
    stop()
  })
}
</script>

<style scoped>

</style>