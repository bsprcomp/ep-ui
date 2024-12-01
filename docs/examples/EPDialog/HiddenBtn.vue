<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <EPButton type="primary" value="查看详情" @click="dialogVisible = true" />
    <EPDialog title="详情" hiddenCancelBtn hiddensubmitBtn v-model="dialogVisible">
      <template #content>
        <div class="content">
          <EPTable
            :columns="columns"
            :data="data"
            :pageProps="{ layout: 'prev, pager, next', background: false }"
            v-model:page="page"
          />
        </div>
      </template>
    </EPDialog>
  </div>
</template>
<script setup lang="tsx">
const page = reactive({
  page: 1,
  total: 10
})
import { reactive, ref } from "vue"
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
