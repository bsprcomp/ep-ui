<template>
  <div class="wrapper">
    <EPSelect
      v-model="selectValue"
      :formatterLabel="o => `格式化（${o.label}）`"
      :options="options"
      width="50%"
      @change="change"
    />
  </div>
</template>
<script setup lang="ts" name="FormatterLabel">
import { ref } from "vue"

const selectValue = ref<any>("1")

const options = [
  {
    value: "1",
    label: "Option1"
  },
  {
    value: "2",
    label: "Option2"
  },
  {
    value: "3",
    label: "Option3"
  }
]
const change = (val: any) => {
  console.log("change", val, selectValue.value)
}
</script>
