---
group: Form
title: Query/LightFilter 筛选表单
order: 1
atomId: QueryFilter,LightFilter
---

# QueryFilter / LightFilter 筛选表单

有些**时候**表单要与别的组件组合使用，常见的有 Table ，List 等，这时候就需要一些特殊形态的表单。QueryFilter 和 LightFilter 解决了配合组件使用的问题，避免了复杂的样式设置。ProTable 中默认 支持了 QueryFilter 和 LightFilter 作为自己的筛选表单。

## 查询筛选

`QueryFilter.onFinish` 提交筛选字段，并在表单下方展示查询值。

<code src="../../demos/form/query-filter/query-filter.tsx" title="QueryFilter 基本查询"></code>

设置 `defaultCollapsed={false}`，首次显示时展开所有字段；仍可点击“收起”折叠。

<code src="../../demos/form/query-filter/query-filter-collapsed.tsx" title="defaultCollapsed：默认展开"></code>

`layout="vertical"` 将标签放在输入框上方。

<code src="../../demos/form/query-filter/query-filter-vertical.tsx" title="layout：垂直布局"></code>

`layout="vertical"` 配合 `split` 在两行筛选项之间显示分割线；提交后可查看筛选值。

<code src="../../demos/form/query-filter/search-filter.tsx" background="var(--main-bg-color)" title="QueryFilter：纵向分割线"></code>

`defaultFormItemsNumber={3}` 指定折叠时可见的字段数量。

<code src="../../demos/form/query-filter/query-filter-default-form-items-number.tsx" background="var(--main-bg-color)" title="defaultFormItemsNumber：显示三个字段"></code>

`defaultColsNumber={2}` 指定折叠时可见的字段数量；展开后可查看其余字段。

<code src="../../demos/form/query-filter/query-filter-default-cols-number.tsx" background="var(--main-bg-color)" title="defaultColsNumber：显示两个字段"></code>

## 轻量筛选

#### `LightFilter.select`

<code src="../../demos/form/query-filter/light-filter.tsx" title="轻量筛选 — 单选"></code>

#### `LightFilter.select mode="multiple"`

<code src="../../demos/form/query-filter/light-filter-multi-select.tsx" title="轻量筛选 — 多选"></code>

#### `LightFilter.checkboxGroup`

<code src="../../demos/form/query-filter/light-filter-checkbox.tsx" title="轻量筛选 — 复选组"></code>

#### `LightFilter.treeSelect`

<code src="../../demos/form/query-filter/light-filter-tree-select.tsx" title="轻量筛选 — 树形选择"></code>

#### `LightFilter.cascader`

<code src="../../demos/form/query-filter/light-filter-cascader.tsx" title="轻量筛选 — 级联选择"></code>

#### `LightFilter.switch`

<code src="../../demos/form/query-filter/light-filter-switch.tsx" title="轻量筛选 — 开关"></code>

#### `LightFilter.digit`

<code src="../../demos/form/query-filter/light-filter-digit.tsx" title="轻量筛选 — 数字"></code>

#### `LightFilter.slider`

<code src="../../demos/form/query-filter/light-filter-slider.tsx" title="轻量筛选 — 滑块"></code>

#### `LightFilter.slider range`

<code src="../../demos/form/query-filter/light-filter-slider-range.tsx" title="轻量筛选 — 区间滑块"></code>

#### `LightFilter.input`

<code src="../../demos/form/query-filter/light-filter-input.tsx" title="轻量筛选 — 文本输入"></code>

#### `LightFilter.date`

<code src="../../demos/form/query-filter/light-filter-date.tsx" title="轻量筛选 — 日期"></code>

#### `LightFilter.dateRange`

<code src="../../demos/form/query-filter/light-filter-date-range.tsx" title="轻量筛选 — 日期范围"></code>

#### `LightFilter.dateTime`

<code src="../../demos/form/query-filter/light-filter-date-time.tsx" title="轻量筛选 — 日期时间"></code>

#### `LightFilter.dateTimeRange`

<code src="../../demos/form/query-filter/light-filter-date-time-range.tsx" title="轻量筛选 — 日期时间范围"></code>

#### `LightFilter.time`

<code src="../../demos/form/query-filter/light-filter-time.tsx" title="轻量筛选 — 时间"></code>

#### `LightFilter.timePickerRange`

<code src="../../demos/form/query-filter/light-filter-time-range.tsx" title="轻量筛选 — 时间范围"></code>

#### `LightFilter.fieldSet`

<code src="../../demos/form/query-filter/light-filter-field-set.tsx" title="轻量筛选 — 字段组合"></code>

#### `secondary`

<code src="../../demos/form/query-filter/light-filter-secondary.tsx" title="轻量筛选 — 次要筛选"></code>

#### `size`

<code src="../../demos/form/query-filter/light-filter-size.tsx" title="轻量筛选 — 尺寸"></code>

#### `variant`

<code src="../../demos/form/query-filter/light-filter-variant.tsx" title="轻量筛选 — 样式"></code>

### 其他配置

<code src="../../demos/form/query-filter/light-filter-footer.tsx" title="轻量筛选-自定义footer"></code>

<code src="../../demos/form/query-filter/light-filter-footer-hidden.tsx" title="轻量筛选-隐藏 footer"></code>

<code src="../../demos/form/query-filter/light-filter-bordered.tsx" title="轻量筛选-边框模式"></code>

折叠模式下所有的选项都会默认折叠，不管是否有值，控件的 `secondary` 将不再有效。

