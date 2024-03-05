export default function useLoading() {
  const loading = ref(false)
  const start = () => loading.value = true
  const stop = () => loading.value = false
  const toggle = () => loading.value = !loading.value
  return {
    loading,
    start,
    stop,
    toggle
  }
}