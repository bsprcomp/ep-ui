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
    minWidth: "960px",
    prop: "operation",
    label: "操作",
    fixed: "right",
    operation: [
      {
        label: "disabled(boolean)",
        disabled: true,
        func: (row, scope) => {}
      },
      {
        label: "disabled(回调函数)",
        disabled: (row, scope) => row.id % 2 == 0,
        func: (row, scope) => {}
      },
      {
        render: () => createElementVNode("span", { style: { color: "red" } }, "createElementVNode"),
        func: (row, scope) => {}
      },
      {
        render: () => <b>JSX/TSX渲染</b>,
        func: (row, scope) => {}
      },
      {
        label: "插槽渲染",
        slotName: "operationCom",
        func: (row, scope) => {}
      },
      {
        label: "hidden(boolean)",
        hidden: false,
        func: (row, scope) => {}
      },
      {
        label: "hidden(回调函数)",
        hidden: (row, scope) => row.id % 2 == 0,
        func: (row, scope) => {}
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
  height: 300px;
}
</style>
