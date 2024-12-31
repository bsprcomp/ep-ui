<template>
  <div class="wrapper">
    <EPInput placeholder="默认去除空格" v-model="modelValue1" />
    <EPInput placeholder="取消默认" inputType="default" v-model="modelValue2" />
  </div>
</template>
<script setup lang="ts" name="Integer">
import { ref } from "vue"
const modelValue1 = ref()
const modelValue2 = ref()
</script>
<style scoped>
.wrapper {
  display: flex;
  padding: 16px;
  gap: 12px;
}
</style>
