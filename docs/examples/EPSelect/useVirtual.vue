<template>
  <div class="wrapper">
    <EPSelect
      placeholder="加载一万条"
      useVirtual
      v-model="selectValue"
      :options="options"
      width="50%"
      @change="change"
    />
  </div>
</template>
<script setup lang="ts" name="UseVirtual">
import { ref } from "vue"
const selectValue = ref<any>("")
const options = Array.from({ length: 10000 }).map((_, index) => ({
  label: `option_${index}`,
  value: index
}))
const change = (val: any) => {
  console.log("change", val, selectValue.value)
}
</script>
