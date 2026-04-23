---
group: Form
title: ProFormFields 表单项
atomId: ProFormText
order: 1
---

# ProFormFields 表单项

一个表单除了 Form 之外还是需要一系列的表单项，ProForm 自带了数量可观的表单项，这些组件本质上是 Form.Item 和 组件的结合，我们可以把他们当成一个 FormItem 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的`props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。

每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 `disable` 相比 `readonly` 展示更加友好。生成的 dom 也更小，比如 ProFormDigit 会自动格式化小数位数。

ProFormText 是 FormItem + Input 的产物，可以类比于以下的代码：

```tsx | pure
const ProFormText = (props) => {
  return (
    <ProForm.Item {...props}>
      <Input placeholder={props.placeholder} {...props.fieldProps} />
    </ProForm.Item>
  );
};
```

所以我们给 ProFormText 设置的 props 其实是 Form.Item 的，fieldProps 才是包含的组件的，要切记。

## 组件列表

| 组件                                                                           | 使用场景                                                                                                    |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [ProFormText](https://ant.design/components/input-cn/#Input.Password)          | 用于输入各类文本                                                                                            |
| [ProFormDigit](https://ant.design/components/input-number-cn/)                 | 用于输入数字，它自带了一个格式化 (保留 2 位小数，最小值为 0)，有需要你可以关掉它。                          |
| [ProFormText.Password](https://ant.design/components/input-cn/#Input.Password) | 用于输入密码                                                                                                |
| [ProFormTextArea](https://ant.design/components/input-cn/#Input.Password)      | 用于输入多行文本                                                                                            |
| ProFormCaptcha                                                                 | 用于输入验证码， 一般需要与发送验证码接口一起使用                                                           |
| [ProFormDatePicker](https://ant.design/components/date-picker-cn/)             | 日期选择器用于输入日期                                                                                      |
| [ProFormDateTimePicker](https://ant.design/components/date-picker-cn/)         | 日期 + 时间选择器，用于输入日期和时间                                                                       |
| [ProFormDateRangePicker](https://ant.design/components/date-picker-cn/)        | 日期区间选择器用于输入一个日期区间                                                                          |
| [ProFormDateTimeRangePicker](https://ant.design/components/date-picker-cn/)    | 日期 + 时间区间选择器，用于输入一个日期 + 时间的区间                                                        |
| [ProFormSelect](https://ant.design/components/select-cn/)                      | 支持 `request` 和 `valueEnum` 两种方式来生成子项，用于从两项以上中选择一项                                  |
| [ProFormTreeSelect](https://ant.design/components/tree-select-cn/)             | 支持 `request` 和 `valueEnum` 两种方式来生成子项，用于从两项以上中选择一项                                  |
| [ProFormCheckbox](https://ant.design/components/checkbox-cn/)                  | 在 Checkbox 基础上支持了 layout，也支持 `request` 和 `valueEnum` 两种方式来生成子项                         |
| [ProFormRadio.Group](https://ant.design/components/radio-cn/)                  | 在 Radio 基础上也支持 `request` 和 `valueEnum` 两种方式来生成子项，用于单选某项，但是可以展示出来所有选项。 |
| [ProFormSlider](https://ant.design/components/slider-cn/)                      | 当用户需要在数值区间 / 自定义区间内进行选择时，可为连续或离散值。                                           |
| [ProFormSwitch](https://ant.design/components/switch-cn/)                      | 用于输入互斥的两个选项，一般是 true 和 false                                                                |
| [ProFormUploadButton](https://ant.design/components/upload-cn/)                | 按钮样式的上传文件                                                                                          |
| [ProFormUploadDragger](https://ant.design/components/upload-cn/)               | 区域的上传文件，一般用于突出上传文件的表单中                                                                |
| ProFormMoney                                                                   | 通用金额输入组件                                                                                            |
| [ProFormSegmented](https://ant.design/components/segmented-cn/)                | 分段控制器                                                                                                  |

## 代码示例

<code src="../../demos/form/FieldSet/components-other.tsx" title="表单项" ></code>

<code src="../../demos/form/FieldSet/search-select.tsx" title="查询表单" ></code>

<code src="../../demos/form/FieldSet/form-fieldset.tsx" title="结构化数据" ></code>

<code src="../../demos/form/FieldSet/datatime.tsx" title="日期表单"></code>

<code src="../../demos/form/FieldSet/upload.tsx" title="上传表单"></code>

<code src="../../demos/form/FieldSet/components-other-readonly.tsx" title="只读表单" ></code>

<code src="../../demos/form/FieldSet/fieldSet-light.tsx" title="轻量筛选中使用 light" ></code>

## API

ProForm 自带的 Filed , 与 valueType 基本上一一对应。

### 通用的属性

| 参数       | 说明                                                                                                    | 类型                                                                                      | 默认值        |
| ---------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------- |
| width      | Field 的长度，我们归纳了常用的 Field 长度以及适合的场景，支持了一些枚举 "xs" , "sm" , "md" ,"lg" , "xl" | `number \| "xs" \| "sm" \| "md" \| "lg" \| "xl"`                                          | -             |
| rowProps   | [RowProps](https://ant.design/components/grid/#Row)                                                     | 开启 `grid` 模式时传递给 Row, 仅在`ProFormGroup`, `ProFormList`, `ProFormFieldSet` 中有效 | { gutter: 8 } |
| colProps   | [ColProps](https://ant.design/components/grid/#Col)                                                     | 开启 `grid` 模式时传递给 Col                                                              | { xs: 24 }    |
| tooltip    | 会在 label 旁增加一个 icon，悬浮后展示配置的信息                                                        | `string \| tooltipProps`                                                                  | -             |
| secondary  | 是否是次要控件，只针对 LightForm 下有效                                                               | `boolean`                                                                                 | `false`       |
| allowClear | 支持清除，针对 LightForm 下有效，主动设置情况下同时也会透传给 `fieldProps`                            | `boolean`                                                                                 | `true`        |

### 宽度

在某些场景下，我们需要根据页面展示效果对输入框进行自适应处理，除此以外一个表单区域应默认使用定宽规则。

![width info](https://gw.alipayobjects.com/zos/alicdn/oEHLxX9DO/22.jpg)

- `XS=104px` 适用于短数字、短文本或选项。
- `SM=216px` 适用于较短字段录入、如姓名、电话、ID 等。
- `MD=328px` 标准宽度，适用于大部分字段长度。
- `LG=440px` 适用于较长字段录入，如长网址、标签组、文件路径等。
- `XL=552px` 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。

### ProFormText

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormText
  name="text"
  label="名称"
  placeholder="请输入名称"
  fieldProps={inputProps}
/>
```

