<!-- 自定义组件 -->
<template>
  <div class="wrapper vp-raw">
    <EPForm
      ref="epForm"
      label-Width="145px"
      valueWidth="320px"
      :formItems="formItems"
      :operatorList="operatorList"
      v-model="formParams"
      @getRef="el => (formRef = el)"
    >
      <!-- 自定义组件,formItems选项设置custom为true,插槽名称为prop属性值 -->
      <template #test>
        <EPSelect
          width="320px"
          v-model="formParams.test"
          :options="[
            { label: 'option_1', value: 1 },
            { label: 'option_2', value: 2 }
          ]"
        />
      </template>
    </EPForm>
  </div>
</template>
<script setup lang="tsx">
import { tools } from "../../../packages/index"
//import { tools } from "@bscomp/ep-ui" 在实际项目中使用
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"

// EPForm 组件中el-form实例
const formRef = ref()
// EPForm实例
const epForm = ref()
// form items
const formItems = [
  {
    prop: "test",
    label: "自定义组件",
    width: "320px",
    required: true,
    custom: true
  }
]
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = reactive(tools.getParams(formItems))
// 表单提交
const submitForm = () => {
  epForm.value.validate(valid => {
    if (valid) {
      ElMessage.success(`验证通过,test值:${formParams.test}`)
    } else {
      ElMessage.error("未通过，确保必填项不为空")
    }
  })
}
// form 表单按钮
const operatorList = [{ label: "提交", bind: { type: "primary" }, fun: submitForm }]
</script>
