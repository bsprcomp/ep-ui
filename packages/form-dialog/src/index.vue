<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="600"
    :before-close="handleClose"
    v-bind="$attrs"
  >
    <template #header="scope">
      <slot name="header" :scope="scope"></slot>
    </template>
    <el-scrollbar :style="contentStyle">
      <slot name="top" />
      <EPForm
        ref="formRef"
        v-bind="{ inline: false, labelSuffix: ':', ...formProps }"
        :form-items="formProps?.formItems || []"
        v-model="params"
      >
        <template v-slot:[name] v-for="name in Object.keys(slots)">
          <slot v-if="!extraSlot.includes(name)" :name="name" />
        </template>
      </EPForm>
      <slot name="content"></slot>
      <slot name="bootom" />
    </el-scrollbar>
    <template #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button v-if="!hiddenCancelBtn" @click="emits('handleCancel')">{{
            cancelText
          }}</el-button>
          <el-button v-if="!hiddensubmitBtn" @click="handleSubmit" type="primary">
            {{ submitText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="EPDialog">
import { useSlots, ref, watch, computed } from "vue"
const slots = useSlots()
const formRef = ref()
const extraSlot = ["footer", "bootom", "top", "content", "header"]
type Props = {
  title?: string
  cancelText?: string
  submitText?: string
  hiddenCancelBtn?: boolean
  hiddensubmitBtn?: boolean
  maxHeight?: string
  height?: string
  formProps?:
    | {
        btnSlotName?: string
        formItems?: Record<string, any>[] | []
        labelPosition?: "left" | "right" | "top"
        labelWidth?: string
        isShowDefaultPlaceholder: boolean
        operatorList?: any[] | []
        valueWidth?: string
        inline?: boolean
        colNum?: number
        [x: string]: any
      }
    | any
}
const props = withDefaults(defineProps<Props>(), {
  title: "标题",
  submitText: "确 定",
  cancelText: "取 消",
  hiddenCancelBtn: false,
  hiddensubmitBtn: false,
  formProps: () => ({
    formItems: []
  })
})
const contentStyle = computed(() => ({
  display: "flex",
  flexDirection: "column",
  maxHeight: props.maxHeight,
  height: props.height
}))
const formItems = ref([])
watch(
  () => props.formProps,
  () => {
    formItems.value = props.formProps.formItems
  }
)
// 抛出事件
const emits = defineEmits(["close", "handleCancel", "handleSubmit"])
const dialogVisible = defineModel({ default: false })
const params = defineModel("params")
const handleClose = () => {
  dialogVisible.value = false
  emits("handleCancel")
}
const handleSubmit = async () => {
  await formRef.value.validate()
  emits("handleSubmit")
}
watch(dialogVisible, newValue => {
  if (newValue) {
    formRef.value?.clearValidate()
  }
})
</script>
