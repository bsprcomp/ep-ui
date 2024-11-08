<template>
  <div class="page">
    <el-radio-group v-model="size" aria-label="size control" size="small">
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>
    <EPInput placeholder="请输入内容" :size="size" v-model="value" />
  </div>
</template>
<script setup lang="ts" name="InputSize">
import { ref } from "vue"
const value = ref<any>()
const size = ref("default")
</script>
