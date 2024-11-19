<!-- 
 valueWidth 默认200px
 labelWidth 默认120px
 -->
<template>
  <div class="wrapper vp-raw">
    <div class="content">
      <EPForm
        ref="epForm"
        label-suffix=":"
        :formItems="formItems"
        label-width="60px"
        inline
        v-model:expand="expand"
        v-model="formParams"
        :operatorList="operatorList"
        @getRef="el => (formRef = el)"
      />
    </div>
  </div>
</template>
<script setup lang="tsx">
// import { tools } from "../../../packages/index"
import { tools } from "@bscomp/ep-ui" //在实际项目中使用
import { computed, ref } from "vue"
const expand = ref(false)
// EPForm 组件中el-form实例
const formRef = ref()
// EPForm实例
const epForm = ref()
// 表单重置
const resetFields = () => {
  epForm.value.resetFields()
}

// form items
const formItems = computed(() => [
  {
    prop: "test_1", //el-form-item属性
    label: "用户名", //el-form-item label值
    comp: "EPInput" // 组件类型
  },
  {
    prop: "test_2", //el-form-item属性
    label: "测试", //el-form-item label值
    comp: "EPInput" // 组件类型
  },
  {
    prop: "select",
    label: "类型",
    comp: "EPSelect",
    hidden: !expand.value,
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
    hidden: !expand.value,
    shortcutsName: ["今天", "昨天", "一周前"]
  }
])
// 获取初始化值（getParams 会返回一个对象 {[prop]:defaultValue||''}
const formParams = ref(tools.getParams(formItems.value))
// form 表单按钮
const operatorList = [
  {
    label: "查 看",
    bind: { type: "primary" },
    fun: () => {
      console.log("getData")
    }
  },
  { label: "重 置", bind: { type: "default" }, fun: resetFields }
]
</script>
<style scoped>
.wrapper {
  overflow: auto;
  .content {
    width: 1000px;
  }
}
</style>
