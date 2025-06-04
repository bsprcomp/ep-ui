import { computed, nextTick, reactive, ref, watch } from "vue"
import { type TableInstance } from "element-plus"
export default function (props) {
  const tableInstance = ref<TableInstance>()
  // 初始化数据
  let state = reactive<any>({
    tableData: props.data,
    columnSet: []
  })
  // check为空，清空列表选中发
  watch(props.check, () => {
    if (!props.check.value.length) {
      // 复选框选中为空时，清空列表所有选中
      tableInstance.value?.clearSelection()
    }
  })
  watch(
    () => state.tableData,
    () => {
      //勾选已选列表
      nextTick(() => {
        state.tableData.map(item => {
          if (props.check.value.some((ite: any) => ite == item[props.rowKey])) {
            tableInstance.value?.toggleRowSelection(item, true)
          }
        })
      })
    },
    { deep: true }
  )
  const handleSelect = (v: any[]) => {
    let checkList: any[] = []
    if (v.length == 0) {
      // 清除当夜选中
      checkList =
        props.check.value.filter((key: any) => {
          return !state.tableData.some((ite: any) => ite[props.rowKey] == key)
        }) ?? []
    } else if (v.length < state.tableData.length) {
      checkList =
        props.check.value
          .filter((key: any) => {
            return !state.tableData.some((ite: any) => ite[props.rowKey] == key)
          })
          .concat(v.map((ite: any) => ite[props.rowKey])) ?? []
    } else {
      checkList = props.check.value?.concat(v.map((ite: any) => ite[props.rowKey])) ?? []
    }
    props.check.value = Array.from(new Set(checkList))
  }
  return {
    state,
    tableInstance,
    handleSelect
  }
}
