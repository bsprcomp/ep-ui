# EPConfigProvider 配置组件

### 设置 EPTable 组件全局配置

:::demo
EPConfigProvider/base
:::

### 2、配置参数

| 参数  | 说明             | 类型                                          | 默认值 |
| :---- | :--------------- | :-------------------------------------------- | :----- |
| table | EPTable 全局配置 | `{pageProps:Object,heightlightClick:boolean}` | -      |

### pageProps ts 如下

```javascript
// 配置分页
  type pageProps= {
    size?: "" | "default" | "small" | "large"
    pageSize?: string //默认值 "size"， 和page中当前页数属性映射
    currentPage?: string// 默认值"page" ，和page中每页显示条目个数属性映射
    layout?: string
    pageSizes?: number[]
    background?: boolean
  }
```
