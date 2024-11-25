<!-- 仅对有prop属性且不为operation（操作列，序号，复选框等不要排序） -->
<template>
  <el-dropdown :trigger="columnBind.trigger" popper-class="column_set">
    <el-button v-if="columnBind.title" v-bind="columnBind">{{ columnBind.title }}</el-button>
    <el-button v-else v-bind="columnBind"></el-button>
    <template #dropdown>
      <el-dropdown-menu class="el-dropdown-menu">
        <template #default>
          <Draggable
            class="ep_table_column_setting_dropdown"
            v-model="state.columnSet"
            item-key="prop"
          >
            <template #item="{ element, index }">
              <div class="item">
                <el-checkbox
                  class="el-checkbox"
                  v-if="
                    !['index', 'selection', 'expand', 'default'].includes(element.type) &&
                    element.prop !== 'operation' &&
                    isShow &&
                    !element.hiddenMenu &&
                    !element.hiddenAll
                  "
                  :checked="!element.hidden"
                  @click.native.stop
                  :disabled="element.checkBoxDisabled"
                  @change="(checked: any) => checkChanged(checked, index)"
                  >{{ element.label }}</el-checkbox
                >
              </div>
            </template>
            <template #footer>
              <slot name="footer">
                <el-button class="footer" link @click="reSetColumnSet"> 重置 </el-button>
              </slot>
            </template>
          </Draggable>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="columnSet">
import Draggable from "vuedraggable"
import { watch, onMounted, computed, ref, nextTick } from "vue"
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
const isShow = ref(true)
const columnBind = computed<any>(() => {
  return { trigger: "click", size: "default", icon: "Menu", ...props.menuConfig }
})

// 获取实际显示列
const disabledHiddenCol = () => {
  const noHiddenCol = state.value.columnSet.filter(element => {
    return (
      !["index", "selection", "expand", "default"].includes(element.type) &&
      element.prop !== "operation" &&
      !element.hiddenAll &&
      !element.hidden
    )
  })
  // 未隐藏数量小于2 禁止点击取消选中
  if (noHiddenCol.length < 2 && noHiddenCol.length > 0) {
    noHiddenCol[0].checkBoxDisabled = true
  } else {
    noHiddenCol.forEach((_, index) => {
      noHiddenCol[index].checkBoxDisabled = false
    })
  }
}

// 获取缓存数据
const getColumnSetCache = () => {
  let columnOption = JSON.parse(JSON.stringify(props.columns))
  let obj: any = localStorage.getItem(`column:${props.name}`)
  if (obj == "{}" || !obj) {
    return columnOption
  }
  let propMap = JSON.parse(obj) || {}
  if (columnOption.length !== Object.entries(propMap).length) {
    return columnOption
  }

  const columnByProp: any = columnOption.reduce((acc: any, cur: any) => {
    acc[cur.prop || cur.type] = cur
    return acc
  }, {})

  return Object.entries(propMap).map(([prop, hidden]) => {
    return { ...columnByProp[prop], hidden: !!hidden }
  })
}

// 抛出事件
const emits = defineEmits(["columnSetting"])
const state: any = ref({
  columnSet: []
})
const setItem = obj => {
  if (JSON.stringify(obj) === "{}") {
    if (localStorage.getItem(`column:${props.name}`)) {
      localStorage.removeItem(`column:${props.name}`)
    }
  } else {
    localStorage.setItem(`column:${props.name}`, JSON.stringify(obj))
  }
}
onMounted(() => {
  state.value.columnSet = getColumnSetCache()
  nextTick(() => {
    disabledHiddenCol()
  })
  emits("columnSetting", state.value.columnSet)
})
watch(
  () => state.value.columnSet,
  val => {
    emits("columnSetting", val)
    const obj = (val || []).reduce((acc, curr) => {
      if (curr.prop || curr.type) {
        acc[curr.prop || curr.type] = !!curr.hidden
      }
      return acc
    }, {})
    setItem(obj)
  },
  { deep: true }
)
// 重置
const reSetColumnSet = () => {
  setItem({})
  isShow.value = false
  state.value.columnSet = getColumnSetCache()
  nextTick(() => {
    isShow.value = true
  })

  emits("columnSetting", state.value.columnSet)
}
// checkbox改变选中状态
const checkChanged = (checked: any, index: string | number) => {
  state.value.columnSet[index].hidden = !checked
  disabledHiddenCol()
}
defineExpose({
  reSetColumnSet
})
</script>
<style lang="scss">
.column_set {
  .ep_table_column_setting_dropdown {
    font-size: 14px;
    .item {
      padding: 0 16px;
      &:hover {
        background-color: #ecf5ff;
      }
    }
    .footer {
      box-sizing: border-box;
      padding-top: 6px;
      border-top: 1px solid #dcdfe6;
      &:hover {
        border-top: 1px solid #dcdfe6;
      }
      .el-button {
        border-radius: none;
      }
    }
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
</style>
