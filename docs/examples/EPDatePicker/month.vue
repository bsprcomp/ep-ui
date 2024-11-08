<template>
  <div class="wrapper">
    <EPDatePicker placeholder="选择月份范围" v-model="date" type="monthrange" @change="change" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const date = ref()
const date1 = ref()

const change = value => {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
