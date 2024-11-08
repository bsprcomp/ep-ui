<template>
  <div class="wrapper">
    <EPCheckbox v-model="modelValue" :options="options" @change="change" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const modelValue = ref([])
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 }
])
const change = v => {
  console.log(v, modelValue.value)
}
</script>
