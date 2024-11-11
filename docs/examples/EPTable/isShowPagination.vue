<template>
  <div class="wrapper vp-raw">
    <el-alert
      type="info"
      description="v-model:page 接收page变化 默认为current size total，total需要手动赋值。"
    />
    <EPTable
      size="small"
      :data="data"
      :columns="columns"
      v-model:page="page"
      :isShowPagination="true"
      @getData="getData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
// 初始化
const page = reactive({ size: 10, page: 1, total: 0 })
const data = ref<any[]>([])
// 模拟接口数据
const DATA = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  name: "@bscomp_" + index,
  age: 1 + index
}))
// 列
const columns = ref([
  { type: "index", label: "序号", width: "55" },
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" }
])
// page变化回调
const getData = () => {
  data.value = DATA.slice((page.page - 1) * page.size, page.page * page.size)
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
