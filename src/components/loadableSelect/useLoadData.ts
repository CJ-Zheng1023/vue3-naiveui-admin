import { queryForSelect as queryMembers } from '@/api/member'
import { queryForSelect as queryTags } from '@/api/tag'
import { queryForSelect as queryOrgs } from '@/api/organization'
import { queryForSelect as queryChecks } from '@/api/check'
import { queryForSelect as queryCheckTemplate } from '@/api/checkTemplate'
import { queryForSelect as queryGroups } from '@/api/group'
import { queryForSelect as queryRoles } from '@/api/role'
import useLoading from '@/hooks/useLoading'
import { isNil } from 'lodash-es'
import { IResponse } from '@/utils/request'
/**
 * 可加载下拉菜单type属性选项
 */
export enum LoadableSelectTypeEnum {
  ROLE = 'role',
  MEMBER = 'member',
  LOCAL = 'local',
  TAG = 'tag',
  ORG = 'org',
  CHECK = 'check',
  CHECK_TEMPLATE = 'checkTemplate',
  GROUP = 'group'
}
export type Options = Record<string, number | string>[]
export function useLoadData(type: LoadableSelectTypeEnum, op: Options, params: Ref<(any)[]>) {
  const options: Ref<Options> = ref([])
  const { loading, start, stop } = useLoading()
  let res: IResponse<Options>
  const _loadData = async () => {
    start()
    if (type === LoadableSelectTypeEnum.MEMBER) {
      res = await queryMembers()
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.ROLE) {
      res = await queryRoles()
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.CHECK) {
      const p = params.value[0]
      if (!isNil(p)) {
        res = await queryChecks(p)
        options.value = res.data
      }
    } else if (type === LoadableSelectTypeEnum.ORG) {
      res = await queryOrgs()
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.TAG) {
      res = await queryTags()
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.CHECK_TEMPLATE) {
      res = await queryCheckTemplate()
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.GROUP) {
      const p = params.value[0]
      res = await queryGroups(p)
      options.value = res.data
    } else if (type === LoadableSelectTypeEnum.LOCAL) {
      options.value = op || []
    } else {
      const n: never = type
      console.log(n)
    }
    stop()
  }
  onMounted(() => {
    _loadData()
  })
  watch(() => params.value, (newArr, oldArr) => {
    //todo
    if (newArr.length !== oldArr.length) {
      _loadData()
      return
    }
    let isSame = true
    for(let i = 0, len = newArr.length; i < len; i++) {
      isSame = isSame && newArr[i] === oldArr[i]
      if (!isSame) {
        break
      }
    }
    if (!isSame) {
      _loadData()
    }
  })
  return {
    options,
    loading
  }

}