### ProFormCaptcha

ProFormCaptcha 是为了支持中后台中常见的验证码功能开发的组件。

<code src="../../demos/form/FieldSet/pro-form-captCha.tsx" title="captcha"></code>

```tsx | pure
<ProFormCaptcha
  fieldProps={{
    size: 'large',
    prefix: <MailTwoTone />,
  }}
  captchaProps={{
    size: 'large',
  }}
  // 手机号的 name，onGetCaptcha 会注入这个值
  phoneName="phone"
  name="captcha"
  rules={[
    {
      required: true,
      message: '请输入验证码',
    },
  ]}
  placeholder="请输入验证码"
  // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
  // throw new Error("获取验证码错误")
  onGetCaptcha={async (phone) => {
    await waitTime(1000);
    message.success(`手机号 ${phone} 验证码发送成功!`);
  }}
/>
```

| 参数              | 说明                                                  | 类型                                                  | 默认值 |
| ----------------- | ----------------------------------------------------- | ----------------------------------------------------- | ------ |
| onGetCaptcha      | 点击获取验证码的事件，如果配置了 phoneName 会自动注入 | `(phone)=>Promise<any>`                               | -      |
| onTiming          | 计时数字监听                                          | `(count: number)=>void`                               | -      |
| captchaProps      | 获取验证码按钮的 props，与 antd 的 props 相同         | `ButtonProps`                                         | -      |
| countDown         | 倒计时的秒数                                          | number                                                | 60     |
| captchaTextRender | 渲染计时的文案                                        | `(timing: boolean, count: number) => React.ReactNode` | -      |

### ProFormText.Password

