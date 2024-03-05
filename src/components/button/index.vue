<template>
  <n-button v-bind="$attrs" :size="size">
    <template v-if="icon" #icon>
      <n-icon>
        <component :is="icon" />
      </n-icon>
    </template>
    <template #default>{{ name }}</template>
  </n-button>
</template>

<script setup lang="ts">
import { iconKeyType } from '@/plugins/carbon'
import { Size } from 'naive-ui/es/button/src/interface'
withDefaults(
  defineProps<{
  icon?: iconKeyType,
  name?: string
  size?: Size
}>(), {
  size: 'small'
})


</script>

<style scoped>

</style>