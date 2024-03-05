import { buildGetMockObj } from '#/helpers'
import { menu, menuList } from '#/data/menu'
import { URL } from '@/api/menu'
const queryForTree = buildGetMockObj(URL.queryForTreeUrl, menu)
const queryForList = buildGetMockObj(URL.queryForListUrl, menuList)
export default [queryForList, queryForTree]
