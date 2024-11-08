<template>
  <div class="ep-table" ref="EPTableBox">
    <div class="header">
      <el-space size="small">
        <slot name="btn"><i></i></slot>
      </el-space>
      <div class="input-content">
        <el-space size="small">
          <slot name="input"></slot>
          <!--列设置-->
          <column-set
            v-if="isShowMenu"
            :name="name"
            :menuConfig="menuConfig"
            :columns="renderColumns"
            ref="columnSetRef"
            @columnSetting="v => (state.columnSet = v)"
          />
        </el-space>
      </div>
    </div>
    <div class="table-content" ref="tableContent">
      <el-table
        :max-height="height"
        ref="EPTable"
        :data="state.tableData"
        @selection-change="selectionChange"
        @row-click="rowClick"
        :row-key="rowKey"
        @sort-change="sortChange"
        v-bind="$attrs"
      >
        <!-- 主体内容 -->
        <template v-for="(item, index) in renderColumns">
          <template v-if="!item.hidden">
            <el-table-column
              show-overflow-tooltip
              :key="index + 'i'"
              :sortable="item.sortable || sortable"
              :index="index => indexMethod(index, item)"
              v-bind="{ align, ...item }"
            >
              <!-- 自定义header -->
              <template #header v-if="item.renderHeader || item.headerSlot">
                <!-- jsx -->
                <render-header
                  v-if="item.renderHeader"
                  :column="item"
                  :render="item.renderHeader"
                />
                <!-- 插槽 -->
                <slot v-if="item.headerSlot" :name="item.headerSlot"></slot>
              </template>
              <template v-slot="scope" v-if="item.type !== 'selection' && item.type !== 'index'">
                <!-- render渲染 -->
                <template v-if="item.render">
                  <render-col
                    :column="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="scope.$index"
                  />
                </template>

                <!-- 自定义插槽 -->
                <template v-if="item.slotName">
                  <slot :name="item.slotName" :scope="scope"></slot>
                </template>
                <!-- 操作列 -->
                <template v-if="item.prop == 'operation'">
                  <template v-for="(op, index) in item.operation" :key="index">
                    <el-button
                      v-if="!(op.isVisible && op.isVisible(scope.row, scope.$index))"
                      @click="op.fun && op.fun(scope.row, scope.$index, state.tableData)"
                      v-bind="{
                        type: 'primary',
                        link: true,
                        ...op
                      }"
                      :disabled="
                        op.disabled || (op?.isDisabled && op.isDisabled(scope.row, scope.$index))
                      "
                    >
                      <!-- render渲染 -->
                      <template v-if="op.render">
                        <render-col
                          :column="op"
                          :row="scope.row"
                          :render="op.render"
                          :index="scope.$index"
                        />
                      </template>
                      <template v-if="op.slotName">
                        <slot :name="op.slotName" :scope="scope"></slot>
                      </template>
                      <span v-if="!op.render && !op.slotName">{{ op.label }}</span>
                    </el-button>
                  </template>
                </template>
                <div
                  v-if="
                    !item.render &&
                    !item.slotName &&
                    !item.canEdit &&
                    !item.filters &&
                    !item.operation
                  "
                >
                  <span>{{ scope.row[item.prop] }}</span>
                </div>
              </template>
            </el-table-column>
          </template>
          <!-- 表头合并单元格 -->
          <!-- <ep-table-column v-else :key="index + 'm'" :item="item" :align="align" v-bind="$attrs">
          <template v-for="(index, name) in slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </ep-table-column> -->
        </template>
        <slot></slot>
        <!-- 操作按钮 -->
      </el-table>
    </div>
    <!-- 分页器 -->
    <el-pagination
      class="el-pagination-com"
      v-if="isShowPagination"
      v-model:current-page="page[newPageProps.currentPage || 'currentPage']"
      v-model:page-size="page[newPageProps.pageSize || 'pageSize']"
      :total="page.total"
      :page-sizes="newPageProps.pageSizes || [10, 20, 50, 100]"
      :layout="newPageProps.layout || 'total,sizes, prev, pager, next, jumper'"
      :background="newPageProps.background"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      v-bind="$attrs"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script setup lang="ts" name="EPTable">
import { useRemainingHeight } from "../../hook"
import {
  computed,
  ref,
  watch,
  useSlots,
  reactive,
  onMounted,
  onUpdated,
  onBeforeUnmount,
  nextTick
} from "vue"
import Sortable from "sortablejs"
import SingleEditCell from "./singleEditCell.vue"
import ColumnSet from "./ColumnSet.vue"
import RenderCol from "./renderCol.vue"
import RenderHeader from "./renderHeader.vue"
// 虚拟滚动
import { useVirtualized } from "./useVirtualized"

