<template>
  <div class="app-content">
    <n-scrollbar style="height: 100%;">
      <router-view #default="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
</script>

<style scoped lang="less">
.app-content{
  flex-grow: 1;
  height: 0;
  color: v-bind('themeVars.textColor2');
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>