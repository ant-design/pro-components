---
title: ProForm - 高级表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProForm

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。

分步表单，Modal 表单，Drawer 表单，查询表单，轻量筛选等多种 layout 可以覆盖大部分的使用场景，脱离复杂而且繁琐的表单布局工作，更少的代码完成更多的功能。

ProForm 自带了数量可观的 Field, 这些组件本质上是 FromItem 和 组件的结合，我们可以帮他们当成一个 FromItem 来使用，并且支持各种 `props`。每个 Field 都支持 `fieldProps` 属性来支持设置输入组件的`props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。

- 如果你想要设置默认值，请使用 `initialValues`,任何直接使用组件 `value` 和 `onChange` 的方式都有可能导致值绑定失效。

- 如果想要表单联动或者做一些依赖，可以使用 render props 模式。通过包裹一个 `noStyle` 和 `shouldUpdate` 的 Form.Item 节点触发表单的单个渲染

- 如果想要监听某个值，建议使用 `onValuesChange`。保持单向的数据流无论对开发者还是维护者都大有脾益

- ProForm 没有黑科技，只是 antd 的 Form 的封装，如果要使用自定义的组件可以用 Form.Item 包裹后使用，支持混用。

```tsx |pure
// 设置整体默认值
<ProForm initialValues={obj} />

// 设置单个控件的
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>

// 相互依赖的组件联动
<ProForm>
  <Form.Item noStyle shouldUpdate>
    {(form) => {
      return (
        <ProFormSelect
          options={[
            {
              value: "chapter",
              label: "盖章后生效",
            },
          ]}
          width="md"
          name="useMode"
          label={`与${form.getFieldValue("name")}合同约定生效方式`}
        />
      );
    }}
  </Form.Item>
</ProForm>;


// 使用自定义组件
<ProForm>
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
</ProForm>
```

## 何时使用

当你想快速实现一个表单但不想花太多时间去布局时 ProForm 是最好的选择。

## 代码示例

### 登录

<code src="./demos/login.tsx" height="300px"/>

### 基本使用

<code src="./demos/base.tsx" height="548px"/>

### 互相依赖的表单项

<code src="./demos/dependency.tsx" height="248px"/>

### 分步表单

<code src="./demos/steps-from.tsx" height="532px"/>

### 分步表单-多卡片

<code src="./demos/multi-card-step-form.tsx"  background="#f5f5f5" height="868px"/>

### 分步表单-与 model 配合使用

<code src="./demos/modal-step-form.tsx"  background="#f5f5f5" height="32px"/>

### Modal 表单

<code src="./demos/modal-form.tsx"  background="#f5f5f5"  height="32px"/>

### Drawer 表单

<code src="./demos/drawer-form.tsx"  background="#f5f5f5" height="32px"/>

### 查询筛选

<code src="./demos/query-filter.tsx" height="168px"/>

### 查询筛选-默认收起

<code src="./demos/query-filter-collapsed.tsx" height="56px"/>

### 查询筛选-垂直布局

<code src="./demos/query-filter-vertical.tsx"  height="172px"/>

### 查询筛选-搜索

<code src="./demos/search-filter.tsx" background="#f0f2f5" height="274px"/>

### 轻量筛选

<code src="./demos/light-filter.tsx" height="86px"/>

### 轻量筛选-边框模式

<code src="./demos/light-filter-bordered.tsx" height="32px" />

### 轻量筛选-折叠模式

折叠模式下所有的选项都会默认折叠，不管是否有值，控件的 `secondary` 将不再有效。

<code src="./demos/light-filter-collapse.tsx" height="40px"/>

### 固定页脚

<code src="./demos/layout-base.tsx" iframe="764px" />

### 混合使用

<code src="./demos/components-other.tsx" heigh="1774px"/>

### 表单联动

<code src="./demos/linkage-customization.tsx" heigh="1774px" />

<code src="./demos/components-other-readonly.tsx" heigh="1774px" debug/>

## Layouts API

### ProForm

ProForm 是 antd Form 的再封装，如果你想要自定义表单元素，ProForm 与 antd 的方法是相同的，你仍然可以用 FormItem + 自定义组件的方式来自定义。当然这样不会影响到别的组件，QueryFilter 等组件同理。

> antd 的 From api 查看[这里](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `(values)=>Promise<void>` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `(e)=>void` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | 自动格式数据,主要是 moment 的表单,支持 string 和 number 两种模式 | `string\| number \|false` | string |
| [(...)](https://ant.design/components/form-cn/) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### ProForm.Group

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

#### submitter

虽然我们希望不要对 submitter 进行修改，但是在使用中修改时很常见的需求，ProForm 的各个组件都使用了同样的 API 来支持需求。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onSubmit | 提交方法 | `()=>void` | - |
| onReset | 重置方法 | `()=>void` | - |
| searchConfig | 搜索的配置，一般用来配置文本 | `{resetText,submitText}` | - |
| submitButtonProps | 提交按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| resetButtonProps | 重置按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| render | 自定义操作的渲染 | `false`\|`(props,dom:JSX[])=>ReactNode[]` | - |

> render 的第二个参数是默认的 dom 数组，第一个是重置按钮，第二个是提交按钮。

```tsx | pure
<ProForm
  submitter={{
    // 配置按钮文本
    searchConfig: {
      resetText: '重置',
      submitText: '提交',
    },
    // 配置按钮的属性
    resetButtonProps: {},
    submitButtonProps: {},

    // 完全自定义整个区域
    render: (props, doms) => {
      return (
        <button type="button" id="rest" onClick={() => props?.onReset?.()}>
          rest
        </button>
      );
    },
  }}
