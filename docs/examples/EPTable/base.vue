<!-- 基础用法 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const data = ref<any>([])
const columns = ref([
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" },
  {
    prop: "operation",
    label: "操作",
    width: 160,
    operation: [
      {
        label: "编辑",
        fun: (row, index, data) => {
          alert("编辑")
          edit(row, index, data)
        }
      },
      {
        label: "删除",
        fun: (row, index, data) => {
          alert("删除")
          deleteRow(row, index, data)
        }
      }
    ]
  }
])
const edit = (row, index, data) => {
  console.log(row, index, data)
}
const deleteRow = (row, index, data) => {
  console.log(row, index, data)
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
