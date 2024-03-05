<template>
  <modal
    :visible="visible"
    @close="handleClose"
    :showOk="false"
    title="用户须知"
    width="500px"
  >
    <template #default>
      <p>欢迎使用医学影像大数据平台，请阅读以下须知！</p>
      <p>数据安全使用须知：</p>
      <p>1.按照《中华人民共和国网络安全法》、《中华人民共和国数据安全法》等法律规范要求，以及东软医疗《数据管理平台数据安全规范》要求，平台数据只能用于东软医疗人工智能相关产品研发，不能以任何方式将数据泄漏给第三方。</p>
      <p>2.平台会详细记录用户数据的下载、使用信息，如因账户使用人操作失误或泄漏软件帐号、密码令等行为致使数据泄漏造成的经济损失，由账户所有人承担责任。</p>
    </template>
  </modal>
</template>

<script setup lang="ts">
import Modal from '@/components/modal/index.vue'
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible'])
const _closeModal = () => {
  emit('update:visible', false)
}
const handleClose = () => {
  _closeModal()
}
</script>

<style scoped>

</style>