<!-- 仅对有prop属性且不为operation（操作列，序号，复选框等不要排序） -->
<template>
  <el-dropdown :trigger="columnBind.trigger" popper-class="column_set">
    <el-button v-if="columnBind.title" v-bind="columnBind">{{ columnBind.title }}</el-button>
    <el-button v-else v-bind="columnBind"></el-button>
    <template #dropdown>
      <el-dropdown-menu class="el-dropdown-menu">
        <el-dropdown-item class="el-dropdown-menu__item">
          <Draggable
            class="ep_table_column_setting_dropdown"
            v-model="state.columnSet"
            item-key="prop"
          >
            <template #item="{ element, index }">
              <el-checkbox
                class="el-checkbox"
                v-if="element.prop && element.prop !== 'operation'"
                :checked="!element.hidden"
                @click.native.stop
                :disabled="element.checkBoxDisabled"
                @change="(checked: any) => checkChanged(checked, index)"
                >{{ element.label }}</el-checkbox
              >
            </template>
          </Draggable>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="columnSet">
import Draggable from "vuedraggable"
import { watch, onMounted, reactive, computed } from "vue"
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  title: String,
  // 开启列拖拽，缓存唯一性标识
  name: String,
  menuConfig: {
    type: Object,
    default: () => ({})
  }
})
const columnBind = computed<any>(() => {
  return { trigger: "click", size: "default", icon: "Menu", ...props.menuConfig }
})
// 获取缓存数据
const getColumnSetCache = () => {
  let value: any = localStorage.getItem(`ep-ui:EPTable.columnSet-${props.name}`)
  let columnOption = initColumnSet()
  let valueArr = JSON.parse(value) || []
  columnOption.map(item => {
    let findEle = valueArr.find(
      (ele: { label: any; prop: any }) => ele.label === item.label && ele.prop === item.prop
    )
    item.hidden = findEle ? findEle.hidden : false
  })
  initColumnSet().map(val => {
    columnOption.map(item => {
      if (Object.hasOwn(val, "isShowHidden")) {
        if (val.label === item.label && val.prop === item.prop) {
          item.hidden = val.isShowHidden
        }
      }
    })
  })
  if (columnOption.length !== valueArr.length) {
    value = JSON.stringify(columnOption)
  }
  return value ? JSON.parse(value) : initColumnSet()
}
// 初始化
const initColumnSet = () => {
  const columnSet = props.columns.map((col: any, index) =>
    col.isShowHidden
      ? {
          label: col.label,
          prop: col.prop,
          hidden: true,
          checkBoxDisabled: false,
          isShowHidden: col.isShowHidden
        }
      : {
          label: col.label,
          prop: col.prop,
          checkBoxDisabled: false,
          hidden: false
        }
  )
  return columnSet
}

// 抛出事件
const emits = defineEmits(["columnSetting"])
const state: any = reactive({
  columnSet: []
})
onMounted(() => {
  state.columnSet = getColumnSetCache()
  emits("columnSetting", state.columnSet)
})
watch(
  () => state.columnSet,
  val => {
    emits("columnSetting", val)
    localStorage.setItem(`ep-ui:EPTable.columnSet-${props.name}`, JSON.stringify(val))
  },
  { deep: true }
)
// 重新赋值
const reSetColumnSet = () => {
  let value: any = localStorage.getItem(`ep-ui:EPTable.columnSet-${props.name}`)
  state.columnSet = JSON.parse(value)
  emits("columnSetting", state.columnSet)
}
// checkbox改变选中状态
const checkChanged = (checked: any, index: string | number) => {
  state.columnSet[index].hidden = !checked
  //  获取未隐藏col
  const noHiddenCol = state.columnSet.filter(
    item => !item.hidden && item.prop !== "operation" && !item.type
  )
  console.log(noHiddenCol, "state.columnSet")

  // 未隐藏数量小于2 禁止点击取消选中
  if (noHiddenCol.length < 2) {
    noHiddenCol[0].checkBoxDisabled = true
  } else {
    state.columnSet.forEach((element, index) => {
      if (!element.hidden) {
        state.columnSet[index].checkBoxDisabled = false
      }
    })
  }
}
defineExpose({
  reSetColumnSet
})
</script>
<style lang="scss">
.column_set {
  .el-dropdown-menu {
    padding: 0;
    font-size: 14px;

    .el-dropdown-menu__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .ep_table_column_setting_dropdown {
        display: flex;
        flex-direction: column;
        max-height: 450px;
        overflow-y: auto;
        .el-checkbox {
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .ep-checkbox__input.is-checked + .ep-checkbox__label {
            cursor: move;
          }
        }
      }
    }
  }
}
</style>
