<!--
  完整示例
     is-show-menu需要配合name使用，设置唯一table名称，用于lolocalStorage缓存key（下拉菜单可拖拽排序）
 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable
      v-model:page="page"
      :data="data"
      :columns="columns"
      @getData="getData"
      size="small"
      name="TestTable"
    >
      <!-- 表额外插槽，单独一行，自行处理样式 -->
      <template #extra><span style="font-weight: 700"> 我是EPTable</span> </template>
      <!-- 预留button插槽,置于列表左侧，如渲染新增、批量删除等按钮  antiClick 开启防抖loading-->
      <template #button>
        <EPButton value="新 增" type="primary" antiClick @click="add" />
        <EPButton value="批量删除" @click="batchDelete" />
      </template>
      <!-- 预留input插槽 ，可以放置搜索框等 -->
      <template #input>
        <!-- antiClick 开启点击loading -->
        <EPInput placeholder="请输入姓名" />
      </template>
    </EPTable>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref } from "vue"
const page = reactive({ size: 10, page: 1, total: 0 })
const data = ref<any[]>([])
// 模拟数据
const DATA = Array.from({ length: 20 }).map((_, index) => ({
  id: index,
  name: "@bscomp_" + index,
  age: 1 + index,
  address: "南京"
}))
const columns = ref<any[]>([
  {
    prop: "name",
    label: "姓名"
  },
  { prop: "age", label: "年龄" },
  { prop: "address", label: "地址" },
  {
    prop: "operation",
    label: "操作",
    width: 120,
    operation: [
      // 继承EPButton 所有属性 默认link为true
      {
        label: "编辑",
        func: (row, scope) => {
          edit(row, scope)
        }
      },
      {
        label: "删除",
        antiClick: true, // 开启防抖
        func: (row, scope) => {
          deleteRow(row, scope)
        }
      }
    ]
  }
])
const batchDelete = () => {
  console.log("批量删除")
}
const add = () => {
  console.log("新增")
}
const edit = (row, scope) => {
  console.log(row, scope)
}
const deleteRow = (row, scope) => {
  console.log(row, scope)
}
// page变化回调
const getData = () => {
  console.log("getData")
  data.value = DATA.slice((page.page - 1) * page.size, page.page * page.size)
  page.total = 20
}
onMounted(() => {
  getData()
})
</script>
<style scoped>
.wrapper {
  height: 400px;
  overflow: hidden;
}
</style>
