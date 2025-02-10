<template>
  <el-input
    :style="{ width }"
    v-model="modelValue"
    @input="handleInput"
    :clearable="true"
    v-bind="$attrs"
    :placeholder="placeholder"
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

interface Props {
  placeholder?: string
  width?: string
  inputType?: "integer" | "default" | "text"
  inputRule?: RegExp
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  width: "100%",
  inputType: "text"
})

const emit = defineEmits<{
  "update:modelValue": [value: string | number]
}>()

const modelValue = defineModel<string | number>()

const newInputRule = computed(() => {
  if (props.inputRule) return props.inputRule

  const rules = {
    integer: /[^\d]/g,
    default: null,
    text: /[\s]/g
  } as const

  return rules[props.inputType]
})

const handleInput = (value: string | number): void => {
  if (!newInputRule.value) {
    emit("update:modelValue", value)
    return
  }
  emit("update:modelValue", String(value).replace(newInputRule.value, ""))
}
</script>
