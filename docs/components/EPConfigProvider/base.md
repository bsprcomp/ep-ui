# EPConfigProvider 配置组件

### 设置 EPTable 组件全局配置

:::demo 在需要对 EPTable 进行统一配置时，在最顶层组件使用 `EPConfigProvider组件`，使用 table 属性配置，如下全局配置 table 分页为`[15, 30, 50, 100]`等
EPConfigProvider/table
:::

### 设置 EPInput 组件全局配置(^0.6.1)

:::demo `EPInput`设置,例如设置最大字数`defaultMaxlength`和文本域的默认最大字数`textareaMaxlength`,设置显示字数长度`showWordLimit`等
EPConfigProvider/input
:::

### 设置 EPDatePicker 组件全局配置(^0.3.0)

:::demo `EPDatePicker`设置,例如设置`startPlaceholder: '开始日期'`
EPConfigProvider/datePicker
:::

### 设置 EPDialog 组件全局配置(^0.4.3)

:::demo `EPDialog`设置,例如全部配置`close-on-click-modal`，`draggable`等属性
EPConfigProvider/dialog
:::

### 2、配置参数

| 参数       | 说明                  | 类型                                                                                  | 默认值 |
| :--------- | :-------------------- | :------------------------------------------------------------------------------------ | :----- |
| table      | EPTable 全局配置      | `{pageProps:Object,heightlightClick:boolean}`                                         | -      |
| datePicker | EPDatePicker 全局配置 | `详细配置EPDatePicker`                                                                | -      |
| dialog     | dialog 全局配置       | `详细配置EPDialog`                                                                    | -      |
| input      | input 全局配置        | `详细配置EPInput` 以及对字数限制特有的两个属性`defaultMaxlength`和`textareaMaxlength` | -      |

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