与 [Input.Password](https://ant.design/components/input-cn/#Input.Password) 相同。

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
```

### ProFormTextArea

与 [Input.TextArea](https://ant.design/components/input-cn/#Input.TextArea) 相同。

```tsx | pure
<ProFormTextArea
  name="text"
  label="名称"
  placeholder="请输入名称"
  fieldProps={inputTextAreaProps}
/>
```

### ProFormDigit

与 [inputNumber](https://ant.design/components/input-number-cn/) 相同。它自带了一个格式化 (保留 2 位小数，最小值为 0)，有需要你可以关掉它。

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

### ProFormDigitRange

与 [inputNumber](https://ant.design/components/input-number-cn/) 类似。 它提供输入数字范围。

```tsx | pure
<ProFormDigitRange label="InputNumberRange" name="input-number-range" />
```

### ProFormDatePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDatePicker name="date" label="日期" />
```

### ProFormDateTimePicker

与 [DatePicker](https://ant.design/components/date-picker-cn/) 相同。

```tsx | pure
<ProFormDateTimePicker name="datetime" label="日期时间" />
```

### ProFormDateRangePicker

与 [DatePicker.RangePicker](https://ant.design/components/date-picker-cn/#RangePicker) 相同。

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="日期" />
```

### ProFormDateTimeRangePicker

与 [DatePicker.RangePicker](https://ant.design/components/date-picker-cn/#RangePicker) 相同。

```tsx | pure
<ProFormDateTimeRangePicker name="datetimeRange" label="日期时间" />
```

### ProFormTimePicker

与 [DatePicker](https://ant.design/components/time-picker-cn/) 相同

```tsx | pure
<ProFormTimePicker name="time" label="时间" />
<ProFormTimePicker.RangePicker name="timeRange" label="时间区间" />
```

### ProFormSelect

与 [select](https://ant.design/components/select-cn/) 相同。支持了 request 和 valueEnum 两种方式来生成 options。

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

| 参数         | 说明                                                    | 类型                         | 默认值 |
| ------------ | ------------------------------------------------------- | ---------------------------- | ------ |
| valueEnum    | 当前列值的枚举 [valueEnum](/components/table#valueenum) | `Record`                     | -      |
| request      | 从网络请求枚举数据                                      | `()=>Promise<{label,value}>` | -      |
| debounceTime | 防抖动时间，与 request 配合使用                         | `number`                     | -      |
| params       | 发起网络请求的参数，与 request 配合使用                 | `Record`                     | -      |
| fieldProps   | antd 组件的 props                                       | `SelectProps `               | -      |

> 有了 options 为什么要支持 valueEnum 呢？ valueEnum 可以与 table，descriptions 共用，在工程化上有优势。

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

联动的 ProFormSelect

```tsx | pure
  <ProFormText name="name" label="姓名" />
  <ProFormSelect
    name="addr"
    width="md"
    label="与 name 联动的选择器"
    // dependencies 的内容会注入 request 中
    dependencies={['name']}
    request={async (params) => [
      { label: params.name, value: 'all' },
      { label: 'Unresolved', value: 'open' },
      { label: 'Resolved', value: 'closed' },
      { label: 'Resolving', value: 'processing' },
    ]}
  />
```

自定义选项：

```tsx | pure
<ProFormSelect
  name="select"
  label="Select"
  options={[
    { label: '全部', value: 'all' },
    { label: '未解决', value: 'open' },
    { label: '已解决', value: 'closed' },
    { label: '解决中', value: 'processing' },
  ]}
  fieldProps={{
    optionItemRender(item) {
      return item.label + ' - ' + item.value;
    },
  }}
  placeholder="Please select a country"
  rules={[{ required: true, message: 'Please select your country!' }]}
/>
```

### ProFormTreeSelect

与 [tree-select](https://ant.design/components/tree-select-cn/) 相同。支持了 request 和 valueEnum 两种方式来生成 options。

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

> 使用 fieldProps 中 onOpenChange 时需要另外维护 open 状态，具体看 [#8876](https://github.com/ant-design/pro-components/issues/8876)

| 参数         | 说明                                                    | 类型                         | 默认值 |
| ------------ | ------------------------------------------------------- | ---------------------------- | ------ |
| valueEnum    | 当前列值的枚举 [valueEnum](/components/table#valueenum) | `Record`                     | -      |
| request      | 从网络请求枚举数据                                      | `()=>Promise<{label,value}>` | -      |
| debounceTime | 防抖动时间，与 request 配合使用                         | `number`                     | -      |
| params       | 发起网络请求的参数，与 request 配合使用                 | `Record`                     | -      |
| fieldProps   | antd 组件的 props                                       | `TreeSelectProps`            | -      |

> 有了 options 为什么要支持 valueEnum 呢？ valueEnum 可以与 table，descriptions 共用，在工程化上有优势。

```tsx | pure
<ProFormTreeSelect
  name="name"
  placeholder="Please select"
  allowClear
  width={330}
  secondary
  request={async () => {
    return [
      {
        title: 'Node1',
        value: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
          },
        ],
      },
    ];
  }}
  // tree-select args
  fieldProps={{
    suffixIcon: null,
    filterTreeNode: true,
    showSearch: true,
    popupMatchSelectWidth: false,
    labelInValue: true,
    autoClearSearchValue: true,
    multiple: true,
    treeNodeFilterProp: 'title',
    fieldNames: {
      label: 'title',
    },
  }}
/>
```

### ProFormCheckbox

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

与 [checkbox](https://ant.design/components/checkbox-cn/) 相同，但是支持了 `options` 与 `layout`。

| 参数       | 说明                                                     | 类型                                             | 默认值 |
| ---------- | -------------------------------------------------------- | ------------------------------------------------ | ------ |
| options    | 与 select 相同，根据 options 生成子节点，推荐使用。      | `string[]` \| `{label:ReactNode,value:string}[]` | -      |
| layout     | 配置 checkbox 的样子，支持垂直`vertical` 和 `horizontal` | `horizontal` \| `vertical`                       | -      |
| request    | 从网络请求枚举数据                                       | `()=>Promise<{label,value}>`                     | -      |
| params     | 发起网络请求的参数，与 request 配合使用                  | `Record`                                         | -      |
| fieldProps | antd 组件的 props                                        | `CheckboxProps`                                  | -      |

```tsx | pure
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="行业分布"
  options={['农业', '制造业', '互联网']}
/>
```

### ProFormRadio.Group

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

与 [radio](https://ant.design/components/radio-cn/) 相同，但是支持了 `options`。

| 参数       | 说明                                                | 类型                                             | 默认值    |
| ---------- | --------------------------------------------------- | ------------------------------------------------ | --------- |
| options    | 与 select 相同，根据 options 生成子节点，推荐使用。 | `string[]` \| `{label:ReactNode,value:string}[]` | -         |
| request    | 从网络请求枚举数据                                  | `()=>Promise<{label,value}>`                     | -         |
| radioType  | 设置是按钮模式还是 radio 模式                       | `default`\|`button`                              | `default` |
| params     | 发起网络请求的参数，与 request 配合使用             | `Record`                                         | -         |
| fieldProps | antd 组件的 props                                   | `RadioProps`                                     | -         |

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

### ProFormCascader

与 [cascader](https://ant.design/components/cascader-cn/) 相同，通过 fieldProps 配置 cascader 的数据。

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

```tsx | pure
<ProFormCascader
  name="area"
  label="区域"
  fieldProps={{
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
    ],
  }}
