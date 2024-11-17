<!-- 自定义label -->
<template>
  <div class="wrapper vp-raw">
    <EPForm
      ref="epForm"
      :formItems="formItems"
      label-Width="145px"
      valueWidth="320px"
      v-model="formParams"
      :operatorList="operatorList"
      @getRef="el => (formRef = el)"
    >
      <!-- 插槽 label   v-slot:testSlot="{ scope }"-->
      <template #testSlot>
        <span style="font-weight: 700"> {{ "使用插槽" }}</span>
      </template>
    </EPForm>
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
    label: "正常渲染", //el-form-item label值
    placeholder: "请输入",
    comp: "el-input" // 组件类型
  },
  {
    prop: "test_2",
    label: "labelRender",
    comp: "el-input",
    width: "320px",
    labelRender: item => (
      <>
        {item.label}
        <i>渲染</i>
      </>
    )
  },
  {
    prop: "test_3",
    comp: "el-input",
    width: "320px",
    labelSlotName: "testSlot"
  }
]
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems))
// form 表单按钮
const operatorList = [{ label: "提交", bind: { type: "primary" }, fun: submitForm }]
</script>
<style scoped>
.wrapper {
  height: 300px;
}
</style>
