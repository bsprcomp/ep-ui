<template>
  <div class="wrapper">
    <el-switch v-model="isDebounce" size="large" active-text="开启防抖" inactive-text="关闭防抖" />
    <div style="display: flex; align-items: center">
      <EPInput width="50%" input-type="integer" v-model="time" />
    </div>
    <EPButton
      style="margin-top: 15px"
      :isDebounce="isDebounce"
      :time="time"
      type="primary"
      @click="exportExcel"
      >点击事件</EPButton
    >
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus"
import { ref } from "vue"
const time = ref(1000)
const isDebounce = ref(false)
const handleChange = val => {
  console.log("输入框的值：", val)
}
const exportExcel = () => {
  console.log("点击事件")
  ElMessage({
    message: "点击事件",
    type: "success"
  })
}
</script>