/>
```

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

| 参数          | 说明                 | 类型        | 默认值                     |
| ------------- | -------------------- | ----------- | -------------------------- |
| collapse      | 是否默认折叠全部字段 | `boolean`   | `false`                    |
| collapseLabel | 折叠区域的标签       | `ReactNode` | `更多筛选 <DownOutlined/>` |

### StepsForm

StepsForm 本质上是一个 Provider ，增加步骤条和一些相关的 API。

> Form.Provider 的文档可以看[这里](https://ant.design/components/form-cn/#Form.Provider),转化 moment 的值是 ProForm 提供的功能，所以 `onFormFinish` 和 `onFormChange` 其中的值都是未经转化的

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前表单的步骤数，从 `0` 开始 | `number` | 0 |
| onCurrentChange | current 发生改变的事件 | `(current:number)=>void` | - |
| onFinish | 表单最后一步提交成功触发 | `(values:T)=>void` | - |
| stepsProps | StepsForm 自带的 Steps 的 props，使用方式与 [antd](https://ant.design/components/steps-cn/) 相同，但是去掉了 current 和 onChange | [props](https://ant.design/components/steps-cn/#API) | - |
| stepFormRender | 自定义当前展示的表单，返回 dom 在表单内部 | `(form) => ReactNode` | - |
| stepsFormRender | 自定义整个表单区域，返回的 dom 在表单的外部 | `(form,submitter) => ReactNode` | - |
| stepsRender | 自定义步骤器 | `(steps,dom)=>ReactNode` | - |

#### StepForm

与 ProForm 完全相同，只是 onFinish 支持了 Promise，如果返回 `false`, 就不会跳转下一步。

| onFinish | 表单提交成功触发 | `(values:T)=>Promise<false>` | - |

### ModalForm

ModalForm 组合了 Modal 和 ProForm 可以减少繁琐的状态管理。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 用于触发 Modal 打开的 dom，一般是 button | `ReactNode` | - |
| visible | 是否打开 | `boolean` | - |
| onVisibleChange | visible 改变时触发 | `(visible:boolean)=>void` | - |
| modalProps | Modal 的 props，使用方式与 [antd](https://ant.design/components/modal-cn/) 相同。注意：不支持 'visible'，请使用全局的 visible | [props](https://ant.design/components/modal-cn/#API) | - |
| title | 弹框的标题 | `ReactNode` | - |
| width | 弹框的宽度 | `Number` | - |
| onFinish | 提交数据时触发，如果返回一个 true，会关掉弹框并且重置表单 | `async (values)=>boolean` | - |

### DrawerForm

DrawerForm 组合了 Drawer 和 ProForm 可以减少繁琐的状态管理。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 用于触发 Modal 打开的 dom，一般是 button | `ReactNode` | - |
| visible | 是否打开 | `boolean` | - |
| onVisibleChange | visible 改变时触发 | `(visible:boolean)=>void` | - |
| drawerProps | Drawer 的 props，使用方式与 [antd](https://ant.design/components/drawer-cn/) 相同。注意：不支持 'visible'，请使用全局的 visible | [props](https://ant.design/components/drawer-cn/#API) | - |
| title | 抽屉的标题 | `ReactNode` | - |
| width | 抽屉的宽度 | `Number` | - |
| onFinish | 提交数据时触发，如果返回一个 true，会关掉抽屉并且重置表单 | `async (values)=>boolean` | - |

## Fields API

ProForm 自带的 Filed ,与 valueType 基本上一一对应。

### 通用的属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | Field 的长度，我们归纳了常用的 Field 长度以及适合的场景，支持了一些枚举 "xs" , "s" , "m" , "l" , "x" | `number \| "xs" \| "s" \| "m" \| "l" \| "x"` | - |
| tooltip | 会在 label 旁增加一个 icon，悬浮后展示配置的信息 | `string \| tooltipProps` | - |
| secondary | 是否是次要控件，只针对 LightFilter 下有效 | `boolean` | `false` |
| allowClear | 支持清除，针对 LightFilter 下有效，主动设置情况下同时也会透传给 `fieldProps` | `boolean` | `true` |

### 宽度

在某些场景下，我们需要根据页面展示效果对输入框进行自适应处理，除此以外一个表单区域应默认使用定宽规则。

![width info](https://gw.alipayobjects.com/zos/antfincdn/CyJPTSL07y/1574664269794-254db9de-2574-4361-bcf1-b82c6db0c80a.png)

- XS=104px 适用于短数字、短文本或选项。
- S=216px 适用于较短字段录入、如姓名、电话、ID 等。
- M=328px 标准宽度，适用于大部分字段长度。
- L=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
- XL=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。

### ProFormText

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormText name="text" label="名称" placeholder="请输入名称" fieldProps={inputProps} />
```

