<!-- 排序 -->
<template>
  <div class="wrapper vp-raw">
    <P
      >table 设置
      sortable=true开启全部排序，部分排序可以在columns中设置，sortMethod自定义排序方法</P
    >
    <EPTable :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const data = ref<any>([])
const columns = ref([
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180", sortable: true, sortMethod: (a, b) => b - a },
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
  data.value = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    name: "@bscomp" + index,
    age: `${1 + index}`
  }))
})
</script>
<style scoped>
.wrapper {
  height: 350px;
  display: flex;
  flex-direction: column;
}
</style>
