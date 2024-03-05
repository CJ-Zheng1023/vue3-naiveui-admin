import { FormInst } from "naive-ui"

export function useForm () {
  const formRef = ref<FormInst | null>(null)
  const validate = () => {
    return formRef.value?.validate()
  }
  const restoreValidation = () => {
    formRef.value?.restoreValidation()
  }
  return {
    formRef,
    validate,
    restoreValidation
  }
}