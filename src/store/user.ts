import { defineStore, acceptHMRUpdate } from 'pinia'
import { storage } from '@/utils/storage'
import config from '@/config'
import { logout } from '@/api/user'
import { useAppStore } from './app'
import { reset as resetRouter } from '@/router'
export interface IUserState {
  realName: string
  token: string
}
export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    realName: storage.get(config.realNameKeyName),
    token: storage.get(config.tokenKeyName)
  }),
  actions: {
    logout() {
      return logout().then(_ => {
        this.resetAll()
      })
    },
    resetAll() {
      const appStore = useAppStore()
      appStore.reset()
      this.reset()
      resetRouter()
    },
    reset() {
      this.realName = ''
      this.token = ''
      storage.remove(config.realNameKeyName)
      storage.remove(config.tokenKeyName)
    }
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
