<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper">
    <EPForm
      class="login-form"
      :formItems="formItems"
      label-Width="0px"
      valueWidth="100%"
      v-model="formParams"
      :operatorList="operatorList"
      @getRef="el => (formRef = el)"
    >
      <template v-slot:top>
        <h3 class="title">xxx后台管理系统</h3>
      </template>
    </EPForm>
  </div>
</template>
<script setup lang="tsx">
import { tools } from "../../../packages/index"
//import { tools } from "@bscomp/ep-ui" 在实际项目中使用
import { ref } from "vue"
import { ElMessage } from "element-plus"
const formRef = ref()
// 表单提交
const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("验证通过")
      console.log(formParams.value)
    } else {
      ElMessage.error("未通过，确保必填项不为空")
    }
  })
}
// form items
const formItems = [
  {
    prop: "username", //el-form-item属性
    comp: "EPInput", // 组件类型
    placeholder: "请输入用户名",
    required: true
  },
  {
    prop: "password",
    comp: "EPInput",
    type: "password",
    placeholder: "请输入密码",
    required: true
  },
  {
    prop: "rememberMe",
    comp: "el-checkbox",
    text: "记住密码"
  }
]
const formParams = ref(tools.getParams(formItems))
// form 表单按钮
const operatorList = [
  { label: "提交", bind: { type: "primary", style: { width: "100%" } }, fun: submitForm }
]
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  background: var(--el-bg-color-page);
  background-size: cover;
  .login-form {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 6px;
    background: var(--el-bg-color);
    width: 400px;
    height: 370px;
    padding: 25px;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #707070;
    }
  }
}
</style>
