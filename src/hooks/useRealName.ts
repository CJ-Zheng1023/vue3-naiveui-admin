import { useUserStore } from '@/store/user'
export const useRealName = () => {
  const userStore = useUserStore()
  return computed(() => userStore.realName)
}
