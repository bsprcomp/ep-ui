<template>
  <el-input
    :style="{ width: width }"
    v-model="modelValue"
    @input="handleInput"
    v-bind="{ placeholder, clearable: true, ...$attrs }"
  >
    <template #append v-if="$slots.append">
      <slot name="append" />
    </template>
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend" />
    </template>
  </el-input>
</template>

<script setup lang="ts" name="EpInput">
import { defineModel, defineEmits, computed } from "vue"
import { ElInput } from "element-plus"
type Props = {
  placeholder?: string
  width?: string
  inputType?: "trim" | "integer" | ""
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  width: "100%",
  inputType: "trim"
})
const emit = defineEmits(["update:modelValue"])
const modelValue = defineModel<string | number>()
const inputRule = computed(() => {
  switch (props.inputType) {
    case "integer":
      return /[^\d]/g
    default:
      return /[\s]/g //默认去除空格
  }
})
// 处理输入
const handleInput = v => {
  if (props.inputType) {
    emit("update:modelValue", v.replace(inputRule.value, ""))
  } else {
    return v
  }
}
</script>
