<!-- 基础用法 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns" @editSave="editSave" @editCancel="editCancel">
      <template v-slot:customInput="{ scope }">
        <el-input v-model="scope.row['test_5' + 'EditValue']" />
      </template>
    </EPTable>
  </div>
</template>

<script setup lang="tsx">
import EPTable from "../../../packages/table/index"
import { ElCheckbox } from "element-plus"
import { computed, onMounted, ref } from "vue"
const data = ref<any[]>([])
const selectOptions = ref([
  { label: "类型_1", value: "1" },
  { label: "类型_2", value: "2" },
  { label: "类型_3", value: "3" }
])
const columns = computed<any[]>(() => [
  {
    prop: "test_1",
    label: "input",
    minWidth: "200",
    inputType: "EPInput",
    config: {
      type: "number"
    }
  },
  {
    prop: "test_2",
    label: "EPRadio",
    minWidth: "200",
    inputType: "EPRadio",
    render: ({ test_2 }) => {
      return test_2 ? "是" : "否"
    },
    options: [
      { value: 1, label: "是" },
      { value: 0, label: "否" }
    ]
  },
  {
    prop: "test_3",
    // editKey: "gradeId", // 可通过editKey映射实际编辑字段
    label: "EPSelect",
    inputType: "EPSelect",
    minWidth: "200",
    render: ({ test_3 }) => {
      return selectOptions.value.find(it => it.value == test_3)?.label
    },
    options: selectOptions.value
  },
  {
    prop: "test_4",
    label: "EPDatePicker",
    minWidth: "220",
    inputType: "EPDatePicker"
  },
  {
    prop: "test_5",
    label: "custom(editSlotName)",
    width: "220",
    inputType: "custom",
    editSlotName: "customInput"
  },
  {
    prop: "test_6",
    label: "custom(renderEdit)",
    width: "200",
    inputType: "custom",
    renderEdit: row => (
      <ElCheckbox
        onChange={v => {
          row["test_6EditValue"] = v
        }}
      >
        是
      </ElCheckbox>
    )
  },

  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 120,
    operation: [
      {
        label: "编辑",
        operationType: "rowEdit"
      },
      {
        label: "删除",
        func: (row, scope) => {
          alert("删除")
          deleteRow(row, scope)
        }
      }
    ]
  }
])
const editSave = row => {
  console.log(row)
}
const editCancel = () => {
  console.log("取消")
}
const deleteRow = (row, scope) => {
  console.log(row, scope)
}
onMounted(() => {
  data.value = Array.from({ length: 2 }).map((_, index) => ({
    id: index,
    test_1: "@bscomp",
    test_2: true,
    test_3: "类型_1",
    test_4: "check_2",
    test_5: "一年级"
  }))
})
</script>
<style scoped>
.wrapper {
  height: 200px;
}
</style>
