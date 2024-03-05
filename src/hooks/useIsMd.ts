import { useAppStore } from '@/store/app'
export const useIsMd = () => {
  const appStore = useAppStore()
  return computed(() => appStore.isMd)
}
