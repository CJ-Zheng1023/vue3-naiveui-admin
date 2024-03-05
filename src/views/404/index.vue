<template>
  <div class="not-found-page">
    <error-box mainTitle="出错啦!" subTitle="您访问的页面不存在" imageUrl="/404-error.png">
      <template #actions>
        <n-button type="info" @click="handleToHome">返回首页</n-button>
      </template>
    </error-box>
  </div>
</template>

<script setup lang="ts">
import ErrorBox from '@/components/errorBox/index.vue'
const router = useRouter()
const handleToHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.not-found-page{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/404-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-attachment: fixed;
  overflow-y: auto;
}
</style>