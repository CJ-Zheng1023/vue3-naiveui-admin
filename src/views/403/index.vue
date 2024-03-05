<template>
  <div class="forbidden-page">
    <error-box mainTitle="出错啦!" subTitle="您无可访问资源" imageUrl="/403-error.png">
      <template #actions>
        <n-button type="info" @click="handleToLogin">切换用户</n-button>
      </template>
    </error-box>
  </div>
</template>

<script setup lang="ts">
import ErrorBox from '@/components/errorBox/index.vue'
import { useUserStore } from '@/store/user'
import config from '@/config'
const router = useRouter()
const userStore = useUserStore()
const handleToLogin = () => {
  userStore.logout().then(_ => {
    router.push(config.pathLogin)
  })
}
</script>

<style scoped lang="less">
.forbidden-page{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/500-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-attachment: fixed;
  overflow-y: auto;
}
</style>