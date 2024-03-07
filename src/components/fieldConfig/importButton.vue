<template>
  <div>
    <Button type="warning" icon="DocumentImport" name="从模板导入" @click="visible = true" />
    <modal
      v-model:visible="visible"
      @ok="handleOk"
      title="选择模板"
      :spinning="loading"
      width="400px"
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
          <n-form-item label="组织机构" path="modelCheckItemId">
            <loadable-select v-model:value="form.modelCheckItemId" :type="LoadableSelectTypeEnum.CHECK_TEMPLATE" />
          </n-form-item>
        </n-form>
      </template>
    </modal>
  </div>
</template>

<script setup lang="ts">
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import useLoading from '@/hooks/useLoading'
import { importTemplate } from '@/api/field'
import { ID } from '@/types'
import { FormItemRule } from 'naive-ui'
import { useForm } from '@/hooks/useForm'
const props = defineProps<{
  id: ID
}>()
const emit = defineEmits<{
  'refresh': []
}>()
const visible = ref(false)
const form = reactive<{ modelCheckItemId: ID | null }>({
  modelCheckItemId: null
})
const { loading, start, stop } = useLoading()
const { formRef, restoreValidation, validate } = useForm()
watch(() => visible.value, newValue => {
  if (!newValue) {
    restoreValidation()
    form.modelCheckItemId = null
  }
})
const rules: Record<string, FormItemRule> = {
  modelCheckItemId: {
    type: 'number',
    required: true,
    message: '请选择模板'
  }
}
const handleOk = () => {
  validate()?.then(() => {
    start()
    return importTemplate(props.id, form.modelCheckItemId!)
  }).then(res => {
    window.$message.success(res.msg)
    emit('refresh')
    visible.value = false
  }).finally(() => {
    stop()
  })
}
</script>

<style scoped>

</style>