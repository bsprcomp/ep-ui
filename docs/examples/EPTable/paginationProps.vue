<template>
  <div class="wrapper vp-raw">
    <el-alert type="info" description="pageProps使用" />
    <EPTable
      size="small"
      :data="data"
      :columns="columns"
      v-model:page="page"
      :pageProps="pageProps"
      :isShowPagination="true"
      @getData="getData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
// 初始化
const page = reactive({ pageSize: 15, pageIndex: 1, total: 0 })
const pageProps = {
  currentPage: "pageIndex",
  currentSize: "pageSize",
  layout: "prev, pager, next",
  pageSizes: [15, 50, 100],
  background: false
}
const data = ref<any>([])
// 模拟接口数据
const DATA = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  name: "@bscomp_" + index,
  age: 1 + index
}))
// 列
const columns = ref([
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" }
])
// page变化回调
const getData = () => {
  console.log(page, "page")
  data.value = DATA.slice((page.pageIndex - 1) * page.pageSize, page.pageIndex * page.pageSize)
  page.total = 100
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.wrapper {
  height: 400px;
  display: flex;
  flex-direction: column;
}
</style>
