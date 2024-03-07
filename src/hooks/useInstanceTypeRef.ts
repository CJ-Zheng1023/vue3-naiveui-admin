export default function useInstanceTypeRef<T extends abstract new (...args: any) => any>(_: T) {
  return ref<InstanceType<T>>()
}