<template>
  <div class="wrapper">
    <div class="content">
      <div>
        <EPDatePicker
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          :formatNullValue="[]"
          type="daterange"
          v-model="date"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
const size = ref("default")
const date = ref([])

watch(date, () => {
  console.log(date.value)
})
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100px;
}
</style>
