<template>
  <component :is="components[type]" v-model="value"></component>
</template>
<script setup lang="ts">
import EPInput from "../../input"
import EPSelect from "../../select"
import DatePicker from "../../date-picker"
import EPRadioGroup from "../../radio"
const value = defineModel<any>()
type Props = {
  type?: "input" | "select" | "custom" | "radio" | "date-picker"
}
withDefaults(defineProps<Props>(), {
  type: "input"
})
const components = {
  input: EPInput,
  select: EPSelect,
  radio: EPRadioGroup,
  "date-picker": DatePicker
}
</script>
