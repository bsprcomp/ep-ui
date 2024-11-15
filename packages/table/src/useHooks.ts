import { computed, nextTick, ref, defineEmits } from "vue"
export default function (props, emits) {
  // 抛出事件

  // 保存当前编辑列id (开启编辑)
  const editRowKey = ref()
  const {
    pageSize = "size",
    currentPage = "page",
    size = "default",
    background = true,
    pageSizes = [10, 20, 50, 100],
    layout = "total,sizes, prev, pager, next, jumper",
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
  // 筛选编辑项
  const editColumnItemArr = computed(() => props.columns.filter(item => item.inputType))
  const handleRowClick = (row: any, item: any, scope) => {
    if (item.operationType === "rowEdit") {
      // 给可编辑列新增属性 ${item.editKey || item.prop}EditValue,并赋默认值
      editColumnItemArr.value.map(item => {
        row[`${item.editKey || item.prop}EditValue`] = row[item.prop as any]
      })
      console.log(row, "row")

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
    console.log(row, "row")
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
    bindPageProps
  }
}
