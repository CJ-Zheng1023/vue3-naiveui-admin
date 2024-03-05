<template>
  <div class="app-navbar">
    <!-- <n-dropdown placement="bottom-end" :options="languageOptions" @select="selectLanguage">
      <div class="navbar-item">
        <i-carbon-language />
      </div>
    </n-dropdown> -->
    <n-dropdown placement="bottom-end" :options="themeOptions" @select="selectTheme">
      <div class="navbar-item">
        <i-ant-design-skin-outlined />
      </div>
    </n-dropdown>
    <n-popover trigger="click" display-directive="show" placement="bottom" content-style="padding: 0">
      <template #trigger>
        <div class="navbar-item" style="font-size: 16px;width: auto;padding: 0 10px;">更新日志</div>
      </template>
      <template #header>更新日志</template>
      <template #default>
        <changelog style="width: 500px;" />
      </template>
    </n-popover>
    <n-dropdown @select="handleUserMenuSelect" placement="bottom-end" :options="userMenuOptions">
      <div class="user-menu">
        <span style="margin-right: 8px;">{{ realName }}</span>
        <span class="icon">
          <i-ant-design-caret-down-outlined style="font-size: 16px;" />
        </span>
      </div>
    </n-dropdown>
    <password-modal v-model:visible="passwordModalVisible" />
  </div>
</template>

<script setup lang="ts">
import Changelog from '@/changelog/index.vue'
import { DropdownOption } from 'naive-ui'
import useIconRender from '@/hooks/useIconRender'
import { useRealName } from '@/hooks/useRealName'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { ThemeEnum } from '@/enum'
import config from '@/config'
import PasswordModal from '@/layouts/header/passwordModal.vue'
const realName = useRealName()
const { t } = useI18n()
const languageOptions = ref<DropdownOption[]>([])
const themeOptions = ref<DropdownOption[]>([])
const userMenuOptions = ref<DropdownOption[]>([])
const passwordModalVisible = ref(false)
const userStore = useUserStore()
const appStore = useAppStore()
const USER_MENU_CHANGE_PASSWORD = 'password'
const USER_MENU_LOGOUT_KEY = 'logout'
watchEffect(() => {
  languageOptions.value = [
    {
      label: t('language.menus.0'),
      key: "zh-CN"
    },
    {
      label: t('language.menus.1'),
      key: 'en'
    }
  ]
  themeOptions.value = [
    {
      label: t('theme.menus.0'),
      key: ThemeEnum.DARK,
      icon: useIconRender('Moon')
    },
    {
      label: t('theme.menus.1'),
      key: ThemeEnum.LIGHT,
      icon: useIconRender('Sun')
    }
  ]
  userMenuOptions.value = [
    /* {
      label: t('user.menus.0'),
      key: USER_MENU_CENTER_KEY
    },
    {
      type: 'divider',
      key: 'divider'
    }, */
    {
      label: '修改密码',
      key: USER_MENU_CHANGE_PASSWORD
    },
    {
      type: 'divider',
      key: 'divider'
    },
    {
      label: t('user.menus.1'),
      key: USER_MENU_LOGOUT_KEY
    }
  ]
})
const selectTheme = (key: ThemeEnum) => {
  appStore.changeTheme(key)
}
const router = useRouter()
const handleUserMenuSelect = (key: string) => {
  if (key === USER_MENU_LOGOUT_KEY) {
    userStore.logout().then(_ => {
      router.push(config.pathLogin)
    })
  } else if (key === USER_MENU_CHANGE_PASSWORD) {
    passwordModalVisible.value = true
  }
}
/* const handleViewHelp = () => {
  window.open(`${config.helpViewUrl}?t=${+new Date()}`, 'help')
} */
/* const openChangelogModal = () => {
  changelogModalVisible.value = true
} */
</script>

<style scoped lang="less">
.app-navbar{
  display: flex;
  align-items: center;
  .navbar-item{
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: var(--itemColor);
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      color: var(--itemHoverColor);
      background-color: var(--itemHoverBgColor);
    }
  }
  .user-menu{
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: var(--itemColor);
    font-size: 16px;
    .icon{
      transition: transform 0.5s;
      font-size: 0;
    }
    &:hover{
      color: var(--itemHoverColor);
      .icon{
        transform: rotate(-180deg);
      }
    }
  }
}
</style>