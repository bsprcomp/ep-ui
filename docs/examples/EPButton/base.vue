<template>
  <div class="wrapper">
    使用value: <EPButton type="primary" @click="handleClick" value="点击" />
    <ElDivider />
    使用slot:
    <EPButton type="info" @click="handleClick">
      <span>slot</span>
    </EPButton>
    <ElDivider />
    <p>
      <EPButton plain type="primary" value="plain" />
      <EPButton round type="primary" value="round" />
    </p>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus"
const handleClick = () => {
  ElMessage({
    message: "点击事件",
    type: "success"
  })
}
</script>
