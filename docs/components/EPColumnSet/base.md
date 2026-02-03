# EPColumnSet 表头拖拽排序隐藏（此功能从 EPTable 中抽取成一个独立组件，更加灵活使用）

### 搭配 EPFrom 使用

:::demo
EPColumnSet/EPColumnSet
:::

### EPColumnSet 参数配置

| 参数          | 说明                                                     | 类型       | 默认值 |
| :------------ | :------------------------------------------------------- | :--------- | :----- |
| name          | 列缓存键名（唯一）                                       | `String`   |        |
| columns       | 表头信息                                                 | `Array`    | []     |
| columnSetting | 获取新的 columns `(newColumns)=>{}`                      | `Function` |        |
| menuConfig    | 列设置 （可以设置 title，icon ，其他属性集成 el-button） | `Function` |        |
