import { useAppStore } from '@/store/app'
export default () => {
  const appStore = useAppStore()
  return computed(() => appStore.collapsed)
}
