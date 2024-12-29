<!-- 基础用法 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns" @editSave="editSave">
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
const params = ref({ test_5: "" })
const data = ref<any[]>([])
const selectOptions = ref([
  { label: "类型_1", value: "类型_1" },
  { label: "类型_2", value: "类型_2" },
  { label: "类型_2", value: "类型_2 " }
])
const columns = computed<any[]>(() => [
  { prop: "test_1", label: "input", minWidth: "200", inputType: "input" },
  {
    prop: "test_2",
    label: "radio",
    minWidth: "130",
    inputType: "radio",
    options: [
      { value: 1, label: "是" },
      { value: 0, label: "否" }
    ]
  },
  {
    prop: "test_3",
    editKey: "gradeId", // 可通过editKey映射实际编辑字段
    label: "select",
    inputType: "select",
    minWidth: "180",
    options: selectOptions.value
  },
  {
    prop: "test_4",
    label: "date-picker",
    width: "250",
    inputType: "date-picker"
  },
  {
    prop: "test_5",
    label: "custom(editSlotName)",
    width: "200",
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
