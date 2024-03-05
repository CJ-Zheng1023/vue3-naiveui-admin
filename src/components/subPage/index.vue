<template>
  <div class="sub-page">
    <n-scrollbar style="height: 100%;">
      <router-view />
      <n-back-top />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.sub-page{
  height: 100%;
}
</style>