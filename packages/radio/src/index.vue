<template>
  <el-radio-group v-bind="$attrs">
    <slot>
      <component
        v-for="(item, index) in options"
        v-bind="item"
        :is="radioType"
        :key="index"
        :value="item[newOptionsProps.value]"
        :disabled="item[newOptionsProps.disabled]"
      >
        <slot :name="item.slot" v-bind="item">
          {{ item[newOptionsProps.label] }}
        </slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script setup lang="ts" name="EPRadio">
import { computed, ref } from "vue"
import { ElRadio, ElRadioButton } from "element-plus"

import type { OptionsProps, RadioItem } from "./radio"
type Optional<T> = {
  [k in keyof T]?: T[k]
}
type Props = {
  type?: "check" | "button"
  options: RadioItem[] | []
  size?: "large" | "default" | "small"
  optionsProps?: Optional<OptionsProps>
}
const props = withDefaults(defineProps<Props>(), {
  type: "check",
  optionsProps: () => ({})
})
const radioType = computed(() => {
  const obj = {
    radio: "el-radio",
    button: "el-radio-button"
  }
  return obj[props.type] ?? "el-radio"
})
const newOptionsProps = ref<OptionsProps>({
  ...{
    value: "value",
    label: "label",
    disabled: "disabled"
  },
  ...props.optionsProps
})
</script>
