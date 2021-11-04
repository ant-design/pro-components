---
title: Query/LightFilter - 筛选表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# QueryFilter / LightFilter 筛选表单

有些是时候表单要与别的组件组合使用，常见的有 Table ，List 等，这时候就需要一些特殊形态的表单。QueryFilter 和 LightFilter 解决了配合组件使用的问题，避免了复杂的样式设置。ProTable 中默认 支持了 QueryFilter 和 LightFilter 作为自己的筛选表单。

### 查询筛选

<code src="./demos/query-filter.tsx" height="168px" title="查询筛选" />

<code src="./demos/query-filter-test.tsx" height="168px" title="查询筛选" debug/>

### 查询筛选-默认收起

<code src="./demos/query-filter-collapsed.tsx" height="56px" title="查询筛选-默认收起"/>

### 查询筛选-垂直布局

<code src="./demos/query-filter-vertical.tsx"  height="172px" title="查询筛选-垂直布局" />

### 查询筛选-搜索

<code src="./demos/search-filter.tsx" background="#f0f2f5" height="274px" title="查询筛选-搜索" />

### 轻量筛选

<code src="./demos/light-filter.tsx" height="86px" title="轻量筛选" />

### 轻量筛选-自定义 footer

<code src="./demos/light-filter-footer.tsx" height="86px" title="轻量筛选-自定义footer" />

### 轻量筛选-边框模式

<code src="./demos/light-filter-bordered.tsx" height="32px" title="轻量筛选-边框模式"/>

### 轻量筛选-折叠模式

折叠模式下所有的选项都会默认折叠，不管是否有值，控件的 `secondary` 将不再有效。

<code src="./demos/light-filter-collapse.tsx" height="40px" title="轻量筛选-折叠模式" />

## API

### QueryFilter

QueryFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapsed | 是否折叠超出的表单项，用于受控模式 | `boolean` | - |
| defaultCollapsed | 默认状态下是否折叠超出的表单项 | `boolean` | true |
| onCollapse | 切换表单折叠状态时的回调 | `(collapsed)=>void` | - |
| hideRequiredMark | 隐藏所有表单项的必选标记，**默认隐藏** | `boolean` | true |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | `number` | - |
| labelWidth | label 宽度 | `number` \| `'auto'` | `98` |
| span | 表单项宽度 | `number[0 - 24]` | - |
| split | 每一行是否有分割线 | `boolean` | - |
| preserve | 是否能够查询收起的数据，如果设置为 true，收起后的表单数据将会丢失 | `boolean` | true |

#### 响应式断点规则

注意，断点的值均为表单容器的大小而非视口大小。

##### 默认布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） | 默认布局     |
| --------------------- | -------------------------------- | ------------ |
| `≧ 1352px`            | 4 列                             | `horizontal` |
| `≧ 1062px`            | 3 列                             | `horizontal` |
| `≧ 701px && < 1063px` | 3 列                             | `horizontal` |
| `≧ 513px && < 701px`  | 2 列                             | `vertical`   |
| `< 513px`             | 1 列                             | `vertical`   |

##### 强制上下布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） |
| --------------------- | -------------------------------- |
| `≧ 1057px`            | 4 列                             |
| `≧ 785px && < 1057px` | 3 列                             |
| `≧ 513px && < 785px`  | 2 列                             |
| `< 513px`             | 1 列                             |

### LightFilter

LightFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| collapse | 是否默认折叠全部字段 | `boolean` | `false` |
| collapseLabel | 折叠区域的标签 | `ReactNode` | `更多筛选 <DownOutlined/>` |
| footerRender | 底部内容，当不需要默认底部按钮时，可以设为 footer={false} | `(onClear?: () => void, onConfirm: () => void) => JSX.Element | false)`\|`false` | - |
