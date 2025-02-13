# EPTable 表格

### 完整示例

:::demo
EPTable/completeExample
:::

### 基础用法

:::demo 组件只需简单配置 data 数据源和 columns 就能快速展示列表
EPTable/base
:::

### 显示操作列

:::demo 注意：操作列支持子数组 children 功能 `^0.2.8`，如下`更多`
EPTable/operation
:::

### 操作列开启(`operationType: "rowEdit"`)行编辑（需配和 `inputType` 使用）

:::demo 默认支持 input,select,radio,time,其他类型使用 custom 自定义;使用自定义时，参数改变需 `属性+"EditValue"`
EPTable/rowEdit
:::

### 操作列复杂操作（按钮禁止，按钮自定义渲染，按钮是否显示）

:::demo
EPTable/customColumn
:::

### 显示分页

:::demo `isShowPagination` 默认值 `true`显示分页,`v-model:page` 接收 page 变化 `{current:1, size:10,total:0}`，total 需要手动赋值; `reserveSelection:true` 支持分页反选
EPTable/isShowPagination
:::

### 分页属性设置 pageProps

:::demo 默认分页 size， 当前页为 page，如需更改默认，使用 currentPage 和 pageSize 映射
EPTable/paginationProps
:::

### 分页 layout 新增 jumpTotal（^0.4.1）

:::demo `layout='prev,jumpTotal,next'`
EPTable/jumpTotal
:::

### 索引

:::demo columns 中设置`type:'index'`开启索引。索引在`isShowPagination为true`的情况下，分页递增，如需还原默认设置，设置 index:undefined
EPTable/indexCom
columns 中一项 设置 type 为 index
:::

### 复选框

:::demo v-model:check 绑定（需配合 rowKey 使用，rowKey 组件已默认`id`;支持默认选中）
EPTable/check
:::

### 复选框支持默认选中

:::demo 考虑到后端分页，默认选中需要开启 `reserveSelection:true` 反选功能，示例：`{ type: "selection", width: "55", reserveSelection: true }`
EPTable/defaultCheck
:::

### 使用 filterCheckList 方法 ，过滤 checkList

:::demo
EPTable/filterCheckList
:::

### 列菜单设置 isShowMenu

:::demo 仅对有 prop 属性且不为 operation（操作列，序号，复选框等不要排序），如需对单个列不显示设置，设置` hiddenMenu:true`;如何完全隐藏单个列以及其列设置，设置 `hiddenAll:true`;如需仅默认初始不显示列且可以通过列设置打开显示，设置 `hidden:true`
EPTable/columnSetting
:::

### 按钮插槽

:::demo
EPTable/btnSlot
:::

### 排序-前端排序

:::demo
EPTable/sort
:::

### 排序-后端排序

:::demo table 设置 sortable="custom"开启全部后端排序，部分排序可以在 columns 中设置，设置 v-modal:sortParam 接收排序属性`{ascs|descs:prop}`。如需更改默认使用 ascs|descs 映射，例如设置 descs='customDescs',`{ascs|customDescs:prop}`
EPTable/sortBackend
:::

### 列 render/formatter/slotName 渲染

:::demo
EPTable/render
:::

### 自定义表头渲染

:::demo
EPTable/renderHeader
:::

### 展开行

:::demo 在`table`对象中添加`firstColumn:{ type: 'expand', fixed: true }` `expand`作用域插槽，解构传出`{scope}`
EPTable/expand
:::

### EPTable 参数配置

## 表格 API

### 快速配置参数

