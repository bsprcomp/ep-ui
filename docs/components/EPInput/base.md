---
pageClass: page
---

# EPInput 输入框组件

### 默认去除空格（^0.2.4）

:::demo 默认 EPinput 组件输入去除空格符，取消默认设置 `inputType=""`
EPInput/trim
:::

### 常见类型

:::demo
EPInput/base
:::

### 输入整数

:::demo 设置`inputType=integer`
EPInput/integer
:::

### 尺寸

:::demo
EPInput/size
:::

### 代码示例

```
<EPInput v-model="value" />
```

### EPInput 属性

---

### 配置参数

| 属性名    | 说明   | 类型                   | 默认值 |
| :-------- | :----- | :--------------------- | :----- |
| v-model   | 绑定值 | string                 | -      |
| inputType | 类型   | 文字:text,整数:integer | text   |

### 继承

| 属性名          | 说明                                                                                                            | 类型                                                                    | 默认值 |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------ |
| type            | 类型                                                                                                            | `enum`<TTip content="'text'\|'textarea'"/>                              | text   |
| v-model         | 绑定值                                                                                                          | `string/ number`                                                        | —      |
| maxlength       | 同原生 `maxlength` 属性                                                                                         | `string/ number`                                                        | —      |
| minlength       | 同原生 `minlength` 属性                                                                                         | `string/ number`                                                        | —      |
| show-word-limit | 是否显示字数统计，仅在 `type` 为 'text' 或 'textarea' 时生效                                                    | `boolean`                                                               | false  |
| placeholder     | 输入框占位文本                                                                                                  | `string`                                                                | —      |
| clearable       | 是否显示清除按钮，仅在 `type` 不是 'textarea' 时生效                                                            | `boolean`                                                               | false  |
| formatter       | 指定输入值的格式。（只有当 `type` 为 'text' 时才能工作）                                                        | `Funcion`<TTip content="(value: string \| number) =>txt"/>              | —      |
| parser          | 指定从格式化器输入中提取的值。（仅当 `type` 为 'text' 时才起作用）                                              | `Funcion`<TTip content="(value: string \| number) =>txt"/>              | —      |
| show-password   | 是否显示切换密码图标                                                                                            | boolean                                                                 | false  |
| disabled        | 是否禁用输入框                                                                                                  | boolean                                                                 | false  |
| size            | 输入框尺寸，仅在 `type` 不是 'textarea' 时有效                                                                  | `enum`<TTip content="'large' \| 'default' \| 'small' "/>                | —      |
| prefix-icon     | 自定义前缀图标                                                                                                  | string / Component                                                      | —      |
| suffix-icon     | 自定义后缀图标                                                                                                  | string / Component                                                      | —      |
| rows            | 输入框行数，仅在 `type` 为 'textarea' 时有效                                                                    | number                                                                  | 2      |
| autosize        | textarea 高度是否自适应，仅在 `type` 为 'textarea' 时生效。可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | boolean / object`{ minRows?: number, maxRows?: number }`                | false  |
| autocomplete    | 同原生 `autocomplete` 属性                                                                                      | string                                                                  | off    |
| name            | 同原生 `name` 属性                                                                                              | string                                                                  | —      |
| readonly        | 同原生 `readonly` 属性，是否只读                                                                                | boolean                                                                 | false  |
| max             | 同原生 `max` 属性                                                                                               | —                                                                       | —      |
| min             | 同原生 `min` 属性                                                                                               | —                                                                       | —      |
| step            | 同原生 `step` 属性                                                                                              | —                                                                       | —      |
| resize          | 控制是否能被用户缩放                                                                                            | `enum`<TTip content="'none' \| 'both' \| 'horizontal' \| 'vertical' "/> | —      |
| autofocus       | 同原生 `autofocus` 属性                                                                                         | boolean                                                                 | false  |
| form            | 同原生 `form` 属性                                                                                              | string                                                                  | —      |
| aria-label      | 同原生 `aria-label` 属性                                                                                        | string                                                                  | —      |

### 事件

| 名称   | 说明                                                                      | 类型                                        |
| ------ | ------------------------------------------------------------------------- | ------------------------------------------- |
| blur   | 当输入框失去焦点时触发                                                    | Function`(event: FocusEvent) => void`       |
| focus  | 当输入框获得焦点时触发                                                    | Function`(event: FocusEvent) => void`       |
| change | 当输入框失去焦点或用户按下 Enter 键时触发，仅当 modelValue 发生变化时触发 | Function`(value: string \| number) => void` |
| input  | 当输入框的值发生变化时触发                                                | Function`(value: string \| number) => void` |
| clear  | 当通过点击清除按钮清空输入框时触发                                        | Function`() => void`                        |

### 插槽

| 名称    | 说明                                               |
| ------- | -------------------------------------------------- |
| prefix  | 输入框前缀内容，仅在 `type` 不是 'textarea' 时生效 |
| suffix  | 输入框后缀内容，仅在 `type` 不是 'textarea' 时生效 |
| prepend | 输入框前置内容，仅在 `type` 不是 'textarea' 时生效 |
| append  | 输入框后置内容，仅在 `type` 不是 'textarea' 时生效 |