/>
```

| 参数       | 说明                                                  | 类型                                             | 默认值 |
| ---------- | ----------------------------------------------------- | ------------------------------------------------ | ------ |
| options    | 与 cascader 相同，根据 options 生成子节点，推荐使用。 | `string[]` \| `{label:ReactNode,value:string}[]` | -      |
| request    | 从网络请求枚举数据                                    | `()=>Promise<{label,value}>`                     | -      |
| params     | 发起网络请求的参数，与 request 配合使用               | `Record`                                         | -      |
| fieldProps | antd 组件的 props                                     | `CascaderProps`                                  | -      |

### ProFormSwitch

与 [switch](https://ant.design/components/switch-cn/) 相同，通过 fieldProps 配置 switch 的数据。

| 参数       | 说明              | 类型          | 默认值 |
| ---------- | ----------------- | ------------- | ------ |
| fieldProps | antd 组件的 props | `SwitchProps` | -      |

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

与 [rate](https://ant.design/components/rate-cn/) 相同，通过 fieldProps 配置 rate 的数据。

| 参数       | 说明              | 类型        | 默认值 |
| ---------- | ----------------- | ----------- | ------ |
| fieldProps | antd 组件的 props | `RateProps` | -      |

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

与 [slider](https://ant.design/components/slider-cn/) 相同，通过 fieldProps 配置 slider 的数据。

| 参数       | 说明              | 类型          | 默认值 |
| ---------- | ----------------- | ------------- | ------ |
| fieldProps | antd 组件的 props | `SliderProps` | -      |

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

| 参数        | 说明           | 类型        | 默认值                            |
| ----------- | -------------- | ----------- | --------------------------------- |
| icon        | Dragger 的图标 | `ReactNode` | InboxOutlined                     |
| title       | Dragger 的标题 | `ReactNode` | ' 单击或拖动文件到此区域进行上传' |
| description | Dragger 的描述 | `ReactNode` | ' 支持单次或批量上传'             |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

与 [upload](https://ant.design/components/upload-cn/) 相同。预设了 Button 的样式，其他与 Upload 相同。

| 参数       | 说明                                                                                                                                          | 类型         | 默认值         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------- |
| icon       | Button 的图标                                                                                                                                 | `ReactNode`  | UploadOutlined |
| title      | Button 的标题                                                                                                                                 | `ReactNode`  | 单击上传       |
| max        | 最大上传数量，超过最大数量就会隐藏上传按钮                                                                                                    | `number`     | -              |
| imageProps | 预览 [Image](https://ant-design.antgroup.com/components/image-cn#image) 组件的额外配置，可以自定义预览行为、工具栏以及其他 Image 组件的属性。 | `ImageProps` | -              |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormMoney

ProFormMoney 用于输入金额的输入框，支持根据全局国际化显示货币符号，支持输入负数、支持自定义货币符号等

```tsx | pure
<ProFormMoney
  label="限制金额最小为0"
  name="amount1"
  locale="en-US"
  initialValue={22.22}
  min={0}
