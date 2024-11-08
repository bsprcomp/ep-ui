<template>
  <div class="wrapper vp-raw">
    <el-alert
      type="info"
      description="columns中设置type:'index'开启索引，索引在isShowPagination为true的情况下，还原默认设置index:undefined"
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
const data = ref<any>([])
// 模拟接口数据
const DATA = Array.from({ length: 100 }).map((_, index) => ({
  id: +Date.now() + index,
  name: "@bscomp_" + index,
  age: 1 + index
}))

// 列
const columns = ref([
  { type: "index", label: "序号（默认）", minWidth: "140" },
  { type: "index", label: "序号（还原）", minWidth: "140", index: undefined },
  {
    type: "index",
    label: "序号（index自定义）",
    width: "140",
    index: index => index % 2 == 0 && index + 1
  }
])
// page变化回调
const getData = () => {
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
