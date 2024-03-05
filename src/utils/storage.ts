import config from '@/config'
// 默认过期时间
const EXPIRE_TIME = 60 * 60 * 24 * 7
const createStorage = ({ prefix = '', storage = localStorage }) => {
  class Storage {
    #storage = storage
    #prefix = prefix
    #genKey(key: string) {
      return `${this.#prefix}-${key}`
    }
    // expire为null时永久持久化
    set(key: string, value: any, expire: number | null = EXPIRE_TIME) {
      const timestamp = expire ? +new Date() + expire * 1000 : null
      this.#storage.setItem(
        this.#genKey(key),
        JSON.stringify({
          value,
          timestamp
        })
      )
    }
    get(key: string) {
      const dataStr = this.#storage.getItem(this.#genKey(key))
      if (!dataStr) {
        return ''
      }
      const { value, timestamp } = JSON.parse(dataStr)
      if (timestamp === null || timestamp > +new Date()) {
        return value
      } else {
        this.remove(key)
        return ''
      }
    }
    remove(key: string) {
      this.#storage.removeItem(this.#genKey(key))
    }
  }
  return new Storage()
}
export const storage = createStorage({ prefix: config.cachePrefix })
