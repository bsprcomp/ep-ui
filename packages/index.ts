import type { Component, App } from "vue"
import EPSelect from "./select"
import EPInput from "./input"
import EPCheckbox from "./checkbox"
import EPButton from "./button"
import EPTable from "./table"
import TForm from "./form"
import EPDatePicker from "./date-picker"
import EPRadio from "./radio"

// 存储组件列表
const components: {
  [propName: string]: Component
} = {
  EPSelect,
  EPInput,
  EPCheckbox,
  EPTable,
  TForm,
  EPButton,
  EPDatePicker,
  EPRadio
}
// 插件声明：声明所有插件
// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册
const installComponents: any = (app: App) => {
  // components.forEach((comp: any) => {
  //   app.component(comp.name as string, comp)
  // })
  //   app.use(ElementPlus, {
  //     locale // 语言设置
  //   // size: Cookies.get('size') || 'medium' // 设置默认尺寸
  // })
  for (const key in components) {
    app.component(key, components[key])
  }
}
// vue插件
// - install：每个插件都有一个 install 方法
// - 参数：是通过 Vue.createApp() 创建的 app 实例
const install: any = (app: any, router?: any) => {
  // !router && installRouter(app);
  installComponents(app)
}
// @ts-ignore
if (typeof window !== "undefined" && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

// 按需引入
export { EPTable, TForm, EPSelect, EPButton, EPDatePicker, EPRadio, EPCheckbox, EPInput }

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
