import Mock from 'mockjs'
import user from '#/api/user'
import menu from '#/api/menu'
const mocks = [...user, ...menu]
export default function () {
  mocks.forEach(item => {
    Mock.mock(new RegExp(`${import.meta.env.VITE_APP_BASE_URL}${item.url}`), item.type, item.response)
  })
}
