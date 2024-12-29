import { computed, nextTick, ref, defineEmits } from "vue"
export default function (props, emits, tableInstance: any, tableConfig: any) {
  // 抛出事件

  // 保存当前编辑列id (开启编辑)
  const editRowKey = ref()
  const {
    pageSize = tableConfig?.pageProps?.pageSize ?? "size",
    currentPage = tableConfig?.pageProps?.currentPage ?? "page",
    size = tableConfig?.pageProps?.size ?? "default",
    background = tableConfig?.pageProps?.background ?? true,
    pageSizes = tableConfig?.pageProps?.pageSizes ?? [10, 20, 50, 100],
    layout = tableConfig?.pageProps?.layout ?? "total,sizes, prev, pager, next, jumper",
    ...res
  } = props.pageProps
  // 赋值
  const newPageProps: any = computed(() => ({
    pageSize,
    currentPage,
    layout,
    pageSizes,
    size,
    background
  }))
  // v-bind 绑定
  const bindPageProps = computed(() => ({
    ...res
  }))
  const setRowSelected = (item, row) => {
    if (item.heightlightClick ?? props.heightlightClick ?? tableConfig?.heightlightClick ?? false) {
      tableInstance.value.setCurrentRow(row)
    }
  }
  // 筛选编辑项
  const editColumnItemArr = computed(() => props.columns.filter(item => item.inputType))
  const handleRowClick = (row: any, item: any, scope) => {
    setRowSelected(item, row)
    if (item.operationType === "rowEdit") {
      // 给可编辑列新增属性 ${item.editKey || item.prop}EditValue,并赋默认值
      editColumnItemArr.value.map(item => {
        row[`${item.editKey || item.prop}EditValue`] = row[item.prop as any]
      })
      nextTick(() => {
        editRowKey.value = row[props.rowKey]
      })
    } else {
      item?.func && item.func(row, scope)
    }
  }
  // 行保存
  const handleRowEditSave = row => {
    editRowKey.value = undefined
    editColumnItemArr.value.map(item => {
      row[`${item.editKey || item.prop}`] = row[`${item.editKey || item.prop}EditValue`]
      delete row[`${item.editKey || item.prop}EditValue`]
    })
    emits("editSave", row)
  }
  // 行取消
  const handleRowEditCancel = () => {
    editRowKey.value = undefined
    emits("editCancel")
  }
  return {
    editRowKey,
    newPageProps,
    handleRowClick,
    handleRowEditSave,
    handleRowEditCancel,
    bindPageProps,
    setRowSelected
  }
}
