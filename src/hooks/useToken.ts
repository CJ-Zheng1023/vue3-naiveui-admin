import { useUserStore } from '@/store/user'
export const useToken = () => {
  const userStore = useUserStore()
  return computed(() => userStore.token)
}
