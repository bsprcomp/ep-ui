# EPCheckbox 多选框组

### 基础用法

:::demo 继承`el-checkbox`所有属性
EPCheckbox/base
:::

### button 类型

:::demo
EPCheckbox/button
:::

### 插槽

:::demo
EPCheckbox/slot
:::

### 可选项

:::demo 设置 props 属性，可设置 `value`, `label`, `disabled` 取值
EPCheckbox/props
:::

### 配置参数（Attributes）继承 el-checkboxGroup Attributes

| 参数         | 说明                 | 类型                          | 默认值    |
| :----------- | :------------------- | :---------------------------- | :-------- |
| v-model      | 绑定值               | Array                         | 无        |
| options      | 数据源               | Array                         | 无        |
| change       | 数据源               | Function                      | 无        |
| size         | 多选框的尺寸         | 'large' / 'default' / 'small' | 'default' |
| type         | 按钮样式             | 'check' / 'button'            | 'check'   |
| optionsProps | 配置选项，具体看下表 | object                        | -         |

### options 配置参数（Attributes）继承 el-checkbox Attributes

| 参数     | 说明     | 类型                        | 默认值 |
| :------- | :------- | :-------------------------- | :----- |
| value    | 绑定值   | `string / number / boolean` | 无     |
| label    | 显示值   | `string`                    | 无     |
| disabled | 是否禁用 | `Boolean`                   | false  |
| slot     | 插槽名称 | `string`                    | 无     |
| change   | 事件     | `Function`                  | 无     |

### optionsProps

| 参数     | 说明                                   | 类型     | 默认值     |
| :------- | :------------------------------------- | :------- | :--------- |
| value    | 指定节点绑定值为节点对象的某个属性值   | `string` | 'label'    |
| label    | 指定节点显示值为节点对象的某个属性值   | `string` | 'label'    |
| disabled | 指定节点是否禁用为节点对象的某个属性值 | `string` | 'disabled' |
