<template>
  <div class="e-p-table" ref="EPTableBox">
    <div class="table-content" ref="tableContent">
      <div ref="extraRef" class="header-wapper">
        <div class="extra" v-if="slots.extra">
          <slot name="extra"></slot>
        </div>
        <div class="header" v-if="slots.button || slots.input || isShowMenu">
          <div class="btn-wrapper">
            <slot name="button"><i></i></slot>
          </div>
          <div class="input-content">
            <slot name="input"></slot>
            <EPButton v-if="isShowRefresh" icon="Refresh" tip="刷新" @click="emits('getData')" />
            <!--列设置-->
            <column-set
              v-if="isShowMenu"
              :name="name"
              :menuConfig="menuConfig"
              :columns="columns"
              ref="columnSetRef"
              @columnSetting="v => (state.columnSet = v)"
            />
          </div>
        </div>
      </div>
      <el-table
        :max-height="height"
        ref="tableInstance"
        :data="state.tableData"
        @selection-change="selectionChange"
        @row-click="rowClick"
        :row-key="rowKey"
        highlight-current-row
        @sort-change="sortChange"
        v-bind="$attrs"
        v-loading="loading"
      >
        <!-- 主体内容 -->
        <template v-for="(item, index) in renderColumns">
          <template v-if="!item?.hidden">
            <el-table-column
              show-overflow-tooltip
              :key="index + 'i'"
              :sortable="item?.sortable || sortable"
              :index="index => indexMethod(index, item)"
              v-bind="{ align, ...item, renderHeader: undefined }"
            >
              <!-- 自定义header -->
              <template
                #header
                v-if="item?.renderHeader || item?.headerSlot || item?.headerRequired"
              >
                <!-- jsx -->
                <CustomRender
                  v-if="item?.renderHeader"
                  :column="item"
                  :render="item?.renderHeader"
                  :row="undefined"
                  :index="index"
                ></CustomRender>
                <div style="display: inline" v-if="item.headerRequired">
                  <span style="color: #f56c6c; font-size: 16px; margin-right: 3px">*</span>
                  <span>{{ item.label }}</span>
                </div>
                <!-- 插槽 -->
                <slot :scope="item" v-if="item?.headerSlot" :name="item.headerSlot"></slot>
              </template>
              <!-- 一般列 -->
              <template
                v-slot="scope"
                v-if="!item?.type && item?.prop !== 'operation' && !item?.formatter"
              >
                <!-- 可编辑 -->
                <template v-if="item?.inputType && editRowKey == scope.row[rowKey]">
                  <CustomRender
                    v-if="item?.renderEdit"
                    v-bind="{ ...item }"
                    :render="item?.renderEdit"
                    v-model="scope.row[`${item.editKey || item?.prop}EditValue`]"
                  />
                  <template v-if="item.editSlotName">
                    <slot :name="item.editSlotName" />
                  </template>
                  <RowEdit
                    v-else
                    v-bind="item"
                    :type="item.inputType"
                    v-model="scope.row[`${item.editKey || item?.prop}EditValue`]"
                  />
                </template>
                <!-- 不可编辑 -->
                <template v-else>
                  <!-- render渲染 -->
                  <template v-if="item?.render">
                    <CustomRender :row="scope.row" :render="item?.render" :index="scope.$index" />
                  </template>
                  <!-- 自定义插槽 -->
                  <template v-else-if="item?.slotName">
                    <slot :name="item?.slotName" :scope="scope"></slot>
                  </template>
                  <!-- 链接 -->
                  <template v-else-if="item?.isLink">
                    <el-button type="primary" link @click="linkTo(scope.row, item.query, item.path)"
                      >{{ scope.row[item?.prop as any] }}
                    </el-button>
                  </template>
                  <template v-else>
                    {{ scope.row[item?.prop as any] }}
                  </template>
                </template>
              </template>
              <!-- 展开列 -->
              <template v-slot="scope" v-if="item?.type === 'expand'">
                <slot name="expand" :scope="scope"></slot>
                <!-- render渲染 -->
                <template v-if="item?.render">
                  <CustomRender :row="scope.row" :render="item?.render" :index="scope.$index" />
                </template>
              </template>
              <!-- 操作列 -->
              <template v-slot="scope" v-if="item?.prop == 'operation'">
                <template v-if="editRowKey !== undefined">
                  <template v-if="scope.row[rowKey] == editRowKey">
                    <el-Button link type="primary" @click="handleRowEditSave(scope.row)"
                      >保存</el-Button
                    >
                    <el-Button link @click="handleRowEditCancel()">取消</el-Button>
                  </template>
                </template>
                <template v-else v-for="(op, index) in item.operation" :key="index">
                  <template v-if="!(op.isVisible && op.isVisible(scope.row, scope.$index))">
                    <el-popconfirm
                      v-if="op.isShowConfirm"
                      :title="item.msg || '确认删除？'"
                      @confirm="handleRowClick(scope.row, op, scope)"
                    >
                      <template #reference>
                        <EPButton
                          v-bind="{
                            type: 'primary',
                            link: true,
                            ...op
                          }"
                          :disabled="
                            op.disabled ||
                            (op?.isDisabled && op.isDisabled(scope.row, scope.$index))
                          "
                        >
                          {{ op.label }}
                        </EPButton>
                      </template>
                    </el-popconfirm>
                    <EPButton
                      v-else
                      @click="handleRowClick(scope.row, op, scope)"
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
                        <CustomRender
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
                    </EPButton>
                  </template>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
        <slot></slot>
        <!-- 操作按钮 -->
      </el-table>
    </div>
    <!-- 分页器 -->
    <el-pagination
      class="el-pagination-com"
      v-if="isShowPagination"
      v-model:current-page="page[newPageProps.currentPage]"
      v-model:page-size="page[newPageProps.pageSize]"
      :total="page.total"
      :page-sizes="newPageProps.pageSizes"
      :layout="newPageProps.layout"
      :background="newPageProps.background"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      v-bind="{ size: $attrs.size, ...bindPageProps }"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script setup lang="ts" name="EPTable">
