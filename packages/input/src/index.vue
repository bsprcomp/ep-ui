<template>
  <el-input
    :style="{ width }"
    v-model="modelValue"
    @input="handleInput"
    :clearable="true"
    v-bind="{
      maxlength: attrs.type !== 'textarea' ? defaultMaxlength : textareaMaxlength,
      ...inputInject,
      ...$attrs
    }"
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
import { computed, useAttrs, inject } from "vue"
interface Props {
  placeholder?: string
  width?: string
  inputType?: "integer" | "default" | "text"
  inputRule?: RegExp
}
const attrs = useAttrs()
const { defaultMaxlength, textareaMaxlength, ...inputInject }: any = inject("input") || {}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "请输入",
  width: "100%",
  inputType: "text"
})

const modelValue = defineModel<string | number>()

const newInputRule = computed(() => {
  if (props.inputRule) return props.inputRule
  if (attrs.type == "textarea") {
    return null
  }
  const rules = {
    integer: /[^\d]/g,
    default: null,
    text: /[\s]/g
  } as const

  return rules[props.inputType]
})

const handleInput = (value: string | number): void => {
  if (!newInputRule.value) {
    modelValue.value = value
  } else {
    modelValue.value = String(value).replace(newInputRule.value, "")
  }
}
</script>
