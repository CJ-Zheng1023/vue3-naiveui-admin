<template>
  <div class="changelog">
    <template v-if="isEmpty">
      <n-empty class="center" description="无数据" />
    </template>
    <template v-else>
      <div class="tabs">
        <n-tabs v-model:value="tabValue" type="bar" placement="left" :style="{ height: '100%', borderRight: `1px solid ${themeVars.borderColor}` }">
          <n-tab :name="tab" v-for="tab in tabs" :key="tab" />
        </n-tabs>
      </div>
      <div class="content">
        <n-scrollbar style="height: 100%;">
          <suspense>
            <template #default>
              <component :is="component" />
            </template>
            <template #fallback>
              <n-spin>
                <div style="height: 300px;"></div>
              </n-spin>
            </template>
          </suspense>
        </n-scrollbar>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useThemeVars } from 'naive-ui'
import components from './list'
export default defineComponent({
  setup() {
    // 默认选中第一个版本
    const tabValue = ref(components[0]?.key)
    const themeVars = useThemeVars()
    // 选中子组件
    const component = computed(() => {
      return components.find(item => item.key === tabValue.value)?.value
    })
    // 是否无内容
    const isEmpty = computed(() => !components.length)
    return {
      themeVars,
      tabValue,
      component,
      tabs: components.map(item => item.key),
      isEmpty
    }
  }
})

</script>

<style scoped lang="less">
.changelog{
  display: flex;
  height: 350px;
  position: relative;
  .tabs{
    height: 100%;
    flex-shrink: 0;
  }
  .content{
    height: 100%;
    flex-grow: 1;
  }
}
</style>