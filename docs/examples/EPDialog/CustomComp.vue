<!-- 
 valueWidth 默认100%
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
      <!-- 自定义组件,formItems选项设置custom为true,插槽名称为prop属性值 -->
      <template #test12>
        <EPSelect
          width="320px"
          v-model="formParams.test12"
          :options="[
            { label: 'option_1', value: 1 },
            { label: 'option_2', value: 2 }
          ]"
        />
      </template>
    </EPDialog>
  </div>
</template>
<script setup lang="tsx">
import { tools } from "../../../packages/index"
//import { tools } from "@bscomp/ep-ui" // 在实际项目中使用
import { ref } from "vue"
const dialogVisible = ref(false)
// form items
const formItems = [
  {
    prop: "test12",
    label: "自定义组件",
    width: "320px",
    required: true,
    custom: true
  },
  {
    prop: "test",
    label: "自定义label",
    comp: "el-input",
    width: "320px",
    labelRender: item => (
      <>
        {item.label}
        <i>渲染</i>
      </>
    )
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
  // 0.5.7版本后可无需手动设置关闭弹框dialogVisible.value = false
  //取消后额外操作
}
</script>
