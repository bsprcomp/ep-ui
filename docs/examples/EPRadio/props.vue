<template>
  <div class="wrapper">
    <EPRadio
      v-model="value"
      :options="options"
      :optionsProps="{ label: 'name', value: 'id', disabled: 'isSelected' }"
    />
  </div>
</template>
<script setup lang="ts" name="EPRadioProps">
import { ref } from "vue"
const value = ref("1")
const options = ref([
  { id: "1", name: "@bscomp", isSelected: false },
  { id: "2", name: "李四", isSelected: false },
  { id: "3", name: "王五", isSelected: true }
])
</script>
