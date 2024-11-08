<template>
  <div class="wrapper">
    <EPSelect
      width="50%"
      isShowSelectAllBtn
      multiple
      v-model="selectValue"
      :options="options"
      @change="change"
    />
  </div>
</template>
<script setup lang="ts" name="ShowSelectAllBtn">
import { ref } from "vue"

const selectValue = ref<any>([])
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
