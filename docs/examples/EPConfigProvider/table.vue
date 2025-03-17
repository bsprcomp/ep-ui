<template>
  <EPConfigProvider :table="tableConfig">
    <div class="wrapper vp-raw">
      <EPTable
        :data="data"
        :columns="columns"
        v-model:page="page"
        :is-show-menu="false"
        @getData="getData"
      />
    </div>
  </EPConfigProvider>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
// 初始化
const page = reactive({ pageSize: 15, pageIndex: 1, total: 0 })
const tableConfig = {
  pageProps: {
    currentPage: "pageIndex",
    pageSize: "pageSize",
    pageSizes: [15, 30, 50, 100],
    background: true
  },
  border: true
}

const data = ref<any[]>([])
// 模拟接口数据
const DATA = Array.from({ length: 20 }).map((_, index) => ({
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
  data.value = DATA.slice((page.pageIndex - 1) * page.pageSize, page.pageIndex * page.pageSize)
  page.total = 20
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
