<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <EPButton type="primary" value="新 增" @click="dialogVisible = true" />
    <EPDialog
      title="新增"
      v-model:params="formParams"
      v-model="dialogVisible"
      :formProps="formProps"
      @handleSubmit="handleSubmit"
      @handleCancel="handleCancel"
    >
    </EPDialog>
  </div>
</template>
<script setup lang="tsx">
import { tools } from "../../../packages/index"
//import { tools } from "@bscomp/ep-ui" 在实际项目中使用
import { ref } from "vue"
const dialogVisible = ref(false)
// form items
const formItems = [
  {
    prop: "test_1", //el-form-item属性
    label: "EPInput输入框", //el-form-item label值
    comp: "EPInput", // 组件类型
    defaultValue: "默认值", //默认值（配合tools.getParams使用）
    required: true //校验（开启则会验证为空校验）
  },
  {
    prop: "test_2",
    label: "下拉选项",
    comp: "EPSelect",
    defaultValue: "1",
    required: true,
    options: [
      { label: "option1", value: "1" },
      { label: "option2", value: "2" }
    ]
  },
  {
    prop: "test_3",
    label: "日期",
    comp: "EPDatePicker",
    defaultValue: "2024-11-16",
    shortcutsName: ["今天", "昨天", "一周前"]
  },
  {
    prop: "test_4",
    label: "时间范围",
    comp: "EPDatePicker",
    type: "daterange",
    defaultValue: ["2024-10-16", "2024-11-16"],
    shortcutsName: ["近一月", "近三月", "近半年"]
  },
  {
    prop: "test_5",
    label: "复选框",
    comp: "EPCheckbox",
    defaultValue: ["1", "2"],
    options: [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
      { label: "选项三", value: "3" }
    ]
  },
  {
    prop: "test_6",
    label: "单选框",
    comp: "EPRadio",
    defaultValue: "1",
    options: [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
      { label: "选项三", value: "3" }
    ]
  },
  {
    prop: "ElRate",
    label: "el-rate评分",
    comp: "el-rate"
  },
  {
    prop: "ElSwitch",
    label: "el-switch开关",
    comp: "el-switch"
  }
]
const formProps = {
  formItems,
  labelWidth: "145px",
  valueWidth: "320px"
}
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems))
const handleSubmit = () => {
  console.log(formParams.value, "formParams===>handleSubmit")
  dialogVisible.value = false
}
const handleCancel = () => {
  dialogVisible.value = false
}
</script>
