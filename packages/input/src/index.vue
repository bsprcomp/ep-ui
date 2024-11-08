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
type Props = {
  placeholder?: string
  width?: string
  inputType?: "text" | "integer"
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  width: "100%",
  inputType: "text"
})
const emit = defineEmits(["update:modelValue"])
const modelValue = defineModel<string | number>()
const inputRule = computed(() => {
  switch (props.inputType) {
    case "integer":
      return /[^\d]/g
    default:
      return /[\\]/g //输入任意
  }
})
// 处理输入
const handleInput = v => {
  emit("update:modelValue", v.replace(inputRule.value, ""))
}
</script>
