<template>
  <div class="wrapper">
    <EPInput
      width="320px"
      placeholder="inputRule使用"
      :inputRule="inputRule"
      v-model="modelValue"
    />
  </div>
</template>
<script setup lang="ts" name="Integer">
import { ref } from "vue"
const modelValue = ref()
// 把 满足的条件的置空
const inputRule = /[^a-z]/g
</script>
