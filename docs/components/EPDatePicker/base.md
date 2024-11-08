# EPDatePicker 日期选择器

---

### 选择某一天

::: demo
EPDatePicker/singleDate
:::

### 日期范围选择

::: demo
EPDatePicker/dateRange
:::

### 月份范围选择

::: demo
EPDatePicker/month
:::

### 日期&时间范围选择

::: demo
EPDatePicker/dateTime
:::

### 自定义内容

::: demo
EPDatePicker/slotCustomize
:::

### 自定义图标 `2.8.0`

::: demo 使用插槽自定义图标。
EPDatePicker/customIcon
:::

### 自定义前缀

::: demo 前缀内容可以被自定义。当你从其他 vue 组件或由渲染函数生成的组件中导入组件时, 你可以设置 prefix-icon 属性来定制前缀内容。
EPDatePicker/customPrefixIcon
:::

### 配置参数

| 参数         | 说明                           | 类型                                                                                      | 默认值    |
| :----------- | :----------------------------- | :---------------------------------------------------------------------------------------- | :-------- |
| v-model      | 绑定值，如果是数组，长度应为 2 | `number / string]/ ` object <t-tip content="`Date \| [Date, Date] \| [string, string] "/> | ""        |
| options      | 数据源                         | Array                                                                                     | 无        |
| change       | 数据源                         | Function                                                                                  | 无        |
| size         | 多选框的尺寸                   | 'large' / 'default' / 'small'                                                             | 'default' |
| type         | 按钮样式                       | 'check' / 'button'                                                                        | 'check'   |
| optionsProps | 配置选项，具体看下表           | object                                                                                    | -         |

## API

### Attributes

