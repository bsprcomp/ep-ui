<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <EPForm
      ref="epForm"
      label-suffix=":"
      :formItems="formItems"
      label-Width="145px"
      valueWidth="320px"
      v-model="formParams"
      :operatorList="operatorList"
      @getRef="el => (formRef = el)"
    />
  </div>
</template>
<script setup lang="tsx">
import { tools } from "@bscomp/ep-ui"
import { ref } from "vue"
import { ElMessage } from "element-plus"

// EPForm 组件中el-form实例
const formRef = ref()
// EPForm实例
const epForm = ref()
// 表单重置
const resetFields = () => {
  epForm.value.resetFields()
}
// 表单重置
const clearValidate = () => {
  epForm.value.clearValidate()
}
// 表单提交
const submitForm = () => {
  epForm.value.validate(valid => {
    if (valid) {
      ElMessage.success("验证通过")
    } else {
      ElMessage.error("未通过，确保必填项不为空")
    }
  })
}

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
    prop: "select",
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
    prop: "date",
    label: "日期",
    comp: "EPDatePicker",
    defaultValue: "2024-11-16",
    shortcutsName: ["今天", "昨天", "一周前"]
  },
  {
    prop: "dateranage",
    label: "时间范围",
    comp: "EPDatePicker",
    type: "daterange",
    defaultValue: ["2024-10-16", "2024-11-16"],
    shortcutsName: ["近一月", "近三月", "近半年"]
  },
  {
    prop: "EPCheckbox",
    label: "EPCheckbox复选框",
    comp: "EPCheckbox",
    defaultValue: ["1", "2"],
    options: [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
      { label: "选项三", value: "3" }
    ]
  },
  {
    prop: "EPRadio",
    label: "EPRadio单选框",
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
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems))
// form 表单按钮
const operatorList = [
  { label: "提交", bind: { type: "primary" }, fun: submitForm },
  { label: "重置", bind: { type: "default" }, fun: resetFields },
  { label: "清除验证", bind: { type: "default" }, fun: clearValidate }
]
</script>
<style scoped>
.wrapper {
  height: 500px;
}
</style>
