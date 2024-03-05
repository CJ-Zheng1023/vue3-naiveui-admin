<template>
  <div class="login-page">
    <div class="login-header">
      <img src="@/assets/images/logo1.png" width="40" />
      <img src="@/assets/images/brand1.png" width="160" style="margin-left: 10px;" />
    </div>
    <div class="login-content">
      <div class="slogan">
        <div class="main">
          <!-- 医疗影像数据，尽在掌握，助您医疗无忧 -->
          掌握医疗大数据，解锁健康新世界!
        </div>
        <div class="sub">一触即得，便捷管理医疗数据</div>
      </div>
      <div class="form">
        <div class="wrapper">
          <div class="title">医学影像大数据平台</div>
          <n-config-provider :theme="darkTheme">
            <n-form ref="formRef" :model="formModel" :rules="rules">
              <n-form-item path="username">
                <n-input @keyup.enter="handleLogin" v-model:value="formModel.username" placeholder="用户名" />
              </n-form-item>
              <n-form-item path="password">
                <n-input @keyup.enter="handleLogin" v-model:value="formModel.password" type="password" placeholder="密码" />
              </n-form-item>
              <n-form-item class="login-btn-area">
                <n-button @click="handleLogin" :loading="btnLoading" :block="true" type="info">登 录</n-button>
                <div class="checkbox-area">
                  <n-checkbox v-model:checked="checkbox">我已阅读并同意</n-checkbox>
                  <a class="notice" @click="openModal">用户须知</a>
                </div>
              </n-form-item>
            </n-form>
            <notice-modal v-model:visible="noticeModalVisible" />
          </n-config-provider>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <!-- <div class="copyright">版权所有 &copy; 2022 东软医疗系统股份有限公司</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import { login } from '@/api/user'
import { useUserStore } from '@/store/user'
import { storage } from '@/utils/storage'
import { FormInst, useMessage, darkTheme, useNotification, useThemeVars } from 'naive-ui'
import NoticeModal from './noticeModal.vue'
const themeVars = useThemeVars()
const formModel = reactive({
  username: '',
  password: ''
})
const formRef = ref<FormInst | null>(null)
const btnLoading = ref(false)
const noticeModalVisible = ref(false)
const checkbox = ref(false)
const userStore = useUserStore()
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
}
const router = useRouter()
window.$message = useMessage()
window.$notification = useNotification()
const handleLogin = () => {
  formRef.value?.validate((valid) => {
    if(!valid) {
      if (!checkbox.value) {
        window.$message.error('请同意勾选用户须知后登录')
        return
      }
      const { username, password } = formModel
      btnLoading.value = true
      login(username, password).then(res => {
        const { token, realName } = res.data
        userStore.$patch({
          realName,
          token
        })
        storage.set(config.tokenKeyName, token)
        storage.set(config.realNameKeyName, realName)
        router.push('/')
      }).finally(() => {
        btnLoading.value = false
      })
    }
  })
}
const openModal = () => {
  noticeModalVisible.value = true
}
</script>

<style scoped lang="less">
.login-page{
  height: 100%;
  background-image: url('@/assets/images/login-bg1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-attachment: fixed;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
}
@paddingLeftAndRight: 32px;
.login-header{
  flex-shrink: 0;
  padding: 20px @paddingLeftAndRight;
}
.login-content{
  flex-grow: 1;
  display: flex;
  padding: 0 @paddingLeftAndRight;
  justify-content: center;
  align-items: center;
  .slogan{
    margin-right: 300px;
    color: #fff;
    margin-top: 400px;
    font-size: 24px;
    .main{
      margin-bottom: 12px;
    }
    .sub{
      text-align: right;
      font-size: 18px;
    }
  }
  .form{
    padding: 32px 0;
    .wrapper{
      background-color: rgba(0, 0, 0, .4);
      border-radius: 4px;
      padding: 70px 65px;
      // box-shadow: 0 0 10px 6px #012f5d;
      .n-button{
        :deep(.n-button__border){
          border-color: rgba(5,75,103,.8);
        }
      }
    }
    .n-input{
      width: 350px;
      padding: 5px 0;
      background-color: rgba(41, 69, 96, 0.8);
    }
    .n-button{
      height: 44px;
      background-color: rgba(5,75,103,.8);
      color: #fff;
      font-size: 20px;
    }
    .title{
      color: #fff;
      text-align: center;
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 50px;
    }
  }
}
.login-footer{
  flex-shrink: 0;
  padding: 10px @paddingLeftAndRight;
  text-align: center;
  color: #fff;
  .copyright{
    font-size: 14px;
    font-weight: 400;
  }
}
.login-btn-area{
  :deep(.n-form-item-blank){
    padding-top: 30px;
    .checkbox-area{
      position: absolute;
      top: 0;
      .notice{
        text-decoration: underline;
        color:v-bind('themeVars.primaryColor');
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 1300px) {
  .login-content{
    .slogan{
      display: none;
    }
  }
}
</style>