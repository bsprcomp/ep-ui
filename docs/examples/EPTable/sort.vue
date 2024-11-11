<!-- 排序 -->
<template>
  <div class="wrapper vp-raw">
    <p>
      table 设置 sortable=true开启全部排序，部分排序可以在columns中设置，sortMethod自定义排序方法
    </p>
    <EPTable :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const data = ref<any[]>([])
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
