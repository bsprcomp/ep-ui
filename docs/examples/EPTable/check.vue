<template>
  <div class="wrapper vp-raw">
    <p>选中数：{{ checkList.length }}</p>
    <EPTable v-model:check="checkList" :data="data" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
const data = ref<any[]>([])
const checkList = ref([])
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

watch(checkList, () => {
  console.log(checkList.value, "checkList")
})
</script>
<style scoped>
.wrapper {
  height: 270px;
}
</style>
