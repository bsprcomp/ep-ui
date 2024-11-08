import { postcssIsolateStyles } from "vitepress"
// 防止样式被vitepress污染 在class中设置
export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/] // 默认为 /base\.css/
    })
  ]
}