import { ElMessage, type TableInstance } from "element-plus"
import { useRemainingHeight } from "../../hook"
import {
  computed,
  ref,
  watch,
  useSlots,
  reactive,
  onUpdated,
  VNode,
  onMounted,
  nextTick
} from "vue"
import useHooks from "./useHooks"

import ColumnSet from "./ColumnSet.vue"
import CustomRender from "./CustomRender.vue"
import RowEdit from "./RowEdit.vue"
import EPButton from "../../button"

import { useRoute, useRouter } from "vue-router"

// 分页设置
const page = defineModel<Record<string, any>>("page", {
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
const tableInstance = ref<TableInstance>()

interface Props {
  loading?: boolean
  name?: string
  rowKey?: string
  filterCheckList?: (list: any[]) => any
  isShowMenu?: boolean
  refreshTitle?: string
  // table所需数据
  data: any[]
  rowClick?: (row: any) => void
  // 表头数据
  columns: {
    type?: "index" | "selection" | "expand" | string
    prop?: string
    label?: string
    width?: string | number
    minWidth?: string | number
    isLink?: boolean
    slotName?: string
    hiddenMenu?: boolean
    hiddenAll?: boolean
    hidden?: boolean
    render?: Function
    [x: string]: any
    operation?:
      | {
          label?: string
          width?: string
          isVisible?: (row: any, index: number) => boolean
          operationType?: "rowEdit"
          func: Function
          disabled?: boolean
          isDisabled?: (row: any, index: number) => boolean
          slotName?: string
          render?: (row: any) => VNode
          isShowConfirm?: boolean
          msg?: boolean
        }[]
      | []
      | undefined
  }[]
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
  isShowRefresh?: boolean
  ascs?: string
  descs?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  refreshTitle: "刷新",
  rowKey: "id",
  isShowMenu: false,
  pageProps: () => ({}),
  extra: 0,
  isShowPagination: true,
  isShowRefresh: false,
  ascs: "ascs",
  descs: "descs"
})
const emits = defineEmits(["sort", "getData", "rowSort", "editSave", "editCancel"])
const {
  editRowKey,
  handleRowClick,
  handleRowEditSave,
  handleRowEditCancel,
  newPageProps,
  bindPageProps
} = useHooks(props, emits)
const route = useRoute()
const router = useRouter()
const tableContent = ref()
const extraRef = ref()
//  剩余高度计算
const { height } = useRemainingHeight(tableContent, props.extra, extraRef)

// 初始化数据
let state = reactive<any>({
  tableData: props.data,
  columnSet: []
})
// 获取e-p-table ref
const EPTableBox = ref<HTMLElement | any>(null)
// 获取columnSet Ref
const columnSetRef = ref<HTMLElement | any>(null)
// link类型跳转
const linkTo = (row, query = { name: 22 }, path) => {
  if (route.path || path) {
    router.push({
      path: `/${route.path}/${row[props.rowKey]}` || path,
      query
    })
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

// 获取所有插槽
const slots = useSlots()
watch(
  () => props.data,
  val => {
    state.tableData = val
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
    sortParam.value = { [order == "ascending" ? props.ascs : props.descs]: prop }
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

onUpdated(() => {
  tableInstance.value?.doLayout()
})

// 所有列（表头数据）
const renderColumns = computed<Props["columns"]>(() => {
  if (state.columnSet.length === 0) {
    return props.columns
  }
  const columnByProp: any = props.columns.reduce((acc: any, cur: any) => {
    acc[cur.prop] = cur
    return acc
  }, {})

  return state.columnSet
    .filter((cur: any) => !cur.hidden && !cur.hiddenAll)
    .map((cur: any) => {
      const { hidden, ...res } = columnByProp[cur.prop]
      return res
    })
})

defineExpose({ tableInstance })
onMounted(() => {
  if (props.isShowMenu && !props.name) {
    ElMessage.warning("警告：table开启列设置需要设置name，name值在整个项目唯一")
  }
  // 默认勾选已选中列表
  nextTick(() => {
    state.tableData.forEach(item => {
      if (check.value.some(key => key == item[props.rowKey])) {
        tableInstance.value?.toggleRowSelection(item)
      }
    })
  })
})
</script>
<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
.e-p-table {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .table-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    .header-wapper {
      display: flex;
      flex-direction: column;
    }
    .extra {
      padding-bottom: 16px;
    }
    .header {
      padding-bottom: 16px;
    }
  }
  .el-pagination-com {
    padding-top: 16px;
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
.btn-wrapper,
.input-content {
  display: flex;
  gap: 8px;
  ::v-deep(.el-button + .el-button) {
    margin-left: 0 !important;
  }
}
</style>