| 参数                  | 说明                                                                                                    | 类型                                          | 默认值 |
| :-------------------- | :------------------------------------------------------------------------------------------------------ | :-------------------------------------------- | :----- |
| data                  | 列表数据                                                                                                | `Array`                                       | []     |
| columns               | 表头信息 示例如下                                                                                       | `Array`                                       | []     |
| border                | 是否开启边框线                                                                                          | `Boolean`                                     | false  |
| loading               | table loading 动画                                                                                      | `Boolean`                                     | false  |
| is-show-pagination    | 是否显示分页                                                                                            | `Boolean`                                     | false  |
| is-show-menu          | 是否显示列菜单，需要配合 name 使用 （菜单可以拖拽排序）                                                 | `Boolean`                                     | false  |
| name                  | table 唯一名称，项目不能重复，用于 lolocalStorage 缓存 menu                                             | `Boolean`                                     | false  |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip                                                                          | `Boolean`\/`object(element-plus 2.2.28 支持)` | true   |
| v-model:page          | page 双向绑定，页面默认应设置`const page = reactive({ size: 10\|20\|50\|100, page: 1, total: 0 })`      | `Object`                                      |        |
| pageProps             | 继承 el-pagination 所有属性。`注：pageSize 和 currentPage 两参数赋予特殊意义，见下面单独说明 pageProps` |                                               |        |

### columns ts 属性如下

```javascript
  type columns= ({
    type?: "index" | "selection" | "expand"
    prop?: string
    label?: string
    width?: string
    minWidth?: string
    hiddenMenu?: boolean // 隐藏列设置选项
    hiddenAll?: boolean // 隐藏列并且隐藏列选项
    hidden?: boolean // 默认仅仅初始隐藏列
    render?:(row,index)=>VNode|string // (封装新增)
    formatter?: (row: any, column: any, cellValue: any, index: number) => VNode | string //（element-plus 提供，格式化单元格内容）
    slotName?:string // 插槽渲染列
    [x: string]: any
  } & {
    // 操作按钮 中 使用el-button封装，继承EPButton所有属性
    operation: {
      label?: string
      width?: string
      hidden?: boolean|(row: any, scope:any) => boolean  //布尔值|函数类型
      operationType?: "rowEdit" // rowEdit 为开启行编辑，配合inputType使用
      func: (row:any,scope:any)=>{}
      disabled?: boolean
      isDisabled?: (row: any, index: number) => boolean
      slotName?: string
      render?: (row: any) =>VNode | string
      isShowConfirm?:boolean //是否显示确认弹框
      msg?:boolean //显示确认弹框时，删除提示
      //
    }[]
```

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

  // pageProps 中pageSize和currentPage 无需改动情况
  const page=reactive({page:1,size:10,total:0})
    // pageProps 中pageSize和currentPage 需要变动情况
  const page=reactive({pageIndex:1,pageSize:10,total:0})
  const pageProps={pageSize:"pageSize",currentPage:"pageIndex"}