### ProFormText.Password

与 [Input.Password](https://ant.design/components/input-cn/#Input.Password) 相同。

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
```

### ProFormDatePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDatePicker name="date" label="日期" />
```

### ProFormDateTimePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateTimePicker name="datetime" label="日期" />
```

### ProFormDateRangePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="日期" />
```

### ProFormDateTimeRangePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateRangePicker name="datetimeRange" label="日期" />
```

### ProFormTimePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同

```tsx | pure
<ProFormDateRangePicker name="time" label="时间" />
```

### ProFormTextArea

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormTextArea
  name="text"
  label="名称"
  placeholder="请输入名称"
  fieldProps={inputTextAreaProps}
/>
```

### ProFormCheckbox

> 请求远程数据比较复杂，详细可以看[这里](/components/field#远程数据)。

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

### ProFormRadio.Group

> 请求远程数据比较复杂，详细可以看[这里](/components/field#远程数据)。

与 [radio](https://ant.design/components/radio-cn/) 相同，但是支持了 `options`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 与 select 相同，根据 options 生成子节点，推荐使用。 | `string[]` \| `{label:ReactNode,value:string}[]` | - |
| radioType | 设置是按钮模式还是 radio 模式 | `button`\|`radio` | `radio` |

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

### ProFormSwitch

与 [switch](https://ant.design/components/switch-cn/) 相同。

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

与 [rate](https://ant.design/components/rate-cn/) 相同。

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

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

### ProFormUploadDragger

与 [upload](https://ant.design/components/upload-cn/) 相同。预设了 Dragger 的样式，其他与 Upload 相同。

| 参数        | 说明             | 类型        | 默认值                           |
| ----------- | ---------------- | ----------- | -------------------------------- |
| icon        | Dragger 的图表。 | `ReactNode` | InboxOutlined                    |
| title       | Dragger 的标题   | `ReactNode` | '单击或拖动文件到此区域进行上传' |
| description | Dragger 的描述   | `ReactNode` | '支持单次或批量上传'             |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

与 [upload](https://ant.design/components/upload-cn/) 相同。预设了 Button 的样式，其他与 Upload 相同。

| 参数  | 说明             | 类型        | 默认值         |
| ----- | ---------------- | ----------- | -------------- |
| icon  | Dragger 的图表。 | `ReactNode` | UploadOutlined |
| title | Dragger 的标题   | `ReactNode` | 单击上传       |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormSelect

与 [select](https://ant.design/components/select-cn/) 相同。支持了 request 和 valueEnum 两种方式来生成 options。

> 请求远程数据比较复杂，详细可以看[这里](/components/field#远程数据)。

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
    valueEnum={{
      open: '未解决',
      closed: '已解决',
    }}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSelect
    name="select2"
    label="Select"
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

### ProFormDigit

与 [inputNumber](https://ant.design/components/input-number-cn/) 相同。它自带了一个格式化(保留 2 位小数，最小值为 0)，有需要你可以关掉它。

```tsx | pure
<ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
```

如果要修改小数位数：

```tsx | pure
<ProFormDigit
  label="InputNumber"
  name="input-number"
  min={1}
  max={10}
  fieldProps={{ precision: 0 }}
/>
```

### ProFormFieldSet

ProFormFieldSet 可以将内部的多个 children 的值组合并且存储在 ProForm 中，并且可以通过 `transform` 在提交时转化。下面是一个简单的用法,可以方便的组合多个输入框，并且格式化为想要的数据。

```tsx | pure
<ProFormFieldSet
  name="list"
  label="组件列表"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet>
```
