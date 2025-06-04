<template>
  <div class="wrapper vp-raw">
    <EPTable
      size="small"
      :is-show-menu="false"
      v-model:check="checkedList"
      :data="data"
      :columns="columns"
      v-model:page="page"
      :isShowPagination="true"
      @getData="getData"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from "vue"
const loading = ref(true)
const timer = ref()
const checkedList = ref([1, 3, 5, 7, 13])
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
  { type: "selection", width: "55" },
  { type: "index", label: "序号", width: "55" },
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" }
])
// page变化回调
const getData = () => {
  loading.value = true
  timer.value = setTimeout(() => {
    loading.value = false
    data.value = DATA.slice((page.page - 1) * page.size, page.page * page.size)
    page.total = 20
  }, 200)
}
onMounted(() => {
  getData()
})
onUnmounted(() => {
  clearTimeout(timer.value)
})
</script>
<style lang="scss" scoped>
.wrapper {
  height: 400px;
  display: flex;
  flex-direction: column;
}
</style>
