# EPButton 按钮组件

### 基础用法

:::demo
EPButton/base
:::

### 禁止多次点击

:::demo
EPButton/antiClick
:::

### 提示文字

:::demo 使用 `type、size、tip、icon`和`placement`属性来定义 Button 的样式；
EPButton/tip
:::

### 是否需要防抖

:::demo 通过设置 `isDebounce` ，可以选择是否开启防抖，默认为 true
EPButton/isDebounce
:::

### 2、配置参数

| 参数       | 说明                                                         | 类型             | 默认值 |
| :--------- | :----------------------------------------------------------- | :--------------- | :----- |
| value      | 值                                                           | `string\|number` | -      |
| time       | 防抖的时间                                                   | `number`         | 500    |
| antiClick  | 是否开启防止重复加载(loading 动画)                           | `boolean`        | false  |
| isDebounce | 是否开启防抖                                                 | `boolean`        | false  |
| tip        | 提示文字，常用于 type="text" 或拥有 text，link 属性的 button | `string`         | -      |
| tipProps   | Tooltip 组件的配置参数，详情可看 element-plus 官网           | `object`         | -      |

### 继承

| Name              | Description                                       | Type                                                                                      | Default |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------- |
| size              | 按钮大小                                          | `enum` `'large' \| 'default' \| 'small'`                                                  | —       |
| type              | 按钮类型                                          | `enum` `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text' (deprecated)` | —       |
| plain             | 确定是否为朴素按钮                                | `boolean`                                                                                 | false   |
| text ^(2.2.0)     | 确定是否为文本按钮                                | `boolean`                                                                                 | false   |
| bg ^(2.2.0)       | 确定文本按钮的背景颜色是否始终显示                | `boolean`                                                                                 | false   |
| link ^(2.2.1)     | 确定是否为链接按钮                                | `boolean`                                                                                 | false   |
| round             | 确定是否为圆形按钮                                | `boolean`                                                                                 | false   |
| circle            | 确定是否为圆形按钮                                | `boolean`                                                                                 | false   |
| loading           | 确定按钮是否正在加载                              | `boolean`                                                                                 | false   |
| loading-icon      | 自定义加载图标组件                                | `string` / `Component`                                                                    | Loading |
| disabled          | 禁用按钮                                          | `boolean`                                                                                 | false   |
| icon              | 图标组件                                          | `string` / `Component`                                                                    | —       |
| autofocus         | 同原生按钮的 `autofocus` 属性                     | `boolean`                                                                                 | false   |
| native-type       | 同原生按钮的 `type` 属性                          | `enum` `'button' \| 'submit' \| 'reset'`                                                  | button  |
| auto-insert-space | 自动在两个中文字符之间插入空格                    | `boolean`                                                                                 | —       |
| color             | 自定义按钮颜色，自动计算 `hover` 和 `active` 颜色 | `string`                                                                                  | —       |
| dark              | 暗黑模式，自动将 `color` 转换为暗黑模式颜色       | `boolean`                                                                                 | false   |
| tag ^(2.3.4)      | 自定义元素标签                                    | `string` / `Component`                                                                    | button  |
