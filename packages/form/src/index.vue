<template>
  <div class="e-p-form">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="newRules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      v-bind="$attrs"
      :inline="inline"
    >
      <component :is="inline ? 'div' : 'el-row'" :class="{ 'inline-flex': inline }">
        <template v-for="(item, index) in newFormItems">
          <component :is="inline ? 'div' : 'el-col'" :span="24 / (item.colNum || colNum)">
            <el-form-item v-if="!item.hidden" :key="index" v-bind="item">
              <!-- 自定义label -->
              <template #label v-if="item.labelSlotName || item.labelRender">
                <CustomRender v-if="item.labelRender" :render="item.labelRender" :item="item" />
                <template v-if="item.labelSlotName">
                  <slot :name="item.labelSlotName" :scope="item"></slot>
                </template>
              </template>
              <!-- 自定义输入框插槽 -->
              <template v-if="item.custom">
                <slot :name="item.prop" :scope="formModel"></slot>
              </template>
              <!-- 文本展示值 -->
              <template v-if="item.textShow">
                <el-tooltip
                  :disabled="disabled"
                  :content="getText(item, formModel)"
                  placement="top"
                  v-bind="item"
                >
                  <el-text
                    :style="{ width: item.width || valueWidth }"
                    @mouseover="mouseover"
                    v-bind="item"
                    >{{ getText(item, formModel) }}</el-text
                  >
                </el-tooltip>
              </template>
              <component
                v-if="!item.custom && !item.textShow"
                :is="item.comp"
                v-model="formModel[item.prop]"
                :type="item.type"
                v-bind="{ clearable: true, filterable: true, ...item }"
                :style="{ width: item.width || valueWidth }"
              >
                <template #prepend v-if="item.prepend">{{ item.prepend }}</template>
                <template #append v-if="item.append">{{ item.append }}</template>
              </component>
            </el-form-item>
          </component>
        </template>
      </component>
    </el-form>
    <!-- 按钮 -->
    <div class="footer">
      <template v-if="btnSlotName">
        <slot :name="btnSlotName"></slot>
      </template>
      <template v-if="operatorList && operatorList.length > 0">
        <template v-for="(val, index) in operatorList" :key="index">
          <template v-if="val.render">
            <CustomRender v-if="!val.isHideBtn" :item="val" :render="val.render" />
          </template>
          <template v-else>
            <EPButton
              @click="val.fun(val)"
              v-bind="{
                type: 'primary',
                ...val.bind
              }"
              v-if="!val.isHideBtn"
            >
              {{ val.label }}
            </EPButton>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="EPForm">
import CustomRender from "./CustomRender.vue"
import { computed, ref, onMounted } from "vue"
import useHooks from "./useHooks"

type Props = {
  btnSlotName?: string
  formItems: Record<string, any>[] | []
  labelPosition?: "left" | "right" | "top"
  labelWidth?: string
  isShowDefaultPlaceholder: boolean
  operatorList: any[] | []
  valueWidth?: string
  inline?: boolean
  colNum?: number
}

const props = withDefaults(defineProps<Props>(), {
  // form 属性
  formProps: () => ({}),
  // label对齐方式
  labelPosition: "right",
  labelWidth: "120px",
  valueWidth: "200px",
  formItems: () => [],
  isShowDefaultPlaceholder: true,
  operatorList: () => [],
  inline: false,
  colNum: 1
})

const { transformFormItems, getRules, getText, mouseover, disabled } = useHooks(props)
// 获取ref
const formRef: any = ref<HTMLElement | null>(null)
// form表单
const formModel = defineModel<any>({
  default: {}
})
const newRules = computed(() => getRules())
// 获取格式化后的formItems
const newFormItems = computed(() => transformFormItems())
// 抛出事件
const emits = defineEmits(["getRef"])
const resetFields = () => formRef.value.resetFields()
const validate = fun => formRef.value.validate(fun)
const clearValidate = () => formRef.value.clearValidate()
// 暴露方法出去
defineExpose({ resetFields, validate, clearValidate })
onMounted(() => {
  emits("getRef", formRef.value, formRef)
})
</script>

<style lang="scss">
.e-p-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .inline-flex {
    display: flex;
    flex-wrap: wrap;
  }
  .text_show {
    color: var(--el-text-color-primary);
  }

  .slot_label {
    .el-form-item__content {
      label {
        color: var(--el-text-color-primary);
        margin-right: 12px;
      }
    }
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
