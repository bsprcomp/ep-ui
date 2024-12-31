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
  inputType?: "integer" | "default" | ""
  inputRule?: RegExp
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  width: "100%",
  inputType: ""
})
const emit = defineEmits(["update:modelValue"])
const modelValue = defineModel<string | number>()
const newInputRule = computed(() => {
  if (props.inputRule) {
    return props.inputRule
  }
  switch (props.inputType) {
    case "integer":
      return /[^\d]/g
    case "default":
      return ""
    default:
      return /[\s]/g //默认去除空格
  }
})
// 处理输入
const handleInput = v => {
  if (newInputRule.value) {
    emit("update:modelValue", v.replace(newInputRule.value, ""))
  } else {
    return v
  }
}
</script>