<code src="../../demos/form/query-filter/light-filter-collapse.tsx" title="轻量筛选-折叠模式"></code>

手动设置轻量筛选的弹出框，默认为 `bottomLeft`

<code src="../../demos/form/query-filter/light-filter-placement.tsx" title="轻量筛选-弹出框对齐方式"></code>

## API

### QueryFilter

QueryFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数                   | 说明                                                                                    | 类型                                                                                      | 默认值  |
| ---------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------- |
| collapsed              | 是否折叠超出的表单项，用于受控模式                                                      | `boolean`                                                                                 | -       |
| defaultCollapsed       | 默认状态下是否折叠超出的表单项                                                          | `boolean`                                                                                 | `true`  |
| onCollapse             | 切换表单折叠状态时的回调                                                                | `(collapsed)=>void`                                                                       | -       |
| collapseRender         | 收起按钮的 render，设为 `false` 可隐藏                                                  | `((collapsed, props, intl, hiddenNum?) => ReactNode) \| false`                            | -       |
| layout                 | 布局模式，`vertical` 时上下布局                                                         | `'horizontal' \| 'vertical' \| 'inline'`                                                  | -       |
| submitterColSpanProps  | 提交按钮所在 col 的 props（需要包含 `span`）                                            | `Omit<ColProps, 'span'> & { span: number }`                                               | -       |
| defaultColsNumber      | 自定义折叠状态下默认显示的表单控件数量，**最多只展示一行控件**，超出时展示收起/隐藏按钮 | `number`                                                                                  | -       |
| defaultFormItemsNumber | 与 defaultColsNumber 的不同点在于，设置多少就展示多少个控件，超出时展示收起/隐藏按钮    | `number`                                                                                  | -       |
| labelWidth             | label 宽度                                                                              | `number` \| `'auto'`                                                                      | `80`    |
| span                   | 表单项宽度                                                                              | `number` \| `{ xs: number; sm: number; md: number; lg: number; xl: number; xxl: number }` | -       |
| split                  | 每一行是否有分割线（仅在 `layout=vertical` 时生效）                                     | `boolean`                                                                                 | -       |
| searchText             | 查询按钮的文本                                                                          | `string`                                                                                  | -       |
| resetText              | 重置按钮的文本                                                                          | `string`                                                                                  | -       |
| searchGutter           | 查询表单栅格间隔                                                                        | `RowProps['gutter']`                                                                      | -       |
| optionRender           | 底部操作栏的 render，设为 `false` 可隐藏                                                | `((searchConfig, props, dom) => ReactNode[]) \| false`                                    | -       |
| ignoreRules            | 忽略 Form.Item 的 rules 校验配置                                                        | `boolean`                                                                                 | -       |
| showHiddenNum          | 收起时是否显示隐藏个数                                                                  | `boolean`                                                                                 | `false` |
| preserve               | 是否能够查询收起的数据，如果设置为 false，收起后的表单数据将会丢失                      | `boolean`                                                                                 | `true`  |
| containerStyle         | 容器样式                                                                                | `React.CSSProperties`                                                                     | -       |

#### 响应式断点规则

注意，断点的值均为表单容器的大小而非视口大小。断点配置继承自 antd 设计 token，与 [Grid 栅格](https://ant.design/components/grid-cn) 的响应式断点保持一致。

##### 默认布局时的规则

断点继承自 antd 设计 token（默认 xs=576、sm=768、md=992、lg=1200、xl=1600）：

| 容器宽度断点          | 单行展示表单列数（包含操作区域） | 默认布局     |
| --------------------- | -------------------------------- | ------------ |
| `≧ 1600px`            | 4 列                             | `horizontal` |
| `≧ 768px && < 1600px` | 3 列                             | `horizontal` |
| `≧ 576px && < 768px`  | 2 列                             | `vertical`   |
| `< 576px`             | 1 列                             | `vertical`   |

##### 强制上下布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） |
| --------------------- | -------------------------------- |
| `≧ 1600px`            | 4 列                             |
| `≧ 992px && < 1600px` | 3 列                             |
| `≧ 576px && < 992px`  | 2 列                             |
| `< 576px`             | 1 列                             |

### LightFilter

LightFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数          | 说明                                                           | 类型                                                                                                                        | 默认值                     |
| ------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| collapse      | 是否默认折叠全部字段                                           | `boolean`                                                                                                                   | `false`                    |
| collapseLabel | 折叠区域的标签                                                 | `ReactNode`                                                                                                                 | `更多筛选 <DownOutlined/>` |
| variant       | 样式变体                                                       | `'outlined' \| 'filled' \| 'borderless'`                                                                                    | `'borderless'`             |
| ignoreRules   | 是否忽略表单项的 rules（LightFilter 场景一般不建议使用 rules） | `boolean`                                                                                                                   | -                          |
| footerRender  | 底部内容，当不需要默认底部按钮时，可以设为 `false`             | `((onConfirm?: (e?: React.MouseEvent) => void, onClear?: (e?: React.MouseEvent) => void) => JSX.Element \| false) \| false` | -                          |
| popoverProps  | 透传给内部 Popover 的属性（折叠态弹层），可用 `classNames` 等  | `Omit<PopoverProps, 'children' \| 'content' \| 'trigger' \| 'open' \| 'onOpenChange' \| 'placement'>`                       | -                          |
| placement     | 选择框弹出的位置，透传给 Popover，未设置时使用 Popover 默认值  | `TooltipPlacement`                                                                                                          | -                          |
