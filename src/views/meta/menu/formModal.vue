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
        label-width="120"
        require-mark-placement="right-hanging"
        label-align="right"
      >
        <n-form-item label="菜单类型" path="type">
          <n-radio-group @update:value="handleUpdateMenuType" :disabled="!ifCreate" v-model:value="form.type">
            <n-space>
              <template v-for="(label, value) in menuTypeMap" :key="value">
                <n-radio
                  :disabled="(willOperateButton && Number(value) !== MenuTypeEnum.BUTTON)
                    || (!willOperateButton && Number(value) === MenuTypeEnum.BUTTON)"
                  :value="Number(value)"
                >
                  {{ label }}
                </n-radio>
              </template>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="名称" path="name">
          <n-input v-model:value="form.name" />
        </n-form-item>
        <n-form-item :label="willOperateButton ? '上级菜单' : '上级目录'" path="parentId">
          <tree-select
            :disabled="!ifCreate"
            v-model:value="form.parentId"
            :scope="willOperateButton ? MenuTypeEnum.MENU : MenuTypeEnum.DIRECTORY"
            keyField="id"
            labelField="name"
            childrenField="menuList"
          />
        </n-form-item>
        <n-form-item label="路由地址" path="router" v-if="form.type !== MenuTypeEnum.BUTTON">
          <n-input v-model:value="form.router" />
        </n-form-item>
        <n-form-item label="地址类型" path="routerType" v-if="form.type === MenuTypeEnum.MENU">
          <n-radio-group @update:value="handleUpdateRouterType" v-model:value="form.routerType">
            <n-space>
              <n-radio v-for="(label, value) in routerTypeMap" :key="value" :value="Number(value)">{{ label }}</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="前端组件" path="component" v-if="form.routerType !== RouterTypeEnum.EXTERNAL">
          <n-input v-model:value="form.component" />
        </n-form-item>
        <n-form-item label="图标" path="icon" v-if="form.type !== MenuTypeEnum.BUTTON">
          <icon-picker v-model:value="form.icon" />
        </n-form-item>
        <n-form-item label="序号" path="orderNum">
          <n-input-number :min="0" v-model:value="form.orderNum" clearable style="width: 100%;" />
        </n-form-item>
        <n-form-item label="隐藏菜单" path="ifHide" v-if="form.type === MenuTypeEnum.MENU">
          <n-radio-group v-model:value="form.ifHide">
            <n-space>
              <n-radio :value="true">是</n-radio>
              <n-radio :value="false">否</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="授权标识" path="authorizationId"  v-if="form.type === MenuTypeEnum.BUTTON">
          <n-input v-model:value="form.authorizationId" />
        </n-form-item>
      </n-form>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
import TreeSelect from './treeSelect.vue'
import { add, update, queryForUpdate, MenuForUpdate, MenuForForm, MenuForSubmit } from '@/api/menu'
import { menuTypeMap, defaultMenuType, routerTypeMap } from './constant'
import { MenuTypeEnum, RouterTypeEnum } from '@/enum/index'
import IconPicker from '@/components/iconPicker/index.vue'
import { useFormModal } from '@/hooks/useFormModal'
import { ID } from '@/types'
const props = withDefaults(defineProps<{
  id?: ID,
  parentId: ID | null,
  willOperateButton?: boolean
}>(), {
  parentId: null,
  willOperateButton: false
})
const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const visible = defineModel<boolean>('visible', { default: false })
watchEffect(() => {
  if (visible.value) {
    if (props.willOperateButton) {
      form.type = MenuTypeEnum.BUTTON
    } else {
      form.type = MenuTypeEnum.DIRECTORY
    }
    form.parentId = props.parentId
  }
})
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
  ifCreate,
  resetForm
} = useFormModal<MenuForUpdate, MenuForForm, MenuForSubmit>(toRef(props, 'id'), visible, {
  addApi: add,
  updateApi: update,
  queryApi: queryForUpdate,
  convertForForm: u => ({
    name: u.name,
    router: u.router,
    ifHide: u.ifHide,
    orderNum: u.orderNum,
    component: u.component,
    type: u.type,
    parentId: u.parentId || null,
    icon: u.icon,
    authorizationId: u.authorizationId,
    routerType: u.routerType
  }),
  createDefault: () => ({
    name: '',
    router: '',
    ifHide: false,
    orderNum: 0,
    component: '',
    type: defaultMenuType,
    parentId: null,
    icon: '',
    authorizationId: '',
    routerType: null
  }),
  rules: {
    name: {
      required: true,
      message: '请输入名称',
    },
    router: {
      required: true,
      message: '请输入路由地址'
    },
    routerType: {
      required: true,
      message: '请选择地址类型'
    },
    component: {
      required: true,
      message: '请输入前端组件'
    },
    ifHide: {
      required: true,
      message: '请选择是否隐藏菜单'
    },
    authorizationId: {
      required: true,
      message: '请输入授权标识'
    }
  }
})
const handleOk = () => {
  validate()?.then(() => {
    startLoading()
    const data: MenuForSubmit = {
      name: form.name,
      router: form.router,
      ifHide: form.ifHide,
      orderNum: form.orderNum,
      component: form.component,
      type: form.type,
      parentId: form.parentId || 0,
      icon: form.icon,
      authorizationId: form.authorizationId,
      routerType: form.routerType
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

const handleUpdateMenuType = (type: MenuTypeEnum) => {
  resetForm({ type })
}
const handleUpdateRouterType = () => {
  form.component = ''
}
</script>

<style scoped>

</style>