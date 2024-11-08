<template>
  <div class="wrapper">
    <EPInput placeholder="请输入整数" inputType="integer" v-model="modelValue" @change="change" />
  </div>
</template>
<script setup lang="ts" name="Integer">
import { ref } from "vue"
const modelValue = ref<number>()
const change = (e: any) => {
  console.log("输出的值", e)
  console.log("v-model的值", modelValue.value)
}
</script>
<style>
.wrapper {
  padding: 16px;
}
</style>
