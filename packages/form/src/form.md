---
title: ProForm - 高级表单
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

> 开发中，请勿用于生产环境。

# ProForm

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发 From 表单。使用方法与 From 大致相同，但是 ProForm 会自动格式化 date 的 moment 数据，你可以通过 dateFormatter 来关闭这个预设。

## 示例

### 基本使用

<code src="./demos/base.tsx" />

### 查询筛选

<code src="./demos/query-filter.tsx" />

### 查询筛选-默认收起

<code src="./demos/query-filter-collapsed.tsx" />

### 查询筛选-垂直布局

<code src="./demos/query-filter-vertical.tsx" />

### 查询筛选-搜索

<code src="./demos/search-filter.tsx" background="#f0f2f5"/>

### 轻量筛选

<code src="./demos/light-filter.tsx" />

### 混合使用

<code src="./demos/components-other.tsx" />

## API

### ProForm

> antd 的 From api 查看[这里](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `Function(e)` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `Function(e)` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | 自动格式数据，例如 moment 的表单,支持 string 和 number 两种模式 | `string\| number \|false` | string |
| (...) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### ProForm 的 Field

ProForm 自带了数量可观的 Field, 这些组件本质上是 FromItem 和 组件的结合，我们可以帮他们当成一个 FromItem 来使用，并且支持各种 props。每个 Field 都支持 fieldProps 属性来支持设置输入组件的 props。 我们支持了 placeholder 的透传，你可以直接在组件上设置 placeholder。

#### ProFormText

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormText name="text" label="名称" placeholder="请输入名称" fieldProps={inputProps} />
```

#### ProFormDatePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDatePicker name="date" label="日期" />
```

#### ProFormDateTimePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateTimePicker name="datetime" label="日期" />
```

#### ProFormDateRangePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="日期" />
```

#### ProFormDateTimeRangePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

````tsx | pure
<ProFormDateRangePicker name="datetimeRange" label="日期" />
```

#### ProFormTimePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同

```tsx | pure
<ProFormDateRangePicker name="time" label="时间" />
````

#### ProFormTextArea

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormTextArea
  name="text"
  label="名称"
  placeholder="请输入名称"
  fieldProps={inputTextAreaProps}
/>
```

#### ProFormCheckbox

与 [checkbox](https://ant.design/components/checkbox-cn/) 相同，但是支持了 `options` 与 `layout`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 与 select 相同，根据 options 生成子节点，推荐使用。 | `string[]` \| `{label:ReactNode,value:string}[]` | - |
| layout | 配置 checkbox 的样子，支持垂直`vertical` 和 `horizontal` | `horizontal` \| `vertical` | - |

```tsx | pure
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="行业分布"
  options={['农业', '制造业', '互联网']}
/>
```

#### ProFormRadio

与 [radio](https://ant.design/components/radio-cn/) 相同，但是支持了 `options`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 与 select 相同，根据 options 生成子节点，推荐使用。 | `string[]` \| `{label:ReactNode,value:string}[]` | - |

```tsx | pure
<ProFormRadio.Group
  name="radio-group"
  label="Radio.Group"
  options={[
    {
      label: 'item 1',
      value: 'a',
    },
    {
      label: 'item 2',
      value: 'b',
    },
    {
      label: 'item 3',
      value: 'c',
    },
  ]}
/>
```

#### ProFormSwitch

与 [switch](https://ant.design/components/switch-cn/) 相同。

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

#### ProFormRate

与 [rate](https://ant.design/components/rate-cn/) 相同。

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

#### ProFormSlider

与 [slider](https://ant.design/components/slider-cn/) 相同。

```tsx | pure
<ProFormSlider
  name="slider"
  label="Slider"
  marks={{
    0: 'A',
    20: 'B',
    40: 'C',
    60: 'D',
    80: 'E',
    100: 'F',
  }}
/>
```

#### ProFormUploadDragger

与 [upload](https://ant.design/components/upload-cn/) 相同。预设了 Dragger 的样式，其他与 Upload 相同。

| 参数        | 说明             | 类型        | 默认值                           |
| ----------- | ---------------- | ----------- | -------------------------------- |
| icon        | Dragger 的图表。 | `ReactNode` | InboxOutlined                    |
| title       | Dragger 的标题   | `ReactNode` | '单击或拖动文件到此区域进行上传' |
| description | Dragger 的描述   | `ReactNode` | '支持单次或批量上传'             |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

#### ProFormUploadButton

与 [upload](https://ant.design/components/upload-cn/) 相同。预设了 Button 的样式，其他与 Upload 相同。

| 参数  | 说明             | 类型        | 默认值         |
| ----- | ---------------- | ----------- | -------------- |
| icon  | Dragger 的图表。 | `ReactNode` | UploadOutlined |
| title | Dragger 的标题   | `ReactNode` | 单击上传       |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

#### ProFormSelect

与 [select](https://ant.design/components/select-cn/) 相同。支持了 request 和 valueEnum 两种方式来生成 options。

> 有了 options 为什么要支持 valueEnum 呢？ valueEnum 可以与 table，descriptions 共用，在工程化上有优势。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueEnum | 当前列值的枚举 [valueEnum](/components/table#valueenum) | `{[key:string`\|`number]:any}` | - |
| request | 从网络请求枚举数据 | `()=>Promise<{[key:string`\|`number]:any}>` | - |

```tsx | pure
<>
  <ProFormSelect
    name="select"
    label="Select"
    hasFeedback
    valueEnum={{
      open: '未解决',
      closed: '已解决',
    }}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSelect
    name="select"
    label="Select"
    hasFeedback
    request={async () => [
      { label: '全部', value: 'all' },
      { label: '未解决', value: 'open' },
      { label: '已解决', value: 'closed' },
      { label: '解决中', value: 'processing' },
    ]}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```

#### ProFormDigit

与 [inputNumber](https://ant.design/components/input-number-cn/) 相同。它自带了一个格式化，有需要你可以关掉它。

```tsx | pure
<ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
```

### ProForm.Group

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

### QueryFilter

QueryFilter 除了继承 ProForm 的 API 以外还支持下面的属性。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| collapsed | 是否折叠超出的表单项，用于受控模式 | `boolean` | - |
| defaultCollapsed | 默认状态下是否折叠超出的表单项 | `boolean` | true |
| onCollapse | 切换表单折叠状态时的回调 | `Function(collapsed)` | - |
| hideRequiredMark | 隐藏所有表单项的必选标记，**默认隐藏** | `boolean` | true |
| defaultColsNumber | 自定义折叠状态下默认显示的表单控件数量，没有设置或小于 0，则显示一行控件; 数量大于等于控件数量则隐藏展开按钮 | `number` | - |
| labelWidth | label 宽度 | `number` \| `'auto'` | `98` |
| span | 表单项宽度 | `number[0 - 24]` | - |
| split | 每一行是否有分割线 | `boolean` | - |

#### 响应式断点规则

注意，断点的值均指表单容器的大小而非视口大小。

##### 默认布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） | 默认布局     |
| --------------------- | -------------------------------- | ------------ |
| `≧ 1352px`            | 4                                | `horizontal` |
| `≧ 1062px`            | 3                                | `horizontal` |
| `≧ 701px && < 1063px` | 2                                | `horizontal` |
| `≧ 513px && < 701px`  | 2                                | `vertical`   |
| `< 513px`             | 1                                | `vertical`   |

##### 强制上下布局时的规则

| 容器宽度断点          | 单行展示表单列数（包含操作区域） |
| --------------------- | -------------------------------- |
| `≧ 1057px`            | 4                                |
| `≧ 785px && < 1057px` | 3                                |
| `≧ 513px && < 785px`  | 2                                |
| `< 513px`             | 1                                |

```

```
