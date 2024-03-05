<template>
  <n-modal
    class="custom-modal"
    :style="{ width }"
    v-model:show="visible"
    preset="card"
    :title="title"
    :mask-closable="false"
    :bordered="false"
    :segmented="{
        content: 'soft'
      } "
    size="small"
  >
    <template #default>
      <n-spin :show="spinning">
        <div :style="{ height, margin: '0 -40px' }">
          <n-scrollbar style="height: 100%;">
            <div :style="bodyStyle">
              <slot></slot>
            </div>
          </n-scrollbar>
        </div>
        <n-space justify="end" style="padding: 16px 0;" v-if="showFooter">
          <n-button @click="handleCancel" size="small">{{ cancelText }}</n-button>
          <n-button v-if="showOk" @click="handleOk" type="primary" size="small">{{ okText }}</n-button>
        </n-space>
      </n-spin>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: [String, Number],
    default: '650px'
  },
  //  内容区域高度
  height: {
    type: String,
    default: 'auto'
  },
  title: {
    type: String,
    default: ''
  },
  spinning: {
    type: Boolean,
    default: false
  },
  okText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '关闭'
  },
  showOk: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  bodyStyle: {
    type: Object,
    default: () => ({ padding: '0 40px' })
  }
})
const visible = defineModel<boolean>('visible', { default: false })
const emit = defineEmits(['ok'])
const handleCancel = () => {
  visible.value = false
}
const handleOk = () => {
  emit('ok')
}
</script>

<style scoped>

</style>