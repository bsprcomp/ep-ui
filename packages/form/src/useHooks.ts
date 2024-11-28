import type { FormRules } from "element-plus"
import { ref } from "vue"
export default function (props) {
  const disabled = ref(true)
  const mouseover = e => {
    if (e.target.offsetWidth < e.target.scrollWidth) {
      disabled.value = false
    } else {
      disabled.value = true
    }
  }
  // 获取text
  const getText = (item, formModel) => {
    return (
      item.textValue ||
      (item.formatterText && item.formatterText(formModel, item)) ||
      formModel[item.prop]
    )
  }
  // 获取默认Message
  const getDefaultMessage = item => {
    const message =
      (item.comp &&
        ["el-input", "ElInput", "EPInput", "e-p-input"].includes(item.comp) &&
        "请输入") ||
      "请选择"
    return item.placeholder || `${message}${item.label || ""}`
  }
  // 格式化formItems
  const transformFormItems = () => {
    if (props.isShowDefaultPlaceholder) {
      return props.formItems.map(item => {
        const placeholder = getDefaultMessage(item)
        return { ...item, placeholder }
      })
    }
    return props.formItems
  }
  //获取rules
  const getRules = () => {
    if (props.rules) return props.rules
    let rules: FormRules = {}
    // 去除隐藏项
    const filterItems = props.formItems.filter(item => !item.hidden)
    filterItems.map(item => {
      rules[item.prop] = []
      if (item.rules) {
        const isArr = Array.isArray(item.rules)
        rules[item.prop] = isArr ? item.rules : [item.rules]
      }
      if (item.required) {
        const placeholder = getDefaultMessage(item)
        ;(rules[item.prop] as any).push({
          required: true,
          trigger: item.trigger,
          message: placeholder
        })
      }
    })
    return rules
  }
  return { transformFormItems, getRules, getText, mouseover, disabled }
}
