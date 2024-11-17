<!-- 自定操作 -->
<template>
  <div class="wrapper vp-raw">
    <EPForm
      ref="epForm"
      label-Width="145px"
      valueWidth="320px"
      :formItems="formItems"
      v-model="formParams"
      btnSlotName="btn"
      @getRef="el => (formRef = el)"
    >
      <!-- 自定义操作,设置btnSlotName-->
      <template #btn>
        <el-space>
          <EPButton @click="submitForm" type="primary" value="自定义保存" />
          <el-dropdown placement="bottom-start">
            <el-button>
              下拉菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>重 置</el-dropdown-item>
                <el-dropdown-item>清除校验</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </template>
    </EPForm>
  </div>
</template>
<script setup lang="tsx">
import { tools } from "@bscomp/ep-ui"
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
    label: "EPInput",
    comp: "EPInput",
    width: "320px",
    required: true
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
</script>
<style scoped>
.wrapper {
  height: 200px;
}
</style>
