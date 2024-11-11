import { JsxElement } from "typescript"

export interface Props2<T> {
  name?: string
  rowKey?: string
  filterCheckList?: (list: any[]) => any
  isShowMenu?: boolean
  // table所需数据
  data: T[]
  rowClick?: (row: any) => void
  // 表头数据
  columns: ({
    type?: "index" | "selection" | "expand"
    prop?: string
    label?: string
    width?: string
    minWidth?: string
    [x: string]: any
  } & {
    operation: {
      label?: string
      width?: string
      isVisible?: (row: any, index: number) => boolean
      operationType?: "rowEdit"
      func: Function
      disabled?: boolean
      isDisabled?: (row: any, index: number) => boolean
      slotName?: string
      render?: (row: any) => JsxElement
    }[]
  })[]
  // table对齐方式
  align?: "left" | "center" | "right"
  // 是否显示分页
  isShowPagination?: boolean
  sortable?: boolean
  pageProps?: {
    size?: "" | "default" | "small" | "large"
    pageSize?: string
    currentPage?: string
    layout?: string
    pageSizes?: number[]
    background?: boolean
  }
  menuConfig?: Object
  extra?: number
}
