<!-- 排序 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable
      :data="data"
      :columns="columns"
      v-model:sortParam="sortParam"
      descs="customDescs"
      @getData="getData"
      @sort="sort"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
const data = ref<any[]>([])
const sortParam = ref<any>({}) //例如name开启后 升序 为 ascs:"name" 降序为 descs:"name"
const columns = ref([
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180", sortable: "custom" },
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
const getData = () => {
  // 处理后端排序
  console.log(sortParam.value, "sortParam")
  data.value = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    name: "@bscomp" + index,
    age: `${1 + index}`
  }))
}
// 也可以自行监听
const sort = data => {
  console.log(data, "监听sort====")
  // 处理逻辑
}
onMounted(() => {
  getData()
})
</script>
<style scoped>
.wrapper {
  height: 350px;
  display: flex;
  flex-direction: column;
}
</style>
