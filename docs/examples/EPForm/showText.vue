<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <div>
      <el-alert>
        <p>1.textShow配合textValue使用，文本使用el-text封装，继承el-text所有</p>
        <p>2.设置truncated:true,内部自动开启el-tooltip，继承el-tooltip所有属性</p>
      </el-alert>
      <EPForm ref="epForm" :formItems="textFormItems" v-model="formParams" v-bind="bind" />
    </div>
    <el-divider />
    <div style="font-weight: 700; padding-bottom: 16px">编辑/禁止</div>
    <el-alert>
      <p>1.textShow配合formatterText使用，formatterText接收当前formParams以及当前所在对象</p>
    </el-alert>
    <EPForm
      ref="epForm"
      :formItems="formItems"
      v-model="formParams"
      :operatorList="operatorList"
      @getRef="el => (formRef = el)"
      v-bind="bind"
    />
  </div>
</template>
<script setup lang="tsx">
import { tools } from "@bscomp/ep-ui"
import { computed, ref } from "vue"
import { ElMessage } from "element-plus"
const bind = {
  labelSuffix: ":",
  labelWidth: "145px",
  valueWidth: "320px"
}
// 是否编辑状态
const isEdit = ref(false)
// EPForm 组件中el-form实例
const formRef = ref()
// EPForm实例
const epForm = ref()

// 表单提交
const submitForm = () => {
  epForm.value.validate(valid => {
    if (valid) {
      ElMessage.success("保存成功")
      isEdit.value = false
    } else {
      ElMessage.error("未通过，确保必填项不为空")
    }
  })
}
// 只是用于文本展示 textValue
const textFormItems = [
  {
    label: "Username",
    textShow: true,
    textValue: "kooriookami",
    type: "primary"
  },
  {
    label: "Telephone",
    textShow: true,
    textValue: "18100000000",
    type: "success"
  },
  {
    label: "Place",
    textShow: true,
    textValue: "Suzhou"
  },
  {
    label: "Address",
    textShow: true,
    textValue: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province"
  },
  {
    label: "省略,top显示",
    textShow: true,
    truncated: true,
    placement: "top",
    textValue: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
  },
  {
    label: "省略,bottom显示",
    textShow: true,
    truncated: true,
    placement: "bottom",
    textValue: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
  }
]

// form items
const formItems = computed(() => [
  {
    prop: "test_1", //el-form-item属性
    label: "EPInput输入框", //el-form-item label值
    comp: "EPInput", // 组件类型
    textShow: !isEdit.value,
    defaultValue: "默认值", //默认值（配合tools.getParams使用）
    required: true //校验（开启则会验证为空校验）
  },
  {
    prop: "test_2",
    label: "下拉选项",
    comp: "EPSelect",
    textShow: !isEdit.value,
    formatterText: (param, item) => item.options.find(el => el.value == param.test_2)?.label,
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
    textShow: !isEdit.value,
    defaultValue: "2024-11-16",
    shortcutsName: ["今天", "昨天", "一周前"]
  },

  {
    prop: "EPCheckbox",
    label: "EPCheckbox复选框",
    comp: "EPCheckbox",
    disabled: !isEdit.value,
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
    textShow: !isEdit.value,
    comp: "EPRadio",
    defaultValue: "1",
    formatterText: (param, item) => item.options.find(el => el.value == param.test_2)?.label,
    options: [
      { label: "选项一", value: "1" },
      { label: "选项二", value: "2" },
      { label: "选项三", value: "3" }
    ]
  },

  {
    prop: "ElSwitch",
    label: "el-switch开关",
    disabled: !isEdit.value,
    comp: "el-switch"
  }
])
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems.value))
// form 表单按钮
const operatorList = computed(() => [
  {
    label: "编辑",
    bind: { type: "primary" },
    fun: () => {
      isEdit.value = true
    },
    isHideBtn: isEdit.value
  },
  { label: "保存", bind: { type: "primary" }, fun: submitForm, isHideBtn: !isEdit.value }
])
</script>
