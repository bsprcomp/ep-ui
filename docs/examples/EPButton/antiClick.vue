<template>
  <div class="wrapper">
    <p>默认500ms 通过time设置</p>
    <EPButton :anti-click="true" type="primary" :time="500" @click="handleClick" value="点击" />
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