/>
<ProFormMoney
  label="不限制金额大小"
  name="amount2"
  locale="en-GB"
  initialValue={22.22}
/>
<ProFormMoney
  label="货币符号跟随全局国际化"
  name="amount3"
  initialValue={22.22}
/>
<ProFormMoney
  label="自定义货币符号"
  name="amount4"
  initialValue={22.22}
  customSymbol="💰"
/>
```

| 参数                | 说明                                                                                                                                        | 类型                                                                              | 默认值       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------ |
| locale              | 单独设置的国际化地区值，根据不同的地区显示不同的货币符号，支持地区详见下面的地区目录                                                        | `string`                                                                          | `zh-Hans-CN` |
| customSymbol        | 自定义金额符号                                                                                                                              | `string`                                                                          | -            |
| numberPopoverRender | 自定义 Popover 的值，false 可以关闭他                                                                                                       | `((props: InputNumberProps, defaultText: string) => React.ReactNode)`\| `boolean` | false        |
| numberFormatOptions | NumberFormat 的配置，文档可以查看 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) | NumberFormatOptions                                                               | -            |
| min                 | 最小值                                                                                                                                      | `number`                                                                          | -            |
| max                 | 最大值                                                                                                                                      | `number`                                                                          | -            |

#### 以下为地区编码与货币符号对照表

```json
{
"ar-EG": "$",
"zh-CN": "¥",
"en-US": "$",
"en-GB": "£",
"vi-VN": "₫",
"it-IT": "€",
"ja-JP": "¥",
"es-ES": "€",
"ru-RU": "₽",
"sr-RS": "RSD",
"ms-MY": "RM",
"zh-TW": "NT$"
"fr-FR": "€",
"pt-BR": "R$",
"ko-KR": "₩",
"id-ID": "RP",
"de-DE": "€",
"fa-IR": "تومان",
"tr-TR": "₺",
"pl-PL": "zł",
"hr-HR": "kn",
}
```

### ProFormSegmented

与 [Segmented](https://ant.design/components/segmented-cn/) 相同。支持了 request 和 valueEnum 两种方式来生成 options。

> 请求远程数据比较复杂，详细可以看[这里](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params)。

| 参数         | 说明                                                    | 类型                         | 默认值 |
| ------------ | ------------------------------------------------------- | ---------------------------- | ------ |
| valueEnum    | 当前列值的枚举 [valueEnum](/components/table#valueenum) | `Record`                     | -      |
| request      | 从网络请求枚举数据                                      | `()=>Promise<{label,value}>` | -      |
| debounceTime | 防抖动时间，与 request 配合使用                         | `number`                     | -      |
| params       | 发起网络请求的参数，与 request 配合使用                 | `Record`                     | -      |
| fieldProps   | antd 组件的 props                                       | `Segmented`                  | -      |

> 有了 options 为什么要支持 valueEnum 呢？ valueEnum 可以与 table，descriptions 共用，在工程化上有优势。

```tsx | pure
<>
  <ProFormSegmented
    name="segmented"
    label="segmented"
    valueEnum={{
      open: '未解决',
      closed: '已解决',
    }}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSegmented
    name="segmented"
    label="segmented"
    request={async () => [
      { label: '全部', value: 'all' },
      { label: '未解决', value: 'open' },
      { label: '已解决', value: 'closed' },
      { label: '解决中', value: 'processing' },
    ]}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```
