<template>
  <div class="wrapper">
    <EPCheckbox v-model="value" :options="options" size="large" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const value = ref([])
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 }
])
</script>
