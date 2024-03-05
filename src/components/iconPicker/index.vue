<template>
  <n-popover trigger="click" placement="bottom" display-directive="show">
    <template #trigger>
      <n-button>
        <template v-if="value" #icon>
          <n-icon :component="icons[value as iconKeyType]"></n-icon>
        </template>
        <span>{{ value || '请选择图标' }}</span>
      </n-button>
    </template>
    <template #header>
      <div class="search">
        <n-input v-model:value="input" type="text" placeholder="请输入ICON名称" />
      </div>
    </template>
    <template #default>
      <div class="icon-select">
        <n-scrollbar style="height: 100%;">
          <div class="inner">
            <div class="icon-select-item" v-for="name in pagedIconNames" :key="name" @click="handleClickItem(name)">
              <div>
                <n-icon :size="24" :component="icons[name]" />
              </div>
              <div>
                <n-ellipsis :tooltip="{ to: false, placement: 'bottom' }">{{ name }}</n-ellipsis>
              </div>
            </div>
          </div>
        </n-scrollbar>
      </div>
    </template>
    <template #footer>
      <div class="pagination">
        <n-pagination
          v-model:page="pagination.pageNo"
          v-model:page-size="pagination.pageSize"
          :item-count="pagination.total"
          :prefix="pagination.prefix"
          :page-slot="pagination.pageSlot"
        />
      </div>
    </template>
  </n-popover>
</template>

<script setup lang="ts">
import { icons } from '@/plugins/carbon'
import { objectKeys } from '@/utils/lib'
import { iconKeyType } from '@/plugins/carbon'
import { PropType } from 'vue'
import { useDebounce } from '@vueuse/core'
import { PaginationInfo } from 'naive-ui'
import { regExpTest } from '@/utils/lib'
const iconNames = objectKeys(icons)
defineProps({
  value: {
    type: String as PropType<iconKeyType | ''>,
    default: ''
  }
})
const emit = defineEmits(['update:value'])
const input = ref('')
const inputDebounced = useDebounce(input, 500)
const pagination = reactive({
  pageNo: 1,
  pageSize: 20,
  pageSlot: 7,
  prefix: ({ itemCount }: PaginationInfo) => `共 ${itemCount} 项`,
  total: iconNames.length
})
// 根据输入条件筛选图标
const filteredIconNames = computed(() => {
  return iconNames.filter(item => regExpTest(inputDebounced.value, item))
})
// 根据分页筛选图标
const pagedIconNames = computed(() => {
  const startIndex = (pagination.pageNo - 1) * pagination.pageSize
  return filteredIconNames.value.slice(startIndex, startIndex + pagination.pageSize)
})
watchEffect(() => {
  pagination.pageNo = 1
  pagination.total = filteredIconNames.value.length
})
const handleClickItem = (iconName: iconKeyType) => {
  emit('update:value', iconName)
}
</script>

<style scoped lang="less">
.icon-select{
  width: 500px;
  height: 200px;
  .inner{
    display: flex;
    flex-wrap: wrap;
  }
  .icon-select-item{
    width: 20%;
    padding: 8px;
    text-align: center;
    cursor: pointer;
  }
}
.pagination{
  display: flex;
  justify-content: flex-end;
}
</style>