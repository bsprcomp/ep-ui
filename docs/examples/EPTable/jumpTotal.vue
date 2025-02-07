<template>
  <div class="wrapper vp-raw">
    <EPTable
      :data="data"
      :columns="columns"
      v-model:page="page"
      :is-show-menu="false"
      :pageProps="pageProps"
      :isShowPagination="true"
      @getData="getData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
// 初始化
const page = reactive({ size: 15, page: 1, total: 0 })
const pageProps = {
  layout: "total,sizes,prev,jumpTotal,next",
  sizes: [15, 50, 100],
  background: false
}
const data = ref<any[]>([])
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
  data.value = DATA.slice((page.page - 1) * page.size, page.page * page.size)
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
