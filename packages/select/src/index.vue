<template>
  <component
    :is="!useVirtual ? 'el-select' : 'el-select-v2'"
    popper-class="e-p-select"
    ref="selectRef"
    v-model="modelValue"
    :options="!useVirtual ? null : options"
    :style="{ width: width || '100%' }"
    @change="handleChange"
    v-bind="{
      clearable: true,
      filterable: filterable,
      multiple: multiple,
      ...$attrs
    }"
  >
    <template v-for="(_, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
    <template v-if="!useVirtual">
      <el-checkbox
        v-if="multiple && isShowSelectAllBtn"
        v-model="isCheckedAll"
        @change="selectAll"
        class="all-checkbox"
        >全选</el-checkbox
      >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="formatterLabel ? formatterLabel(item): item[selectProps!.label]"
        :value="item[selectProps!.value]"
        :disabled="item.disabled"
      >
        <template v-for="(_, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </el-option>
    </template>
  </component>
</template>

<script setup lang="ts" name="EPSelect">
import { computed, useSlots } from "vue"
type Props = {
  multiple?: boolean // 是否多选
  isShowSelectAllBtn?: boolean // 是否全选
  width?: string // 选择框宽度
  filterable?: boolean //是否开启搜索过滤
  returnObject?: boolean // 是否返回对象
  selectProps?: Record<string, any> // 选项映射
  options: Record<string, any>[] | [] // 下拉框组件数据
  useVirtual?: boolean // 是否开启虚拟列表
  formatterLabel?: Function // 是否格式化label
}
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  isShowSelectAllBtn: false,
  selectProps: () => ({
    label: "label",
    value: "value"
  }),
  options: () => [],
  filterable: true,
  useVirtual: false,
  returnObject: false
})
const modelValue = defineModel<String | Number | string[] | Object>()
// 获取插槽
const slots = useSlots()
// 抛出事件
const emits = defineEmits(["change"])
// 当前选中
const handleChange = (val: any) => {
  emits("change", val)
}
// 过滤出未禁止options选项
const unDisabledOptions = computed(() =>
  props.options.filter(item => {
    return !item.disabled
  })
)
// 设置全选
const isCheckedAll = computed({
  get() {
    return (
      props.isShowSelectAllBtn &&
      (modelValue?.value as string[])?.length === unDisabledOptions.value.length
    )
  },
  set(v: any) {
    return (props.isShowSelectAllBtn && v?.length) === unDisabledOptions.value.length
  }
})
// 点击全选
const selectAll = val => {
  modelValue.value = val
    ? unDisabledOptions.value.map((item: any) => item[props.selectProps!.value])
    : undefined
}
</script>
<style lang="scss" scoped>
.e-p-select {
  .all-checkbox {
    margin-left: 20px;
  }
}
</style>
