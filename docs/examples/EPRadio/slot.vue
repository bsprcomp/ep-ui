<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <h4>自定义单个选项插槽</h4>
        <EPRadio v-model="value" :options="options" size="large">
          <template #mySlot="scope">
            <div>自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}</div>
          </template>
        </EPRadio>
      </div>
      <div>
        <h4>默认插槽</h4>
        <EPRadio v-model="value2" :options="options2" size="large">
          <el-radio value="上海" />
          <el-radio value="北京" />
          <el-radio value="广州" />
          <el-radio value="深圳" />
        </EPRadio>
        <br />
        <EPRadio v-model="value2" :options="options2" size="large">
          <el-radio-button value="上海" />
          <el-radio-button value="北京" />
          <el-radio-button value="广州" />
          <el-radio-button value="深圳" />
        </EPRadio>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const value = ref("1")
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3, slot: "mySlot" }
])

const value2 = ref("1")
const options2 = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3, slot: "mySlot" }
])
</script>
