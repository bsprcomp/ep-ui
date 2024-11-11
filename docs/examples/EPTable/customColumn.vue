<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns">
      <template v-slot:operationCom="{ scope }"> 插槽渲染-{{ scope.row.name }} </template>
    </EPTable>
  </div>
</template>

<script setup lang="tsx">
import { createElementVNode, onMounted, ref } from "vue"
const data = ref<any[]>([])
const columns = [
  {
    minWidth: "800px",
    prop: "operation",
    label: "操作",
    fixed: "right",
    operation: [
      {
        label: "disabled禁止",
        disabled: true,
        func: (row, scope) => {}
      },
      {
        label: "isDisabled回调禁止",
        isDisabled: (row, scope) => row.id % 2 == 0,
        func: (row, scope) => {}
      },
      {
        label: "删除",
        func: (row, scope) => {
          alert("删除")
        }
      },
      {
        render: () => createElementVNode("span", { style: { color: "red" } }, "createElementVNode"),
        func: row => alert("createElementVNode渲染")
      },
      {
        render: () => <el-radio>JSX/TSX渲染</el-radio>,
        func: row => alert("JSX/TSX渲染")
      },
      {
        label: "插槽渲染",
        slotName: "operationCom",
        func: row => alert("插槽渲染")
      },
      {
        label: "是否显示",
        isVisible: (row, scope) => row.id % 2 == 0,
        func: row => alert("显示")
      }
    ]
  }
]

onMounted(() => {
  data.value = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    name: "@bscomp",
    age: 18 + index
  }))
})
</script>
<style scoped>
.wrapper {
  height: 400px;
}
</style>