| Name                           | Description                                                                                                                 | Type                                                                                                                                                               | Default       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `readonly`                     | 日期选择器是否为只读                                                                                                        | `^[boolean]`                                                                                                                                                       | `false`       |
| `disabled`                     | 日期选择器是否禁用                                                                                                          | `^[boolean]`                                                                                                                                                       | `false`       |
| `size`                         | 输入框的大小                                                                                                                | `^[enum]` `'' \| 'large' \| 'default' \| 'small'`                                                                                                                  | —             |
| `editable`                     | 输入框是否可编辑                                                                                                            | `^[boolean]`                                                                                                                                                       | `true`        |
| `clearable`                    | 是否显示清除按钮                                                                                                            | `^[boolean]`                                                                                                                                                       | `true`        |
| `placeholder`                  | 非范围模式下的占位符                                                                                                        | `^[string]`                                                                                                                                                        | `''`          |
| `start-placeholder`            | 范围模式中开始日期的占位符                                                                                                  | `^[string]`                                                                                                                                                        | —             |
| `end-placeholder`              | 范围模式中结束日期的占位符                                                                                                  | `^[string]`                                                                                                                                                        | —             |
| `type`                         | 选择器的类型                                                                                                                | `^[enum]` `'year' \| 'years' \| 'month' \| 'months' \| 'date' \| 'dates' \| 'datetime' \| 'week' \| 'datetimerange' \| 'daterange' \| 'monthrange' \| 'yearrange'` | `date`        |
| `format`                       | 输入框中显示值的格式                                                                                                        | `^[string]` 参见 [日期格式](/en-US/component/date-picker#date-formats)                                                                                             | `YYYY-MM-DD`  |
| `popper-class`                 | 日期选择器下拉框的自定义类名                                                                                                | `^[string]`                                                                                                                                                        | —             |
| `popper-options`               | 自定义的 popper 选项，详情见 [popper.js]                                                                                    | `^[object]` `Partial<PopperOptions>`                                                                                                                               | `{}`          |
| `range-separator`              | 范围分隔符                                                                                                                  | `^[string]`                                                                                                                                                        | `'-'`         |
| `default-value`                | 可选，日历的默认日期                                                                                                        | `^[object]` `Date \| [Date, Date]`                                                                                                                                 | —             |
| `default-time`                 | 可选，选择日期范围时使用的时间值                                                                                            | `^[object]` `Date \| [Date, Date]`                                                                                                                                 | —             |
| `value-format`                 | 可选，绑定值的格式。如果未指定，绑定值将是一个 Date 对象                                                                    | `^[string]` 参见 [日期格式](/en-US/component/date-picker#date-formats)                                                                                             | —             |
| `id`                           | 与原生输入的 `id` 相同                                                                                                      | `^[string] / ^[object]` `[string, string]`                                                                                                                         | —             |
| `name`                         | 与原生输入的 `name` 相同                                                                                                    | `^[string] / ^[object]` `[string, string]`                                                                                                                         | `''`          |
| `unlink-panels`                | 在范围选择器中解除两个日期面板的链接                                                                                        | `^[boolean]`                                                                                                                                                       | `false`       |
| `prefix-icon`                  | 自定义前缀图标组件。默认情况下，如果 `type` 的值为 `TimeLikeType`，值为 `Clock`，否则为 `Calendar`                          | `^[string] / ^[object]` `Component`                                                                                                                                | `''`          |
| `clear-icon`                   | 自定义清除图标组件                                                                                                          | `^[string] / ^[object]` `Component`                                                                                                                                | `CircleClose` |
| `validate-event`               | 是否触发表单验证                                                                                                            | `^[boolean]`                                                                                                                                                       | `true`        |
| `disabled-date`                | 一个函数，用于确定某个日期是否禁用，以该日期作为参数。应返回布尔值                                                          | `^[Function]` `(data: Date) => boolean`                                                                                                                            | —             |
| `shortcuts`                    | 设置快捷选项的对象数组                                                                                                      | `^[object]` `Array<{ text: string, value: Date \| Function }>`                                                                                                     | `[]`          |
| `cell-class-name`              | 设置自定义类名                                                                                                              | `^[Function]` `(data: Date) => string`                                                                                                                             | —             |
| `teleported`                   | 日期选择器下拉框是否传送到 body                                                                                             | `^[boolean]`                                                                                                                                                       | `true`        |
| `empty-values ^(2.7.0)`        | 组件的空值，[见 config-provider](https://element-plus.org/en-US/component/config-provider.html#empty-values-configurations) | `^[array]`                                                                                                                                                         | —             |
| `value-on-clear ^(2.7.0)`      | 清除返回值，[见 config-provider](https://element-plus.org/en-US/component/config-provider.html#empty-values-configurations) | `^[string] / ^[number] / ^[boolean] / ^[Function]`                                                                                                                 | —             |
| `fallback-placements ^(2.8.4)` | Tooltip 的可能位置列表 [popper.js]                                                                                          | `^[array]` `Placement[]`                                                                                                                                           | —             |
| `placement ^(2.8.4)`           | 下拉框的位置                                                                                                                | `Placement`                                                                                                                                                        | `bottom`      |

### Events

| Name              | Description                     | Type                                                                                         |
| ----------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| `change`          | 用户确认值时触发                | `^[Function]` `(val: typeof v-model) => void`                                                |
| `blur`            | 输入框失去焦点时触发            | `^[Function]` `(e: FocusEvent) => void`                                                      |
| `focus`           | 输入框获得焦点时触发            | `^[Function]` `(e: FocusEvent) => void`                                                      |
| `clear ^(2.7.7)`  | 点击清除图标时触发              | `^[Function]` `() => void`                                                                   |
| `calendar-change` | 选择的日期发生变化时触发        | `^[Function]` `(val: [Date, null \| Date]) => void`                                          |
| `panel-change`    | 点击导航按钮时触发              | `^[Function]` `(date: Date \| [Date, Date], mode: 'month' \| 'year', view?: string) => void` |
| `visible-change`  | 日期选择器下拉框出现/消失时触发 | `^[Function]` `(visibility: boolean) => void`                                                |

### Slots

| Name                  | Description          |
| --------------------- | -------------------- |
| `default`             | 自定义单元格内容     |
| `range-separator`     | 自定义范围分隔符内容 |
| `prev-month ^(2.8.0)` | 上一个月图标         |
| `next-month ^(2.8.0)` | 下一个月图标         |
| `prev-year ^(2.8.0)`  | 上一年图标           |
| `next-year ^(2.8.0)`  | 下一年图标           |
