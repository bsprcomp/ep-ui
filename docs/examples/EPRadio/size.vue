<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <EPRadio v-model="value" :options="options" size="large" />
      </div>
      <div style="margin-top: 20px">
        <EPRadio v-model="value" :options="options" size="default" />
      </div>
      <div style="margin-top: 20px">
        <EPRadio v-model="value" :options="options" size="small" />
      </div>
      <div style="margin-top: 20px">
        <EPRadio v-model="value" :options="options" size="small" disabled />
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="EPRadioSize">
import { ref } from "vue"
const value = ref("1")
const options = ref([
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 }
])
</script>
