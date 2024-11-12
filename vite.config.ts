import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import vueSetupExtend from "vite-plugin-vue-setup-extend" // 设置name属性(vue组件script标签上设置name)
import viteCompression from "vite-plugin-compression" // 静态资源压缩
import dts from "vite-plugin-dts"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    dts(),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: "gzip", // 压缩算法
      ext: ".gz" // 文件类型
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 3300,
    open: true,
    proxy: {}
  },
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "packages")
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"]
  },
  build: {
    outDir: "lib",
    // cssCodeSplit: true, // 强制内联CSS
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    },
    lib: {
      entry: resolve(__dirname, "packages/index.ts"),
      name: "EPComp",
      fileName: "ep-ui"
    }
  }
})
