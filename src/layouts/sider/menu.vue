<template>
  <div class="app-menu">
    <n-scrollbar style="height: 100%;">
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="config.siderCollapsedWidth"
        :options="menuOptions"
        :indent="24"
        :inverted="true"
        v-model:expanded-keys="openedKeys"
        v-model:value="selectedKey"
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import useCollapsed from '@/hooks/useCollapsed'
import { useAppStore } from '@/store/app'
import { Key } from 'naive-ui/es/menu/src/interface'
import { storeToRefs } from 'pinia'
const collapsed = useCollapsed()
const appStore = useAppStore()
const route = useRoute()
const selectedKey = ref<Key>('')
const openedKeys = ref<Key[]>([])
watchEffect(() => {
  appStore.updateCurrentPath(route.path)
  const [selected, ...opened] = appStore.menuPathKeys
  selectedKey.value = selected
  openedKeys.value = opened
})
const { menus: menuOptions } = storeToRefs(appStore)
</script>

<style scoped lang="less">
.app-menu{
  flex-grow: 1;
  height: 0;
}
</style>