import { permissions } from './user'
export const menu = permissions
export const menuList = {
  code: 200,
  msg: '查询成功1',
  data: {
    list: permissions.data,
    pagination: {
      pageNo: 1,
      pageSize: 10,
      total: 33
    }
  }
}