const tableContent = ref()
const {
  scrollContainerEl,
  updateRenderedItemCache,
  updateOffset,
  getDom,
  saveDATA,
  getItemHeightFromCache
} = useVirtualized()
// 分页设置
const page = defineModel("page", {
  default: {
    page: 1,
    total: 0,
    size: 0
  }
})
const check = defineModel<any>("check", {
  default: []
})
const sortParam = defineModel<any>("sortParam", { default: {} })

import { useExpose } from "./useExpose"
const { EPTable, fun } = useExpose()
type EPTableProps = {
  name?: string
  rowKey: string
  filterCheckList?: (list: any[]) => any
  isShowMenu: boolean
  // table所需数据
  data: Record<string, any>[] | []
  // 表头数据
  columns: (Record<string, any> & { operation: any[] })[]
  // table对齐方式
  align?: "left" | "center" | "right"

  // 是否开启行拖拽
  isRowSort?: boolean
  // 是否开启点击整行选中单选框
  rowClickRadio?: boolean
  // 设置默认选中项（单选）defaultRadioCol值必须大于0！
  defaultRadioCol?: Number
  // 序列号显示是否分页累加
  isPaginationCumulative?: boolean
  // 是否显示分页
  isShowPagination?: boolean
  // 是否开启编辑保存按钮
  isShowFooterBtn?: boolean
  // 是否开启虚拟列表
  useVirtual: boolean
  // 虚拟列表的渲染行数
  virtualShowSize: number
  rules: Record<string, any>
  sortable: boolean
  pageProps?: {
    size?: "" | "default" | "small" | "large"
    pageSize?: string
    currentPage?: string
    layout?: string
    pageSizes?: number[]
    background?: boolean
  }
  menuConfig: Object
  extra?: number
}

const props = withDefaults(defineProps<EPTableProps>(), {
  rowKey: "id",
  isShowMenu: false,
  pageProps: () => ({}),
  extra: 0
})
const newPageProps = computed(() => ({
  pageSize: "size",
  currentPage: "page",
  size: "default",
  background: true,
  ...props.pageProps
}))
//  剩余高度计算
const { height } = useRemainingHeight(tableContent, props.extra)

// 初始化数据
let state = reactive({
  tableData: props.data,
  columnSet: [],
  copyTableData: [] // 键盘事件
})
// 单选框
const radioVal = ref<number | any>("")
// 判断单选选中及取消选中
const forbidden = ref(true)
// 获取ep-table ref
const EPTableBox = ref<HTMLElement | any>(null)
// 获取columnSet Ref
const columnSetRef = ref<HTMLElement | any>(null)
// 获取form ref
const formRef = ref({})
// 动态form ref
const handleRef = (el: any, scope: { $index: number; column: { property: string } }, item) => {
  if (el) {
    formRef.value[`formRef-${scope.$index}-${item.prop || scope.column.property}`] = el
  }
}
// 获取所有单元格编辑组件 ref
const ediEPTableRef: any = ref({})
// 动态单元格编辑组件 ref
const handleEdiEPTableRef = (
  el: any,
  scope: { $index: number; column: { property: string } },
  item: { prop: any }
) => {
  if (el) {
    ediEPTableRef.value[`singleEditRef-${scope.$index}-${item.prop || scope.column.property}`] = el
  }
}
// 序号
const indexMethod = (index, item) => {
  if (props.isShowPagination && item.type == "index") {
    if (item.indexMethod) {
      return item.indexMethod(index, item)
    } else {
      return (
        index +
        1 +
        (page.value[newPageProps.value.currentPage] - 1) * page.value[newPageProps.value.pageSize]
      )
    }
  } else {
    return index
  }
}
// 抛出事件
const emits = defineEmits(["sort", "getData", "rowSort", "validateError"])
// 获取所有插槽
const slots = useSlots()
watch(
  () => props.data,
  val => {
    // console.log(111, val)
    if (props.useVirtual) {
      saveDATA.value = val
      updateRenderData(0)
    } else {
      state.tableData = val
    }
  },
  { deep: true }
)
// 过滤复选框选中数据
const newFilterCheckList = (list: any[]) => {
  const { filterCheckList } = props
  return filterCheckList ? filterCheckList(list) : list.map(item => item[props.rowKey])
}
// 复选框
const selectionChange = value => {
  check.value = newFilterCheckList(value)
}
// 排序
const sortChange = (data: any) => {
  const { column, prop, order } = data

  if (prop && order) {
    sortParam.value = { [order == "ascending" ? "asc" : "desc"]: prop }
  } else {
    sortParam.value = {}
  }
  emits("sort", data)
  if (column.sortable == "custom") {
    emits("getData", sortParam.value)
  }
}
// 当前页
const handleCurrentChange = () => {
  emits("getData")
}
// size
const handleSizeChange = () => {
  page.value[newPageProps.value.currentPage || "page"] = 1
  emits("getData")
}

