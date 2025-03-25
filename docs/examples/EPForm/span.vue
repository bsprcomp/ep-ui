<!-- 
多列展示
 -->
<template>
  <div class="wrapper vp-raw">
    <EPForm
      ref="epForm"
      label-suffix=":"
      :colNum="colNum"
      :formItems="formItems"
      label-Width="145px"
      valueWidth="120px"
      v-model="formParams"
      :operatorList="operatorList"
      @getRef="el => (formRef = el)"
    />
  </div>
</template>
<script setup lang="tsx">
import { tools } from "../../../packages/index"
import { ref } from "vue"
import { ElMessage } from "element-plus"
const colNum = ref(1)
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
    required: true, //校验（开启则会验证为空校验）
    span: 12
  },
  {
    prop: "select",
    label: "下拉选项",
    comp: "EPSelect",
    span: 12,
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
    span: 12,
    comp: "EPDatePicker",
    defaultValue: "2024-11-16",
    shortcutsName: ["今天", "昨天", "一周前"]
  },

  {
    prop: "ElSwitch",
    span: 12,
    label: "el-switch开关",
    comp: "el-switch"
  }
]
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems))
// form 表单按钮
const operatorList = [{ label: "提交", bind: { type: "primary" }, fun: submitForm }]
</script>
