import { ID } from "@/types"
import { IResponse } from "@/utils/request"
import { FormItemRule } from "naive-ui"
import { useForm } from '@/hooks/useForm'
import { omit, isNil } from 'lodash-es'
import useLoading from "@/hooks/useLoading"
type R = Record<string, unknown>
type Save<T> = (p: T) => Promise<IResponse<any>>

type FormModalConfig<U extends { id: ID }, F extends R, S extends { id?: ID }> = {
  //新增接口
  addApi: Save<S>
  //更新接口
  updateApi: Save<S>
  //查询接口
  queryApi: (id: ID) => Promise<IResponse<U>>,
  //创建表单默认值工厂
  createDefault: () => F
  //表单验证规则
  rules?: {
    [P in keyof F]?: FormItemRule
  },
  // 回显对象转换为表单对象
  convertForForm?: (u: U) => F
}
export function useFormModal<U extends { id: ID }, F extends R, S extends { id?: ID }>(id: Ref<ID | null | undefined>, visible: Ref<boolean>, config: FormModalConfig<U, F, S>) {
  watch(() => visible.value, newValue => {
    //监控窗口打开状态
    if (newValue) {
      // 非创建模式时进行查询回显
      if (!ifCreate.value) {
        _query()
      }
    } else {
      resetForm()
    }
  })
  const {
    addApi,
    updateApi,
    queryApi,
    createDefault,
    rules,
    convertForForm = (u: U) => {
      return omit(u, 'id') as F
    }
  } = config
  const form = reactive(createDefault())
  const ifCreate = computed(() => isNil(id.value))
  const { formRef, validate, restoreValidation } = useForm()
  const { loading, start, stop } = useLoading()
  const { t } = useI18n()
  // 查询辉县内容
  const _query = () => {
    start()
    queryApi(id.value!).then(({ data }) => {
      Object.assign(form, convertForForm(data))
    }).finally(() => {
      stop()
    })
  }
  const save = computed(() => ifCreate.value ? addApi : updateApi)
  const title= computed(() => ifCreate.value ? t('management.modal.title.create'): t('management.modal.title.update'))
  /**
   * 重置表单
   * @param custom 保留字段
   */
  const resetForm = (custom?: Partial<F>) => {
    if (formRef.value) {
      restoreValidation()
      if (custom) {
        Object.assign(form, createDefault(), custom)
      } else {
        Object.assign(form, createDefault())
      }
    }
  }
  return {
    rules,
    formRef,
    validate,
    save,
    form,
    title,
    loading,
    ifCreate,
    startLoading: start,
    stopLoading: stop,
    resetForm
  }
}