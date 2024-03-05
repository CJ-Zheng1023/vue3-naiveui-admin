<template>
  <card style="height: 100%;">
    <div class="no-data">
      <div class="inner">
        <div class="title">{{ title }}</div>
        <div class="sub-title">{{ subTitle }}</div>
        <div class="actions" v-if="$slots.default">
          <slot></slot>
        </div>
        <div class="image">
          <img src="@/assets/images/no-data.png" width="400" />
        </div>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/card/index.vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="less">
.card{
  :deep(.card-body){
    height: 100%;
  }
}
.no-data{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title{
    font-size: 26px;
    font-weight: 600;
    color: var(--color);
    margin-bottom: 32px;
    text-align: center;
  }
  .sub-title{
    font-size: 16px;
    font-weight: 500;
    color: var(--color);
    margin-bottom: 32px;
    text-align: center;
  }
  .actions{
    text-align: center;
  }
  .image{
    text-align: center;
    margin-top: 40px;
  }
}
</style>