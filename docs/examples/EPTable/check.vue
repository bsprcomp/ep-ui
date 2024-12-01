<template>
  <div class="wrapper vp-raw">
    <p>选中数：{{ checkedList.length }}</p>
    <EPTable
      :is-show-pagination="false"
      :is-show-menu="false"
      v-model:check="checkedList"
      :data="data"
      :columns="columns"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
const data = ref<any[]>([])
const checkedList = ref([])
const columns = ref([
  { type: "selection", width: "55" },
  { type: "index", width: "55", label: "序号" },
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" }
])
onMounted(() => {
  data.value = Array.from({ length: 4 }).map((_, index) => ({
    id: index,
    name: "@bscomp",
    age: 18
  }))
})

watch(checkedList, () => {
  console.log(checkedList.value, "checkList")
})
</script>
<style scoped>
.wrapper {
  height: 300px;
  display: flex;
  flex-direction: column;
}
</style>
