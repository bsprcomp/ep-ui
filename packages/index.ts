import type { Component, App } from "vue"
import EPSelect from "./select"
import EPInput from "./input"
import EPCheckbox from "./checkbox"
import EPButton from "./button"
import EPTable from "./table"
import EPForm from "./form"
import EPDatePicker from "./date-picker"
import EPRadio from "./radio"
import EPDialog from "./form-dialog"
import EPConfigProvider from "./config-provider"
import * as tools from "./utils"
// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  EPSelect,
  EPInput,
  EPCheckbox,
  EPTable,
  EPForm,
  EPButton,
  EPDatePicker,
  EPRadio,
  EPDialog,
  EPConfigProvider
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App, options) => {
  for (const key in components) {
    app.component(key, components[key])
  }
}
const install: any = (app: any, options) => {
  installComponents(app, options)
}
// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

// 按需引入
export {
  EPTable,
  EPForm,
  EPSelect,
  EPButton,
  EPDatePicker,
  EPRadio,
  EPCheckbox,
  EPInput,
  EPDialog,
  tools
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
