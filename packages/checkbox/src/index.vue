<template>
  <el-checkbox-group v-bind="$attrs">
    <slot>
      <component
        v-for="(item, index) in options"
        v-bind="item"
        :is="checkType"
        :key="index"
        :value="item[newOptionsProps.value]"
        :disabled="item[newOptionsProps.disabled]"
      >
        <slot :name="item.slot" v-bind="item">
          {{ item[newOptionsProps.label] }}
        </slot>
      </component>
    </slot>
  </el-checkbox-group>
</template>

<script setup lang="ts" name="EPCheckbox">
import { computed, ref } from "vue"
import type { OptionsProps, CheckboxItem } from "./checkbox"
type Optional<T> = {
  [k in keyof T]?: T[k]
}
type Props = {
  type: "check" | "button"
  options: CheckboxItem[]
  size: "large" | "default" | "small"
  optionsProps: Optional<OptionsProps>
}
const props = withDefaults(defineProps<Props>(), {
  type: "check",
  optionsProps: () => ({})
})
const checkType = computed(() => {
  const obj = {
    check: "el-checkbox",
    button: "el-checkbox-button"
  }
  return obj[props.type] ?? "el-checkbox"
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
