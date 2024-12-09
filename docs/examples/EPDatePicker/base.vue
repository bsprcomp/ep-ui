<template>
  <div class="wrapper">
    <div class="content">
      <div>
        <EPDatePicker v-model="date" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
const date = ref("2024-12-09")
watch(date, () => {
  console.log(date.value)
})
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100px;
}
</style>
