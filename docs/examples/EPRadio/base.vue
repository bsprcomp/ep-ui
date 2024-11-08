<template>
  <div class="wrapper">
    <EPRadio v-model="value" :options="options" />
  </div>
</template>
<script setup lang="ts" name="EPRadioBase">
import { ref } from "vue"
const value = ref("1")
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 }
])
</script>
