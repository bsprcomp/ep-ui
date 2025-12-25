<template>
  <EPConfigProvider :input="inputConfig">
    <div class="wrapper">
      <EPInput v-model="test" />
      <EPInput v-model="test2" style="margin-top: 8px" type="textarea" />
    </div>
  </EPConfigProvider>
</template>

<script setup>
import { ref } from "vue"
const test = ref()
const test2 = ref()
const inputConfig = {
  defaultMaxlength: 20,
  textareaMaxlength: 200,
  showWordLimit: true,
  rows: 3
}
</script>
