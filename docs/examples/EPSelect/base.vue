<template>
  <div class="wrapper">
    <EPSelect v-model="selectValue" :options="options" @change="change" width="200px" />
  </div>
</template>
<script setup lang="ts" name="BaseEPSelect">
import { ref } from "vue"
const selectValue = ref<any>("")
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
