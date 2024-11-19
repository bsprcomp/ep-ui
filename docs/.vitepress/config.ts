import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
export default defineConfig({
  title: "ep-ui基础组件文档",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/ep-ui/",
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "ep-ui基础组件文档",
    outline: 3,
    outlineTitle: "页面导航",
    // 可以定义此选项以在导航栏中展示带有图标的社交帐户链接。
    socialLinks: [{ icon: "github", link: "https://github.com/bsprcomp/ep-ui" }],
    search: {
      // 是否开启搜索
      provider: "local"
    },
    nav: [
      {
        text: "安装指南",
        link: "/components/"
      },
      { text: "基础组件", link: "/components/EPInput/base.md" },
      {
        text: "Element Plus地址",
        link: "https://element-plus.org/zh-CN/"
      }
    ],
    sidebar: {
      "/components": [
        {
          text: "Basic 基础组件",
          items: [
            {
              text: "Input 输入框",
              link: "/components/EPInput/base.md"
            },
            { text: "Select 选择器", link: "/components/EPSelect/base.md" },
            { text: "Checkbox 多选框", link: "/components/EPCheckbox/base.md" },
            { text: "Button 按钮", link: "/components/EPButton/base.md" },
            { text: "Radio 组件", link: "/components/EPRadio/base.md" },
            { text: "DatePicker 日期选择器", link: "/components/EPDatePicker/base.md" }
          ]
        },
        {
          text: "Complex 复杂组件",
          items: [
            { text: "Table 组件", link: "/components/EPTable/base.md" },
            { text: "Dynamic Form 动态表单(^0.0.8)", link: "/components/EPForm/base.md" },
            { text: "Form Dialog 表单弹框(^0.0.9)", link: "/components/EPDialog/base.md" }
          ]
        }
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    theme: { light: "github-light", dark: "github-dark" },
    config: md => mdPlugin(md)
  }
})
