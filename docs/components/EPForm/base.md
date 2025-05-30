# EPDialog 动态表单组件

### 示例

:::demo
EPForm/login
:::

### 基础用法

:::demo
EPForm/base
:::

### 文本展示布局或编辑、禁止综合使用

:::demo
EPForm/showText
:::

### 多列展示 ColNum

:::demo 设置 ColNum（被 24 整除，内部 el-row,el-col 布局）
EPForm/ColNum
:::

### 间距 span 使用

:::demo 设置 span 1-24
EPForm/span
:::

### 行内表单(^0.0.9)

:::demo 设置 inline=true,有操作按钮时，默认左右 space-between 布局，调整间距使用 inlineGap(flex 的 gap) 属性，默认"16px 8px"
EPForm/inline
:::

### 自定义 label

:::demo labelRender 和 labelSlotName 使用
EPForm/CustomLabel
:::

### 自定义输入组件

:::demo
EPForm/CustomComp
:::

### 自定义操作

:::demo
EPForm/CustomOperator
:::

### 配置参数

| 参数          | 说明                                                                                   | 类型                                            | 默认值  |
| :------------ | :------------------------------------------------------------------------------------- | :---------------------------------------------- | :------ |
| v-model       | 表单数据对象                                                                           | `Object` <t-tip content="Record<string, any>"/> | —       |
| formItems     | form 表单每项 el-form-item                                                             | `Array`                                         | —       |
| labelPosition | 改变表单项 label 与输入框的布局方式(`right,left,top`)                                  | `String`                                        | 'right' |
| colNum        | 显示几列（默认一列，内部使用 el-row,el-col,`colNum`要被 24 整除）                      | Number                                          | 1       |
| labelWidth    | label 宽度                                                                             | String                                          | 120px   |
| valueWidth    | 输入宽度                                                                               | String                                          | 100%    |
| rules         | 校验规则（可参考 element-plus el-form 方式配置,设置后完全覆盖 formItems 配置的 rules） | Object/Array                                    | -       |
| btnSlotName   | 操作按钮插槽命名                                                                       | String                                          | -       |
| operatorList  | 操作按钮 list，见如下表                                                                | Array                                           | -       |

#### 事件

| 名称       | 说明           | 类型       |
| ---------- | -------------- | ---------- |
| formChange | 表单值变化监听 | `Function` |

#### operatorList 配置

| 参数      | 说明                           | 类型     | 默认值             |
| :-------- | :----------------------------- | :------- | :----------------- |
| bind      | 继承 el-button 所有 Attributes | Object   | `{type:'primary'}` |
| fun       | 事件名                         | function | -                  |
| isHideBtn | 是否隐藏按钮                   | Boolean  | false              |

#### formItems 配置

| 参数          | 说明                                                                             | 类型                                                                                                                                        | 默认值 |
| :------------ | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :----- |
| prop          | el-form-item prop                                                                | `String`                                                                                                                                    | -      |
| text          | 当 comp 为 `el-radio`和 `el-checkbox` 中 label 属性 使用 text 代替               | `String`                                                                                                                                    | -      |
| label         | el-form-item label                                                               | `String`                                                                                                                                    | -      |
| hidden        | 是否隐藏                                                                         | `Boolean`                                                                                                                                   | false  |
| comp          | 表单每一项组件名称（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | `Boolean`                                                                                                                                   | false  |
| type          | 某一项类型<t-tip content='(例如EPDatePicker等)'/>                                | `String`                                                                                                                                    | -      |
| colNum        | form 表单某一项所占比例(如果占一整行则设置 1,被 24 整除)                         | `Number`                                                                                                                                    | -      |
| width         | form 表单某一项所占实际宽度                                                      | `String`                                                                                                                                    | 200px  |
| labelRender   | 自定义某一项 title                                                               | `(item)=>VNode `                                                                                                                            | -      |
| labelSlotName | 自定义某一项 title（插槽名：就是 labelSlotName 值                                | `slot`                                                                                                                                      | -      |
| rules         | 每一项输入框的表单校验规则（可参考 element-plus el-form-item 方式配置）          | `Object/Array `                                                                                                                             | -      |
| options       | 下拉选择数据源（`type:'select'\|'EPCheckbox'\|'EPRadio'`生效）                   | `{label:string,value:any}[]`                                                                                                                | -      |
| shortcutsName | type:"EPDataPicker" 生效                                                         | `String` <t-tip content="year\| years\|month\|months\|date\|dates\|datetime\|week\|datetimerange\|daterange\|monthrange\|yearrange\|date"/> | -      |
