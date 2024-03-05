<template>
  <modal
    :visible="visible"
    @close="handleClose"
    @ok="handleOk"
    title="修改密码"
    :spinning="spinning"
    width="400px"
  >
    <template #default>
      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        label-align="right"
      >
        <n-form-item label="新密码" path="password">
          <n-input v-model:value="formModel.password" placeholder="请输入新密码" type="password" show-password-on="mousedown" maxlength="20" clearable />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input v-model:value="formModel.confirmPassword" placeholder="请再次输入新密码" type="password" show-password-on="mousedown" maxlength="20" clearable />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import { FormInst, FormItemRule } from 'naive-ui'
import { changePassword } from '@/api/user'
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible'])
const formRef = ref<FormInst | null>(null)
const spinning = ref(false)

const defaultFormModel: { password: string, confirmPassword: string } = {
  password: '',
  confirmPassword: ''
}
const formModel = reactive({
  ...defaultFormModel
})
const rules = {
  password: {
    required: true,
    message: '请输入新密码',
    trigger: 'blur'
  },
  confirmPassword: [
    {
      required: true,
      message: '请再次输入新密码',
      trigger: 'blur'
    },
    {
      validator: (_: FormItemRule, value: string) => {
        if (value && value !== formModel.password) {
          return new Error('两次输入密码不一致')
        }
        return true
      },
      trigger: 'blur'
    }
  ]
}
/**
* 表单验证重置、表单字段值重置
*/
const _resetForm = () => {
  formRef.value?.restoreValidation()
  Object.assign(formModel, defaultFormModel)
}
// 执行保存操作
const _saveFormData = () => {
  spinning.value = true
  changePassword(formModel.password).then(res => {
    const { msg } = res
    window.$message.success(msg)
    _closeModal()
  }).finally(() => {
    spinning.value = false
  })
}
const _closeModal = () => {
  emit('update:visible', false)
  _resetForm()
}
const handleClose = () => {
  _closeModal()
}
const handleOk = () => {
  formRef.value?.validate((valid) => {
    if(!valid) {
      _saveFormData()
    }
  })
}
</script>

<style scoped>

</style>