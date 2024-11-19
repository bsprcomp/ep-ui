<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <EPButton type="primary" value="新 增" @click="dialogVisible = true" />
    <EPDialog title="新增" hiddenCancelBtn hiddensubmitBtn v-model="dialogVisible">
      <template #content>
        <div class="content">
          <EPTable :columns="columns" :data="data" />
        </div>
      </template>
    </EPDialog>
  </div>
</template>
<script setup lang="tsx">
import { ref } from "vue"
const columns = [
  {
    prop: "test_1",
    label: "标题1"
  },
  {
    prop: "test_1",
    label: "标题2"
  }
]
const data = Array.from({ length: 10 }).fill({
  test_1: "测试",
  test_2: "测试"
})
const dialogVisible = ref(false)
</script>
<style>
.content {
  height: 200px;
}
</style>
