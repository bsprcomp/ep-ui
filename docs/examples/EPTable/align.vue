<template>
  <div class="wrapper vp-raw">
    <el-radio-group v-model="align" size="small" style="margin-bottom: 15px">
      <el-radio-button value="left">左对齐</el-radio-button>
      <el-radio-button value="center">居中</el-radio-button>
      <el-radio-button value="right">右对齐</el-radio-button>
    </el-radio-group>
    <EPTable :table="table" :align="align" :columns="table.columns" :isShowPagination="false">
      <template #toolbar>
        <el-button size="default" type="danger" @click="setDateLeft"
          >点击{{ setDate }}左对齐</el-button
        >
      </template>
    </EPTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const align = ref("center")
const setDate = ref("设置日期")
const setName = ref("设置姓名")
const table = ref<TableTypes.Table>({
  border: true,
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "@bscomp",
      status: "2",
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "@bscomp1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      name: "@bscomp1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "@bscomp1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100", align: "" },
    { prop: "date", label: "日期", minWidth: "180", align: "" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
// 设置日期左对齐
const setDateLeft = () => {
  table.value.columns.forEach(item => {
    if (item.prop === "date") {
      if (item.align == "left") {
        item.align = ""
        setDate.value = "设置日期"
      } else {
        setDate.value = "取消日期"
        item.align = "left"
      }
    }
  })
}
// 设置姓名右对齐
const setNameRight = () => {
  table.value.columns.forEach(item => {
    if (item.prop === "name") {
      if (item.align == "right") {
        item.align = ""
        setName.value = "设置姓名"
      } else {
        setName.value = "取消姓名"
        item.align = "right"
      }
    }
  })
}
</script>
