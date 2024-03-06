<template>
  <card :header-bordered="true">
    <template #caption>
      <Caption icon="Search" :name="t('management.search.title')" />
    </template>
    <template #default>
      <n-form :model="condition" label-placement="left" label-width="100px" label-align="right">
        <n-grid cols="24" responsive="screen"  item-responsive>
          <n-form-item-gi span="24 s:24 m:12 l:8" label="名称">
            <n-input v-model:value="condition.name" clearable />
          </n-form-item-gi>
          <n-form-item-gi span="24 s:24 m:12 l:8" label="组织机构">
            <loadable-select v-model:value="condition.orgId" :type="LoadableSelectTypeEnum.ORG" />
          </n-form-item-gi>
          <n-form-item-gi span="24 s:24 m:24 l:8">
            <n-space justify="end" style="width: 100%;">
              <Button :name="t('management.search.actions.query')" icon="Search" size="medium" type="info" @click="search" />
              <Button :name="t('management.search.actions.reset')" icon="Reset" size="medium" @click="reset" />
            </n-space>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </template>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/card/index.vue'
import Caption from '@/components/caption/index.vue'
import Button from '@/components/button/index.vue'
import LoadableSelect from '@/components/loadableSelect/index.vue'
import { LoadableSelectTypeEnum } from '@/components/loadableSelect/useLoadData'
import { CheckSearchCondition } from '@/api/check'
const condition = defineModel<CheckSearchCondition>('condition', { required: true })
const emit = defineEmits<{
  (e: 'reset'): void,
  (e: 'search'): void
}>()
const { t } = useI18n()
const search = () => {
  emit('search')
}
const reset = () => {
  emit('reset')
}
</script>

<style scoped>

</style>