<template>
  <div class="app-sider" :style="{ width: `${(collapsed ? config.siderCollapsedWidth : config.siderWidth)}px` }">
    <app-logo />
    <app-menu />
  </div>
</template>

<script setup lang="ts">
import AppLogo from './logo.vue'
import AppMenu from './menu.vue'
import useCollapsed from '@/hooks/useCollapsed'
import config from '@/config'
const collapsed = useCollapsed()
</script>

<style scoped>
.app-sider{
  background-color: var(--bgColor);
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
}
</style>