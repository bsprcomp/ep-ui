# EP-ui

## 介绍

> 基于 vue3+ ts+ Element-plus 二次封装组件

## npm 方式安装使用

```shell
npm i @bscomp/ep-ui
```

## 全局注册使用

> ### 前提条件：组件库依赖 Element-plus 组件库

```js
// main.js
import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import EP from "@bscomp/ep-ui"
import "@bscomp/ep-ui/lib/style.css"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//全局注册element
app.use(ElementPlus, {
  locale // 语言设置
})
app.use(EP)
app.mount("#app")
```

## 按需引入

```js
// 在main.js中按需引入
import "@bscomp/ep-ui/lib/style.css"
// 单个.vue文件引入
;<script setup lang="ts">
  import {EPTable} from "@bscomp/ep-ui"
</script>
```

## ep-ui Volar 组件类型提示

需要在项目 src 文件下的 env.d.ts 中引入

```js
/// <reference types="@bscomp/ep-ui/lib/components.d.ts" />
```

## 安装依赖

> ### 注意: 本地环境版本最好安装 [Node.js 18.x+](https://nodejs.org/en)

```shell
# 安装依赖
npm install
>npm config set registry https://registry.npmmirror.com/ 切换淘宝镜像源
>npm install
```
