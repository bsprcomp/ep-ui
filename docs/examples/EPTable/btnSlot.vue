<!-- 按钮插槽 -->
<template>
  <div class="wrapper">
    <EPTable
      class="vp-raw"
      :data="data"
      :border="border"
      :columns="columns"
      :isShowPagination="false"
    >
      <template #button>
        <EPButton type="primary" value="新 增" @click="add" />
        <el-switch v-model="border" label="border" inactive-text="开启border" />
      </template>
    </EPTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
const border = ref(false)
const data = ref<any[]>([])
const add = () => {
  alert("新增")
}
const columns = computed(() => [
  { prop: "name", label: "姓名", minWidth: "100" },
  { prop: "age", label: "年龄", minWidth: "180" }
])
onMounted(() => {
  data.value = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    name: "@bscomp",
    age: 18
  }))
})
</script>
<style scoped>
.wrapper {
  height: 300px;
}
</style>
