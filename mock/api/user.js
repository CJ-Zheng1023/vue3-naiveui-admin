import { buildGetMockObj, buildPostMockObj } from '#/helpers'
import { permissions, login } from '#/data/user'
import { URL } from '@/api/user'
const queryPermissions = buildGetMockObj(URL.queryPermissionsByUserUrl, permissions)
const handleLogin = buildPostMockObj(URL.loginUrl, login)
export default [queryPermissions, handleLogin]
