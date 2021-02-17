---
title: ProFormFields - 表单项
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProFormFields

一个表单除了 Form 之外还是需要一系列的表单项，ProForm 自带了数量可观的表单项, 这些组件本质上是 Form.Item 和 组件的结合，我们可以帮他们当成一个 FromItem 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的`props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。

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

所以我们给 ProFormText 设置的 props 其实是 Form.Item 的，fieldProps 才是包含的 Input 的，要切记。

除了展示型的表单项,我们还提供了用来组合数据的表单项:

## ProFormList

ProFormList 与 [Form.List](https://ant.design/components/form-cn/#Form.List) API 基本相同，增加了自带的操作按钮：删除和复制，并且自带了了一个`新建一行`按钮。

```tsx | pure
<ProFormList
  name="users"
  initialValue={[
    {
      useMode: 'chapter',
    },
  ]}
  creatorButtonProps={{
    position: 'top',
    creatorButtonText: '在建一行',
  }}
  creatorRecord={{
    useMode: 'none',
  }}
>
  <ProFormSelect
    options={[
      {
        value: 'chapter',
        label: '盖章后生效',
      },
      {
        value: 'none',
        label: '不生效',
      },
    ]}
    width="md"
    name="useMode"
    label="合同约定生效方式"
  />
</ProFormList>
```

### ProFormList API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| creatorRecord | 新建一行的默认值 | `Record<string, any>` | - |
| creatorButtonProps | 新建一行按钮的配置 | `buttonProps & { creatorButtonText:string,position:"top"\|"bottom" }` | `{creatorButtonText:"新建一行"}` |
| label | 与 From.Item 相同 | `ReactNode` | - |
| name | list 在 form 中的值，必填项 | `NamePath` | - |

## ProFormFieldSet

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

## ProFormDependency

ProFormDependency 是一个简化版本的 Form.Item，它默认内置了 noStyle 与 shouldUpdate，我们只需要配置 name 来确定我们依赖哪个数据，ProFormDependency 会自动处理 diff 和并且从表单中提取相应的值。

name 参数必须要是一个数组，如果是嵌套的结构可以这样配置 `name={['name', ['name2', 'text']]}`。配置的 name 的值会在 renderProps 中传入。`name={['name', ['name2', 'text']]}` 传入的 values 的值 为 `{ name: string,name2: { text:string } }`。

```tsx | pure
<ProFormDependency name={['name']}>
  {({ name }) => {
    return (
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="md"
        name="useMode"
        label={`与《${name}》合同约定生效方式`}
      />
    );
  }}
</ProFormDependency>
```

## 代码示例

### 全量的表单项

<code src="./demos/components-other.tsx" heigh="1774px"/>

### 表单项的只读

<code src="./demos/components-other-readonly.tsx" heigh="1774px"/>

## API

ProForm 自带的 Filed ,与 valueType 基本上一一对应。

### 通用的属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | Field 的长度，我们归纳了常用的 Field 长度以及适合的场景，支持了一些枚举 "xs" , "sm" , "md" ,"lg" , "xl" | `number \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | - |
| tooltip | 会在 label 旁增加一个 icon，悬浮后展示配置的信息 | `string \| tooltipProps` | - |
| secondary | 是否是次要控件，只针对 LightFilter 下有效 | `boolean` | `false` |
| allowClear | 支持清除，针对 LightFilter 下有效，主动设置情况下同时也会透传给 `fieldProps` | `boolean` | `true` |

### 宽度

在某些场景下，我们需要根据页面展示效果对输入框进行自适应处理，除此以外一个表单区域应默认使用定宽规则。

![width info](https://gw.alipayobjects.com/zos/antfincdn/CyJPTSL07y/1574664269794-254db9de-2574-4361-bcf1-b82c6db0c80a.png)

- `XS=104px` 适用于短数字、短文本或选项。
- `SM=216px` 适用于较短字段录入、如姓名、电话、ID 等。
- `MD=328px` 标准宽度，适用于大部分字段长度。
- `LG=440px` 适用于较长字段录入，如长网址、标签组、文件路径等。
- `XL=552px` 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。

### ProFormText

与 [Input](https://ant.design/components/input-cn/) 相同。

```tsx | pure
<ProFormText name="text" label="名称" placeholder="请输入名称" fieldProps={inputProps} />
```

### ProFormCaptcha

ProFormCaptcha 是为了支持中后台中常见的验证码功能开发的组件。

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

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onGetCaptcha | 点击获取验证码的事件，如果配置了 phoneName 会自动注入 | `(phone)=>Promise<any>` | - |
| captchaProps | 获取验证码按钮的 props，与 antd 的 props 相同 | `ButtonProps` | - |
| countDown | 倒计时的秒数 | number | 60 |
| captchaTextRender | 渲染计时的文案 | `(timing: boolean, count: number) => React.ReactNode` | - |

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

与 [DatePicker](https://ant.design/components/time-picker-cn/) 相同

```tsx | pure
<ProFormTimePicker name="time" label="时间" />
<ProFormTimePicker.RangePicker name="timeRange" label="时间区间" />
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
