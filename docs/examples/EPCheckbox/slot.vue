<template>
  <div class="wrapper">
    <h4>自定义单个选项插槽</h4>
    <EPCheckbox v-model="value" :options="options" size="large">
      <template #mySlot="scope">
        <div>自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}</div>
      </template>
    </EPCheckbox>
  </div>
  <div>
    <h4>默认插槽</h4>
    <EPCheckbox v-model="value2" :options="options2" size="large">
      <el-checkbox value="上海" />
      <el-checkbox value="北京" />
      <el-checkbox value="广州" />
      <el-checkbox value="深圳" />
    </EPCheckbox>
    <br />
    <EPCheckbox v-model="value2" :options="options2" size="large">
      <el-checkbox-button value="上海" />
      <el-checkbox-button value="北京" />
      <el-checkbox-button value="广州" />
      <el-checkbox-button value="深圳" />
    </EPCheckbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
const value = ref([])
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3, slot: "mySlot" }
])

const value2 = ref([])
const options2 = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3, slot: "mySlot" }
])
</script>
