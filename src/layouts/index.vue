<template>
  <div class="app-layout" style="height: 100%;display: flex;">
    <app-sider />
    <div style="flex-grow: 1;height: 100%;overflow-x: hidden;">
      <div style="height: 100%;display: flex;flex-direction: column;">
        <app-header />
        <app-content />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSider from './sider/index.vue'
import AppHeader from './header/index.vue'
import AppContent from './content/index.vue'
import { useLoadingBar, useMessage, useDialog, useNotification } from 'naive-ui'
const router = useRouter()
const loadingBar = useLoadingBar()
router.beforeEach(() => {
  loadingBar?.start()
})
router.afterEach(() => {
  loadingBar?.finish()
})
window.$message = useMessage()
window.$dialog = useDialog()
window.$notification = useNotification()
</script>

<style lang="less" scoped>
</style>