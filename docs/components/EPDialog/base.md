# EPForm 表单弹框组件

### 基础用法

:::demo
EPDialog/base
:::

### 设置弹框内容高度 height（^0.2.1）

:::demo 弹框超出此高度自动滚动
EPDialog/dialogHeight
:::

### 设置弹框内容最大高度 max-height（^0.2.1）

:::demo 弹框超出此高度自动滚动
EPDialog/dialogMaxHeight
:::

### 取消和确认按钮隐藏

:::demo hiddenCancelBtn 和 hiddensubmitBtn 使用
EPDialog/HiddenBtn
:::

### 多列展示

:::demo
EPDialog/colNum
:::

### EPForm 插槽使用--举例

:::demo 可以使用 EPForm 所有插槽，详见 EPForm
EPDialog/CustomComp
:::

### EPDialog 插槽使用

:::demo EPDialog 包含 el-dialog 插槽 header 和 footer 以及自身插槽 content、top 和 bootom
EPDialog/slot
:::

### 配置参数

| 参数           | 说明                                         | 类型                                                                                              | 默认值 |
| :------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------ | :----- |
| v-model:params | 表单数据对象                                 | `Object` <t-tip content="Record<string, any>"/>                                                   | —      |
| v-model        | 是否显示 Dialog 例如`v-model=dialogVisible`  | `boolean`                                                                                         | —      |
| max-height     | 弹框内容最大高度（例如`max-height="400px"`） | String                                                                                            | -      |
| height         | 弹框内容高度 （例如`height="400px"`）        | String                                                                                            | -      |
| title          | Dialog 对话框 Dialog 的标题                  | `string`                                                                                          | ""     |
| width          | 对话框的宽度                                 | `string`/`number`                                                                                 | 600    |
| formItems      | 表单配置                                     | [跳转](https://bsprcomp.github.io/ep-ui/components/EPForm/base.html#formitems-%E9%85%8D%E7%BD%AE) | 600    |

### 事件

| 事件名       | 说明                           |
| ------------ | ------------------------------ |
| handleSubmit | 确认按钮提交（会先验证 rules） |
| handleCancel | 弹框取消                       |

### Slots

| 插槽名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| header  | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer  | Dialog 按钮操作区的内容，默认显示取消，保存            |
| content | Dialog 主体内容插槽，在不适用 formItems 时，可以使用   |
| top     | 显示在 formItems 上                                    |
| bootom  | 显示在 formItems 下 ，以及 content 插槽 下             |
| ---     | EPForm 所有插槽                                        |
