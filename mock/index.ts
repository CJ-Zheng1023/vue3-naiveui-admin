const useMock = () => {
  const modules = import.meta.glob('./mock.js', { eager: true })
  Object.keys(modules).forEach(it => {
    const module = modules[it] as { default: () => void }
    module.default()
  })
}
export default useMock