onMounted(() => {
  if (props.defaultRadioCol) {
    defaultRadioSelect(props.defaultRadioCol)
  }
  initSort()
  if (props.useVirtual) {
    saveDATA.value = props.data
    getDom()
    scrollContainerEl.value?.addEventListener("scroll", handleScroll)
  }
})
// 更新实际渲染数据
const updateRenderData = (scrollTop: number) => {
  let startIndex = 0
  let offsetHeight = 0
  for (let i = 0; i < saveDATA.value.length; i++) {
    offsetHeight += getItemHeightFromCache(i)
    if (offsetHeight >= scrollTop) {
      startIndex = i
      break
    }
  }
  // 计算得出的渲染数据
  state.tableData = saveDATA.value.slice(startIndex, startIndex + props.virtualShowSize)
  // 缓存最新的列表项高度
  updateRenderedItemCache(startIndex)
  // 更新偏移值
  updateOffset(offsetHeight - getItemHeightFromCache(startIndex))
}
// 滚动事件
const handleScroll = (e: any) => {
  // 渲染正确的数据
  updateRenderData(e.target.scrollTop)
  // console.log("滚动事件---handleScroll")
}
// 移除滚动事件
onBeforeUnmount(() => {
  // console.log("移除滚动事件")
  if (props.useVirtual) {
    scrollContainerEl.value?.removeEventListener("scroll", handleScroll)
  }
})
onUpdated(() => {
  EPTable.value.doLayout()
})
// 默认选中（单选项）---index必须是大于等于1（且只能默认选中第一页的数据）
const defaultRadioSelect = (index: number | any) => {
  radioVal.value = index
  emits("radioChange", state.tableData[index - 1], radioVal.value)
}
// 行拖拽
const initSort = () => {
  if (!props.isRowSort) return
  const el = EPTableBox.value?.querySelector(".el-table__body-wrapper tbody")
  // console.log('3333', el)
  Sortable.create(el, {
    animation: 150, // 动画
    // handle: '.move', // 指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    // filter: '.disabled', // 指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
    // dragClass: 'dragClass', // 设置拖拽样式类名
    // ghostClass: 'ghostClass', // 设置拖拽停靠样式类名
    // chosenClass: 'chosenClass', // 设置选中样式类名
    onEnd: (evt: { oldIndex: any; newIndex: any }) => {
      const curRow = state.tableData.splice(evt.oldIndex, 1)[0]
      state.tableData.splice(evt.newIndex, 0, curRow)
      emits("rowSort", state.tableData)
    }
  })
}

// 单元格编辑是否存在校验
const isEditRules = computed(() => {
  return (
    (props.rules && Object.keys(props.rules).length > 0) ||
    props.columns.some((item: any) => item?.configEdit?.rules)
  )
})
// 所有列（表头数据）
const renderColumns = computed<EPTableProps["columns"]>(() => {
  if (state.columnSet.length === 0) {
    return props.columns
  }
  const columnByProp: any = props.columns.reduce((acc: any, cur: any) => {
    acc[cur.prop] = cur
    return acc
  }, {})
  return state.columnSet.filter((cur: any) => !cur.hidden).map((cur: any) => columnByProp[cur.prop])
})

// 判断是否是多级表头
const isTableHeader = computed(() => {
  return renderColumns.value.some((item: any) => item.children)
})

// forbidden取值（选择单选或取消单选）
// const isForbidden = () => {
//   forbidden.value = false
//   setTimeout(() => {
//     forbidden.value = true
//   }, 0)
// }
// 单选抛出事件radioChange
// const radioClick = (row: any, index: any) => {
//   forbidden.value = !forbidden.value
//   const isCurrentlySelected = radioVal.value === index
//   if (isCurrentlySelected) {
//     radioVal.value = null
//   } else {
//     radioVal.value = index
//   }
//   isForbidden()
//   emits("radioChange", radioVal.value ? row : null, radioVal.value)
// }

// 点击单选框单元格触发事件
// const radioHandleChange = (row: any, index: any) => {
//   if (row?.isRadioDisabled) return
//   if (props.rowClickRadio) {
//     return
//   }
//   radioClick(row, index)
// }
// 点击某行事件
// const rowClick = (row: any) => {
//   if (row.isRadioDisabled) return
//   if (!props.rowClickRadio) {
//     return
//   }
//   radioClick(row, state.tableData.indexOf(row) + 1)
// }

// 获取columnSet缓存数据
const reSetColumnSet = () => {
  return columnSetRef.value?.reSetColumnSet()
}
// 暴露方法出去
defineExpose(fun)
</script>
<style lang="scss" scoped>
.ep-table {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .table-content {
    flex: 1;
  }
  .el-pagination-com {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // 单选样式
  .radioStyle {
    :deep(tbody) {
      .el-table__row {
        cursor: pointer;
      }
    }
  }
}
</style>
