<template>
  <div class="app-breadcrumb">
    <n-breadcrumb>
      <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.value">
        <template v-if="item.options.length > 1">
          <n-popselect @update:value="handleUpdate" placement="bottom-start" :value="item.value" :options="item.options">
            <span>{{ item.label }}</span>
          </n-popselect>
        </template>
        <template v-else>
          <span>{{ item.label }}</span>
        </template>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
const appStore = useAppStore()
const { breadcrumbs } = storeToRefs(appStore)
const router = useRouter()
const handleUpdate = (_: string, option: SelectMixedOption) => {
  const path = option['path'] as string
  router.push(path)
}
</script>

<style scoped>

</style>