<!-- 基础用法 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
const data = ref<any[]>([])
const columns = ref<any[]>([
  {
    prop: "name",
    label: "姓名",
    minWidth: "100"
  },
  { prop: "age", label: "年龄", minWidth: "180" },
  {
    prop: "operation",
    label: "操作",
    width: 160,
    operation: [
      // 继承EPButton 所有属性 默认link为true
      {
        label: "编辑",
        func: (row, scope) => {
          alert("编辑")
          edit(row, scope)
        }
      },
      {
        label: "删除",
        antiClick: true, // 开启防抖
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
    age: 18
  }))
})
</script>
<style scoped>
.wrapper {
  height: 200px;
}
</style>
