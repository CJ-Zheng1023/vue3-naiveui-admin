import { ID, Pageable } from "@/types"
import { IResponse } from '@/utils/request'
import { DataTableColumns, PaginationInfo } from "naive-ui"
import useLoading from '@/hooks/useLoading'
import { TableBaseColumn } from "naive-ui/es/data-table/src/interface"

type Api<T> = ((pageNo: number, pageSize: number, condition?: any) => Promise<IResponse<Pageable<T>>>)
type TableConfig<T, F extends Api<T>> = {
  // 查询接口
  api: F,
  // 查询条件
  params?: Parameters<F>[2]
  // 是否立即查询
  immediate?: boolean,
  // 配置列工厂
  columns: () => DataTableColumns<T>,
  // 查询数据前的操作
  beforeLoadData?: () => void
}
export type ColumnConfig = {
  key: string
  name: string
  checked: boolean
}
const SELECTION_KEY = 'key_selection'
const SELECTION_TYPE = 'selection'
export function useTable<T extends { id: ID }, F extends Api<T>>(config: TableConfig<T, F>) {
  const { start, stop, loading } = useLoading()
  const { api, params, immediate = true, columns, beforeLoadData } = config
  const pagination = reactive({
    pageSize: 10,
    page: 1,
    itemCount: 0,
    pageSlot: 7,
    pageSizes: [10, 20, 30, 40],
    showSizePicker: true,
    prefix: ({ itemCount }: PaginationInfo) => `共 ${itemCount} 项`,
    onUpdatePage: (page: number) => {
      pagination.page = page
      loadData()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      loadData(1)
    }
  })
  const data: Ref<T[]> = ref([])
  const condition: NonNullable<Parameters<F>[2]> = reactive({ ...params })
  /**
   * 查询数据
   * @param page 页码
   */
  const loadData =(page: number = pagination.page) => {
    beforeLoadData && beforeLoadData()
    start()
    api(page, pagination.pageSize, condition).then(res => {
      const { list, pagination: p } = res.data
      pagination.page = p.pageNo
      pagination.pageSize = p.pageSize
      pagination.itemCount = p.total
      data.value = list
    }).finally(() => {
      stop()
    })
  }
  onMounted(() => {
    if (immediate) {
      loadData(1)
    }
  })
  const { t } = useI18n()
  /**
   * 构建列选项
   * @param columns 列配置
   * @returns 
   */
  const _buildColumnSettings = (columns: DataTableColumns<T>) => {
    const configs: ColumnConfig[] = []
    columns.forEach(item => {
      if (item.type === SELECTION_TYPE) {
        configs.push({
          key: SELECTION_KEY,
          name: t('management.result.table.columns.selection'),
          checked: true
        })
      } else {
        item = item as TableBaseColumn
        configs.push({
          key: item.key as string,
          name: item.title as string,
          checked: true
        })
      }
    })
    return configs
  }
  const columnConfigs: Ref<ColumnConfig[]> = ref(_buildColumnSettings(columns()))
  // 可显示列
  const filteredColumns = computed(() => {
    const cols = columns()
    return columnConfigs.value.filter(item => item.checked).map(item => {
      if (item.key === SELECTION_KEY) {
        return cols.find(col => col.type === SELECTION_TYPE)!
      } else {
        return cols.find(col => {
          col = col as TableBaseColumn
          return col.key === item.key
        })!
      }
    })
  })
  // 重置查询条件
  const resetCondition = () => {
    Object.assign(condition, params)
  }
  return {
    loading,
    data,
    loadData,
    pagination,
    condition,
    columnConfigs,
    filteredColumns,
    rowKey: (row: T) => row.id,
    resetCondition
  }
}