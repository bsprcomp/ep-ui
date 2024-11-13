### 快速上手

::: tip 提示
@bscomp/ep-ui 基于 vue3 (^3.4) + ts + Element-plus 再次封装的基础组件
:::

### 安装

```bash:no-line-numbers
npm install @bscomp/ep-ui -S
```

> #### 前提条件：全局注册 Element-plus 组件库和所有图标

```javascript
// main.js
import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// element-plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import EP from "@bscomp/ep-ui"
import "@bscomp/ep-ui/lib/style.css"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//全局注册 element
app.use(ElementPlus, {
  locale // 语言设置
})
app.use(EP)
app.mount("#app")
```

## 按需引入

```javascript
// 在 main.js 引入样式
import "@bscomp/ep-ui/lib/style.css"
```

```js
// 单个.vue 文件引入组件
;<script setup lang="ts">
  import {EPTable} from "@bscomp/ep-ui"
</script>
```

ep-ui 组件类型提示
需要在项目 src 文件下的 env.d.ts 中引入

```js
/// <reference types="@bscomp/ep-ui/lib/components.d.ts" />
```

# 安装依赖

```shell
#注意: 本地环境版本最好安装 Node.js 18.x+
npm install
#安装失败切换淘宝镜像源安装
npm config set registry https://registry.npmmirror.com/
npm install
```

### docs 文档结构目录

```
├─ examples # VPDemo 组件自动解析此文件夹下的所有.vue 文件
├─ components # .md 文件
├─ public # 静态资源文件
├─ .vitepress
│ ├─ config # 插件配置
| │ ├─ global.ts # 全局变量定义
| │ └─ plugins.ts # 自定义.md 文件渲染
│ ├─ theme # 主题配置
│ ├─ utils # 文档展开隐藏代码高亮
│ ├─ vitepress
| │ ├─ vp-demo # VPDemo 组件源码
| │ ├─ style # VPDemo 组件样式
| │ └─ index.ts # 暴露 VPDemo 组件
│ └─ config.ts # vitepress 配置文件
├─ index.md # 文档 home 页面
├─ tsconfig.json # typescript 全局配置
└─ vite.config.ts # vite 全局配置文件（支持 tsx）

```

### Git 提交规范（PR 提交规范）

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;

---
