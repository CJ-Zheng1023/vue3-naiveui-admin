<template>
  <div class="app-header">
    <app-breadcrumb />
    <app-navbar />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './navbar.vue'
import AppBreadcrumb from './breadcrumb.vue'
</script>

<style scoped lang="less">
.app-header{
  padding: 0 30px;
  background-color: var(--bgColor);
  height: @headerHeight;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 10px 30px 0px rgba(82, 63, 105, 0.05);
}
</style>