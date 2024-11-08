<template>
  <div class="wrapper">
    <div>
      <el-checkbox v-model="params.collapseTags" label="collapseTags" />
      <el-checkbox v-model="params.collapseTagsTooltip" label="collapseTagsTooltip" />
    </div>
    <EPSelect
      v-bind="params"
      multiple
      v-model="selectValue"
      :options="options"
      width="50%"
      @change="change"
    />
  </div>
</template>
<script setup lang="ts" name="MultipleSelect">
import { reactive, ref } from "vue"
const selectValue = ref<any>(["1", "2"])
const params = reactive({
  //多选是否文字格式展示
  collapseTags: true,
  //当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
  collapseTagsTooltip: false
})
const options = [
  {
    value: "1",
    label: "Option1"
  },
  {
    value: "2",
    label: "Option2"
  },
  {
    value: "3",
    label: "Option3"
  }
]
const change = (val: any) => {
  console.log("change", val, selectValue.value)
}
</script>
