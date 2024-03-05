<template>
  <div class="app-logo">
    <img src="@/assets/images/logo1.png" :width="collapsed ? 32 : 38" />
    <span style="margin-left: 6px;font-size: 0;" :class="['brand-name', collapsed ? 'brand-name-hidden' : '']">
      <!-- {{ config.projectName }} -->
      <img src="@/assets/images/brand1.png" width="140" />
    </span>
    <div class="collapse-button" @click="toggleCollapse">
      <n-icon size="20" :class="{ 'rotate-180': collapsed }">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.5" d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z" fill="currentColor"></path>
          <path d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z" fill="currentColor"></path>
        </svg>
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import useCollapsed from '@/hooks/useCollapsed'
const appStore = useAppStore()
const collapsed = useCollapsed()
const toggleCollapse = () => {
  appStore.changeCollapsed(!collapsed.value)
}
</script>

<style scoped lang="less">
.app-logo{
  flex-shrink: 0;
  height: @headerHeight;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed var(--borderColor);
  position: relative;
  @collapseButtonSize: 30px;
  .brand-name{
    font-size: 18px;
    color: var(--color);
    opacity: 1;
    transition: opacity 0.2s 0.3s;
    visibility: visible;
    &.brand-name-hidden{
      visibility: hidden;
      opacity: 0;
    }
  }
  .collapse-button{
    box-shadow: var(--boxShadow);
    background-color: var(--bgColor);
    height: @collapseButtonSize;
    width: @collapseButtonSize;
    border-radius: 6px;
    position: absolute;
    top: 50%;
    right: -(@collapseButtonSize / 2);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      .n-icon{
        color: var(--hoverColor);
      }
    }
    .n-icon{
      color: var(--color);
      transition: transform 0.4s;
      &.rotate-180{
        transform: rotate(180deg);
      }
    }
  }
}
</style>