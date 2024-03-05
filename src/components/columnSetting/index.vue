<template>
  <n-popover trigger="click" placement="bottom-end">
    <template #trigger>
      <Button type="warning" icon="SettingsView" :name="t('management.result.actions.column')" />
    </template>
    <template #default>
      <div class="config">
        <div class="config-item" v-for="item in configs" :key="item.key">
          <n-checkbox v-model:checked="item.checked">{{ item.name }}</n-checkbox>
        </div>
      </div>
    </template>
  </n-popover>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'
import type { ColumnConfig } from '@/hooks/useTable'
const configs = defineModel<ColumnConfig[]>('configs', { required: true })
const { t } = useI18n()
</script>

<style scoped lang="less">
.config{
  .config-item{
    &+.config-item{
      margin-top: 6px;
    }
  }
}
</style>