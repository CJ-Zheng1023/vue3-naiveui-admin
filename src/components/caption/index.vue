<template>
  <div class="caption">
    <n-icon v-if="icon" size="32">
      <component :is="icon" />
    </n-icon>
    <span style="margin-left: 10px;">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { iconKeyType } from '@/plugins/carbon'
withDefaults(defineProps<{
  name: string,
  icon?: iconKeyType
}>(), {
  name: ''
})
</script>

<style scoped lang="less">
.caption{
  display: flex;
  align-items: center;
}
</style>