```

### 表格属性

| 名称                            | 描述                                                                                                                                                                                                          | 类型                                                                                                                                              | 默认值                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| data                            | 表格数据                                                                                                                                                                                                      | `any[]`                                                                                                                                           | []                                                                           |
| height                          | 表格的高度。默认情况下，高度为 `auto`。如果值为数字，则高度以像素为单位测量；如果值为字符串，则该值将分配给元素的 `style.height`，高度受外部样式影响。                                                        | `string` / `number`                                                                                                                               | —                                                                            |
| max-height                      | 表格的最大高度。合法值为数字或以 px 为单位的高度。                                                                                                                                                            | `string` / `number`                                                                                                                               | —                                                                            |
| stripe                          | 表格是否为条纹表格。                                                                                                                                                                                          | `boolean`                                                                                                                                         | false                                                                        |
| border                          | 表格是否有垂直边框。                                                                                                                                                                                          | `boolean`                                                                                                                                         | false                                                                        |
| size                            | 表格的大小。                                                                                                                                                                                                  | `enum`：`'' \| 'large' \| 'default' \| 'small'`                                                                                                   | —                                                                            |
| fit                             | 列的宽度是否自动适应其容器。                                                                                                                                                                                  | `boolean`                                                                                                                                         | true                                                                         |
| show-header                     | 表格头部是否可见。                                                                                                                                                                                            | `boolean`                                                                                                                                         | true                                                                         |
| highlight-current-row           | 当前行是否高亮显示。                                                                                                                                                                                          | `boolean`                                                                                                                                         | false                                                                        |
| current-row-key                 | 当前行的键，仅作为设置属性。                                                                                                                                                                                  | `string` / `number`                                                                                                                               | —                                                                            |
| row-class-name                  | 返回自定义行类名的函数，或为每行分配类名的字符串。                                                                                                                                                            | `Function` `(data: { row: any, rowIndex: number }) => string` / `string`                                                                          | —                                                                            |
| row-style                       | 返回自定义行样式的函数，或为每行分配自定义样式的对象。                                                                                                                                                        | `Function` `(data: { row: any, rowIndex: number }) => CSSProperties` / `CSSProperties`                                                            | —                                                                            |
| cell-class-name                 | 返回单元格自定义类名的函数，或为每个单元格分配类名的字符串。                                                                                                                                                  | `Function` `(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string` / `string`                                        | —                                                                            |
| cell-style                      | 返回单元格自定义样式的函数，或为每个单元格分配样式的对象。                                                                                                                                                    | `Function` `(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties` / `CSSProperties`                          | —                                                                            |
| header-row-class-name           | 返回表头行自定义类名的函数，或为每个表头行分配类名的字符串。                                                                                                                                                  | `Function` `(data: { row: any, rowIndex: number }) => string` / `string`                                                                          | —                                                                            |
| header-row-style                | 返回表头行自定义样式的函数，或为每个表头行分配样式的对象。                                                                                                                                                    | `Function` `(data: { row: any, rowIndex: number }) => CSSProperties` / `CSSProperties`                                                            | —                                                                            |
| header-cell-class-name          | 返回表头单元格自定义类名的函数，或为每个表头单元格分配类名的字符串。                                                                                                                                          | `Function` `(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string` / `string`                                        | —                                                                            |
| header-cell-style               | 返回表头单元格自定义样式的函数，或为每个表头单元格分配样式的对象。                                                                                                                                            | `Function` `(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties` / `CSSProperties`                          | —                                                                            |
| row-key                         | 行数据的键，用于优化渲染。如果启用了 `reserve-selection` 或显示树形数据，则该属性是必需的。当其类型为字符串时，支持多级访问，例如 `user.info.id`，但不支持 `user.info[0].id`，在这种情况下应使用 `Function`。 | `Function` `(row: any) => string` / `string`                                                                                                      | —                                                                            |
| empty-text                      | 当数据为空时显示的文本。可以使用 `#empty` 自定义此区域。                                                                                                                                                      | `string`                                                                                                                                          | No Data                                                                      |
| default-expand-all              | 是否默认展开所有行，仅在表格具有 `column type="expand"` 或包含树形结构数据时有效。                                                                                                                            | `boolean`                                                                                                                                         | false                                                                        |
| expand-row-keys                 | 通过此属性设置展开行，属性值是展开行的键，在使用此属性之前应先设置 `row-key`。                                                                                                                                | `string[]`                                                                                                                                        | —                                                                            |
| default-sort                    | 设置默认排序的列和顺序。属性 `prop` 用于设置默认排序列，属性 `order` 用于设置默认排序顺序。                                                                                                                   | `object` `Sort`                                                                                                                                   | 如果设置了 `prop`，且未设置 `order`，则 `order` 默认为升序。                 |
| append-filter-panel-to ^(2.8.4) | 过滤面板附加到哪个元素。                                                                                                                                                                                      | `string`                                                                                                                                          | —                                                                            |
| show-summary                    | 是否显示汇总行。                                                                                                                                                                                              | `boolean`                                                                                                                                         | false                                                                        |
| sum-text                        | 汇总行第一列显示的文本。                                                                                                                                                                                      | `string`                                                                                                                                          | Sum                                                                          |
| summary-method                  | 自定义汇总方法。                                                                                                                                                                                              | `Function` `(data: { columns: any[], data: any[] }) => (VNode \| string)[]`                                                                       | —                                                                            |
| span-method                     | 返回行合并和列合并的函数。                                                                                                                                                                                    | `Function` `(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => number[] \| { rowspan: number, colspan: number } \| void` | —                                                                            |
| select-on-indeterminate         | 控制多选表格中主复选框的行为，当仅选择了一些行（但不是全部）时。如果为真，则将选择所有行，否则取消选择。                                                                                                      | `boolean`                                                                                                                                         | true                                                                         |
| indent                          | 树形数据的水平缩进。                                                                                                                                                                                          | `number`                                                                                                                                          | 16                                                                           |
| lazy                            | 是否延迟加载数据。                                                                                                                                                                                            | `boolean`                                                                                                                                         | false                                                                        |
| load                            | 加载子行数据的方法，仅在 `lazy` 为真时生效。                                                                                                                                                                  | `Function` `(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void`                                                               | —                                                                            |
| tree-props                      | 渲染嵌套数据的配置。                                                                                                                                                                                          | `object` `{ hasChildren?: string, children?: string, checkStrictly?: boolean }`                                                                   | `{ hasChildren: 'hasChildren', children: 'children', checkStrictly: false }` |
| table-layout                    | 设置用于布局表格单元格、行和列的算法。                                                                                                                                                                        | `enum`：`'fixed' \| 'auto'`                                                                                                                       | fixed                                                                        |
| scrollbar-always-on             | 是否始终显示滚动条。                                                                                                                                                                                          | `boolean`                                                                                                                                         | false                                                                        |
| show-overflow-tooltip           | 是否隐藏多余内容并在单元格悬停时通过工具提示显示。影响所有表格列，参考表格 [tooltip-options](#table-attributes)。                                                                                             | `boolean` / `object`                                                                                                                              | —                                                                            |
| flexible ^(2.2.1)               | 确保主轴最小大小不受内容影响。                                                                                                                                                                                | `boolean`                                                                                                                                         | false                                                                        |
| scrollbar-tabindex ^(2.8.3)     | 主体滚动条的包装容器的 tabindex。                                                                                                                                                                             | `string` / `number`                                                                                                                               | —                                                                            |

### columns 元素 继承 el-table-column 属性

| 名称                       | 描述                                                                                                                                                   | 类型                                                                                                                                                                         | 默认值                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                       | 列的类型。如果设置为 `selection`，则该列将显示复选框。如果设置为 `index`，则该列将显示行索引（从 1 开始）。如果设置为 `expand`，则该列将显示展开图标。 | `enum`：`'default' \| 'selection' \| 'index' \| 'expand'`                                                                                                                    | default                           |
| index                      | 自定义每行的索引，仅在 `type=index` 的列上有效。                                                                                                       | `number` / `Function` `(index: number) => number`                                                                                                                            | —                                 |
| label                      | 列的标签。                                                                                                                                             | `string`                                                                                                                                                                     | —                                 |
| column-key                 | 列的键。如果需要使用 `filter-change` 事件，则需要此属性以标识正在过滤的列。                                                                            | `string`                                                                                                                                                                     | —                                 |
| prop                       | 字段名称。也可以使用其别名 `property`。                                                                                                                | `string`                                                                                                                                                                     | —                                 |
| width                      | 列的宽度。                                                                                                                                             | `string` / `number`                                                                                                                                                          | ''                                |
| min-width                  | 列的最小宽度。具有 `width` 的列宽度是固定的，而具有 `min-width` 的列宽度按比例分配。                                                                   | `string` / `number`                                                                                                                                                          | ''                                |
| fixed                      | 列是否固定在左侧或右侧。如果为 `true`，则固定在左侧。                                                                                                  | `enum`：`'left' \| 'right'` / `boolean`                                                                                                                                      | false                             |
| sortable                   | 列是否可以排序。远程排序可以通过将此属性设置为 `'custom'` 并监听 `sort-change` 事件来实现。                                                            | `boolean` / `string`                                                                                                                                                         | false                             |
| sort-method                | 排序方法，当 `sortable` 为 `true` 时有效。应返回一个数字，类似于 `Array.sort`。                                                                        | `Function` `<T = any>(a: T, b: T) => number`                                                                                                                                 | —                                 |
| sort-by                    | 指定按哪个属性排序，当 `sortable` 为 `true` 且 `sort-method` 未定义时有效。如果设置为数组，则在前一个属性相等时，按下一个属性顺序排序。                | `Function` `(row: any, index: number) => string` / `string` / `object` `string[]`                                                                                            | —                                 |
| sort-orders                | 排序策略的顺序，当 `sortable` 为 `true` 时有效。接受一个数组，当用户单击表头时，列按数组中的元素顺序排序。                                             | `object` `('ascending' \| 'descending' \| null)[]`                                                                                                                           | ['ascending', 'descending', null] |
| resizable                  | 列宽是否可以调整，适用于 `el-table` 的 `border` 为 `true` 时。                                                                                         | `boolean`                                                                                                                                                                    | true                              |
| formatter                  | 格式化单元格内容的函数。                                                                                                                               | `function` `(row: any, column: any, cellValue: any, index: number) => VNode \| string`                                                                                       | —                                 |
| show-overflow-tooltip      | 是否隐藏多余内容并在单元格悬停时通过工具提示显示。                                                                                                     | `boolean` / `object`                                                                                                                                                         | undefined                         |
| align                      | 对齐方式。                                                                                                                                             | `enum`：`'left' \| 'center' \| 'right'`                                                                                                                                      | left                              |
| header-align               | 表头的对齐方式。如果省略，将应用上述 `align` 属性的值。                                                                                                | `enum`：`'left' \| 'center' \| 'right'`                                                                                                                                      | left                              |
| class-name                 | 列中单元格的类名。                                                                                                                                     | `string`                                                                                                                                                                     | —                                 |
| label-class-name           | 此列标签的类名。                                                                                                                                       | `string`                                                                                                                                                                     | —                                 |
| selectable                 | 确定某一行是否可以被选中的函数，仅在 `type` 为 `selection` 时有效。                                                                                    | `Function` `(row: any, index: number) => boolean`                                                                                                                            | —                                 |
| reserve-selection          | 数据刷新后是否保留选择，仅在 `type` 为 `selection` 时有效。注意需要 `row-key` 才能工作。                                                               | `boolean`                                                                                                                                                                    | false                             |
| filters                    | 数据过滤选项的数组。该数组中每个元素都需要 `text` 和 `value`。                                                                                         | `object` `Array<{text: string, value: string}>`                                                                                                                              | —                                 |
| filter-placement           | 过滤下拉菜单的位置。                                                                                                                                   | `enum`：`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | —                                 |
| filter-class-name ^(2.5.0) | 过滤下拉菜单的类名。                                                                                                                                   | `string`                                                                                                                                                                     | —                                 |
| filter-multiple            | 数据过滤是否支持多个选项。                                                                                                                             | `boolean`                                                                                                                                                                    | true                              |
| filter-method              | 数据过滤方法。如果 `filter-multiple` 为启用状态，此方法将在每行上多次调用，如果其中一个调用返回 `true`，则该行将显示。                                 | `function` `(value: any, row: any, column: any) => void`                                                                                                                     | —                                 |
| filtered-value             | 选定数据的过滤值，当表头使用 `render-header` 渲染时可能会有用。                                                                                        | `object` `string[]`                                                                                                                                                          | —                                 |

### 5、Slots 插槽

| 插槽名 | 说明                                                | 参数  |
| :----- | :-------------------------------------------------- | :---- |
| extra  | EPTable 顶部 extra 插槽                             | -     |
| button | EPTable header 行 左侧 button 插槽                  | -     |
| input  | EPTable header 行 右侧 input 插槽                   | -     |
| expand | table.firstColumn.type：`expand` 展开行插槽         | scope |
| -      | el-table-column 某列自定义插槽（slotName 命名）     | scope |
| -      | el-table-column 单元格编辑插槽（editSlotName 命名） | scope |
