<!-- 自定义表头 -->
<template>
  <div class="wrapper vp-raw">
    <EPTable :data="data" :columns="columns">
      <template v-slot:testSlot="{ scope }"> 插槽 {{ scope.label }} </template>
    </EPTable>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, ref } from "vue"
const data = ref<any[]>([])
const columns = ref<any[]>([
  {
    prop: "test_1",
    label: "自定义",
    renderHeader: (column, index) => {
      console.log(column, index, "column, index")
      return <span style="color:red">renderHeader{column.label}</span>
    },
    minWidth: "100"
  },
  {
    prop: "test_1",
    label: "自定义",
    minWidth: "100",
    headerSlot: "testSlot"
  }
])

onMounted(() => {
  data.value = Array.from({ length: 2 }).map((_, index) => ({
    test_1: "renderHeader自定义",
    test_2: "插槽自定义"
  }))
})
</script>
<style scoped>
.wrapper {
  height: 200px;
}
</style>
