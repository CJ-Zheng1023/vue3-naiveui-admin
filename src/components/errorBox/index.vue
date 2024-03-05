<template>
  <div class="error-box">
    <div class="top">
      <div class="main-title">{{ mainTitle }}</div>
      <div class="sub-title"> {{ subTitle }}</div>
    </div>
    <div class="middle">
      <div class="image">
        <img :src="imageUrl" height="300" width="300" />
      </div>
    </div>
    <div class="bottom">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  mainTitle: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="less">
.error-box{
  background-color: #fff;
  border-radius: 8px;
  padding: 32px 64px;
  .top{
    text-align: center;
    margin-bottom: 22px;
    .main-title{
      color: rgb(24, 28, 50);
      font-weight: 700;
      margin-bottom: 12px;
      font-size: 32px;
    }
    .sub-title{
      color: #A1A5B7;
      font-weight: 500;
      font-size: 14px;
    }
  }
  .middle{
    margin-bottom: 10px;
  }
  .bottom{
    text-align: center;
  }
}
</style>