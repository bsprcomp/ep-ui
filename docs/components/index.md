### 快速上手

::: tip 提示

@bscomp/ep-ui 基于 vue3 (^3.4) + ts + Element-plus 再次封装的基础组件

:::

### 安装

```bash:no-line-numbers
npm install @bscomp/ep-ui -S
```

> #### 前提条件：必须安装 Element-plus 组件库和注册所有图标

### 全局使用

##### ep-ui 全局安装如下即可使用

```js
// main.ts
import { createApp } from "vue"
import App from "./App.vue"
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import EP from "@bscomp/ep-ui"
import "@bscomp/ep-ui/lib/style.css"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册ep-ui
app.use(EP)
app.mount("#app")
```

##### 使用该组件库之外的 element-ui 组件，配合 Element-plus 全局安装示例如下

```js
// main.ts
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
// 注册ElementPlus
app.use(ElementPlus)
// 注册ep-ui
app.use(EP)
app.mount("#app")
```

##### ep-ui 支持在 Element-plus 自动导入下使用，Element-plus 组件自动导入示例如下

```js
// vite.config.ts
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
const pathSrc = path.resolve(__dirname, "src")
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
      "@/": `${pathSrc}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ]
    })
  ]
})
```

### 按需引入

```js
// 在main.js中按下引入
import "@bscomp/ep-ui/lib/style.css"
// 单个.vue文件引入
;<script setup lang="ts">
  import {EPTable} from "@bscomp/ep-ui"
</script>
```

### EP-ui 组件 Volar 类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "@bscomp/ep-ui/components.d.ts",
    ],
}

```

### docs 文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
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
