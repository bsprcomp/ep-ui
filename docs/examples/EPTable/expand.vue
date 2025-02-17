<!-- 基础用法 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns">
      <template v-slot:expand="{ scope: { row } }">
        <div style="margin-left: 60px; background: #e3e3e3; padding: 16px">
          <p>姓名：{{ row.name }}</p>
          <p>年龄：{{ row.age }}</p>
          <p>身高{{ row.height }}</p>
        </div>
      </template>
    </EPTable>
  </div>
</template>

<script setup lang="ts">
import EPTable from "../../../packages/table/index"
import { onMounted, ref } from "vue"
const data = ref<any[]>([])
const columns = ref<any[]>([
  { type: "index" },
  { type: "selection" },
  { type: "expand" },
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" },
  {
    prop: "operation",
    label: "操作",
    width: 160,
    operation: [
      {
        label: "编辑",
        func: (row, scope) => {
          alert("编辑")
          edit(row, scope)
        }
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
const edit = (row, scope) => {
  console.log(row, scope)
}
const deleteRow = (row, scope) => {
  console.log(row, scope)
}
onMounted(() => {
  data.value = Array.from({ length: 2 }).map((_, index) => ({
    id: index,
    name: "@bscomp",
    height: "180px",
    age: 18
  }))
})
</script>
<style scoped>
.wrapper {
  height: 400px;
}
</style>
