<template>
  <div class="wrapper vp-raw">
    <p v-for="item in checkList">
      {{ item }}
    </p>
    <EPTable :filterCheckList="v => v" v-model:check="checkList" :data="data" :columns="columns" />
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
  data.value = Array.from({ length: 2 }).map((_, index) => ({
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
  height: 250px;
  overflow: hidden;
}
</style>
