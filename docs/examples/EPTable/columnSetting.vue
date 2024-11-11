<!-- 列设置 -->
<template>
  <div class="wrapper vp-raw">
    <el-text type="primary">默认显示 </el-text>
    <EPTable name="columnSetting" border isShowMenu :data="data" :columns="columns" />
    <el-divider />
    <el-text type="primary">自定义 </el-text>
    <EPTable
      name="columnSetting2"
      border
      isShowMenu
      :data="data"
      :columns="columns"
      :menuConfig="{ icon: 'Setting', type: 'primary', title: '列设置' }"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
const data = ref<any[]>([])
const columns = ref([
  { prop: "name", label: "姓名", isShowHidden: true },
  { prop: "age", label: "年龄" },
  {
    prop: "operation",
    label: "操作",
    width: 120,
    operation: [
      {
        label: "编辑",
        func: (row, scope) => {
          edit(row, scope)
        }
      },
      {
        label: "删除",
        func: (row, scope) => {
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
  height: 600px;
  display: flex;
  flex-direction: column;
}
</style>
