export const useHasButton = (buttonName: string) => {
  // todo: 和后端未联调前绕过验证
  if (import.meta.env.VITE_APP_MOCK === 'open') {
    return true
  }
  const buttons = useRoute().meta.buttons
  return buttons?.includes(buttonName)
}
