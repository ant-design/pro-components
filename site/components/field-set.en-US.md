---
title: ProFormFields
order: 1
atomId: ProFormText
group: Form
---

# ProFormFields

ProForm comes with a significant number of form items, which are essentially a combination of Form.Item and components. Each form item supports the `fieldProps` property to support setting the `props` of the input component. We support pass-through of `placeholder`, so you can set `placeholder` directly on the component.

Each form item also supports `readonly`, which has different read-only styles for different components, making `readonly` display more friendly compared to `disable`. The generated dom is also smaller, e.g. ProFormDigit automatically formats decimal digits.

ProFormText is the product of FormItem + Input and can be analogous to the following code.

```tsx | pure
const ProFormText = (props) => {
  return (
    <ProForm.Item {...props}>
      <Input placeholder={props.placeholder} {...props.fieldProps} />
    </ProForm.Item>
  );
};
```

So the props we set for ProFormText are actually for Form.Item, and the fieldProps are for the included Input, remember.

## Component List

| Component                                                                      | Usage Scenario                                                                                                                         |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| [ProFormText](https://ant.design/components/input-cn/#Input.Password)          | Suitable for various text inputs                                                                                                       |
| [ProFormDigit](https://ant.design/components/input-number-cn/)                 | Numeric input component with formatting support (default: two decimal places, minimum value: 0), formatting can be disabled if needed. |
| [ProFormText.Password](https://ant.design/components/input-cn/#Input.Password) | Suitable for password input                                                                                                            |
| [ProFormTextArea](https://ant.design/components/input-cn/#Input.Password)      | Supports multi-line text input, ideal for longer text content                                                                          |
| ProFormCaptcha                                                                 | Used for verification code input, typically combined with a verification code API                                                      |
| [ProFormDatePicker](https://ant.design/components/date-picker-cn/)             | Date picker, suitable for selecting a single date                                                                                      |
| [ProFormDateTimePicker](https://ant.design/components/date-picker-cn/)         | Date + Time picker, suitable for combined date and time selection scenarios                                                            |
| [ProFormDateRangePicker](https://ant.design/components/date-picker-cn/)        | Date range picker, suitable for selecting a date range                                                                                 |
| [ProFormDateTimeRangePicker](https://ant.design/components/date-picker-cn/)    | Date + Time range picker, suitable for selecting a date and time range                                                                 |
| [ProFormSelect](https://ant.design/components/select-cn/)                      | Supports generating options using `request` and `valueEnum`, suitable for selecting one item from multiple options.                    |
| [ProFormTreeSelect](https://ant.design/components/tree-select-cn/)             | Supports generating options using `request` and `valueEnum`, suitable for tree-structured option selection.                            |
| [ProFormCheckbox](https://ant.design/components/checkbox-cn/)                  | Supports `layout`, and options can be generated using `request` and `valueEnum`                                                        |
| [ProFormRadio.Group](https://ant.design/components/radio-cn/)                  | Supports generating options using `request` and `valueEnum`, suitable for single-option selection with all options displayed           |
| [ProFormSlider](https://ant.design/components/slider-cn/)                      | Suitable for selecting values within a numeric or custom range, supports continuous and discrete values.                               |
| [ProFormSwitch](https://ant.design/components/switch-cn/)                      | Suitable for toggling between two mutually exclusive options, typically `true` and `false`                                             |
| [ProFormUploadButton](https://ant.design/components/upload-cn/)                | Button-style file uploader                                                                                                             |
| [ProFormUploadDragger](https://ant.design/components/upload-cn/)               | Drag-and-drop file uploader, commonly used in prominent upload form areas                                                              |
| ProFormMoney                                                                   | General-purpose monetary input component                                                                                               |
| [ProFormSegmented](https://ant.design/components/segmented-cn/)                | Segmented control for dividing options into sections                                                                                   |

## Code examples

<code src="../../demos/form/FieldSet/components-other.tsx" title="Form field"></code>

<code src="../../demos/form/FieldSet/search-select.tsx" title="Query form"></code>

<code src="../../demos/form/FieldSet/form-fieldset.tsx" title="Structured data" ></code>

<code src="../../demos/form/FieldSet/datatime.tsx" title="Date form"></code>

<code src="../../demos/form/FieldSet/upload.tsx" title="Upload form"></code>

<code src="../../demos/form/FieldSet/components-other-readonly.tsx" title="Read-only for form field"></code>

<code src="../../demos/form/FieldSet/fieldSet-light.tsx" title="Used in Lightweight Filtering - light" ></code>

## API

ProForm comes with Filed , which basically corresponds to the valueType one by one.

### Generic properties

| Parameters | Description                                                                                                                                  | Type                                                | Default       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| width      | The length of the Field, we summarize the common Field lengths and suitable scenarios, support some enumeration "xs" , "s" , "m" , "l" , "x" | `number \| "xs" \| "s" \| "m" \| "l" \| "x"`        | -             |
| rowProps   | Passed to `Row` when `grid` mode is enabled, Applies only to `ProFormGroup`, `ProFormList`, `ProFormFieldSet`                                | [RowProps](https://ant.design/components/grid/#Row) | { gutter: 8 } |
| colProps   | Passed to `Col` when `grid` mode is enabled                                                                                                  | [ColProps](https://ant.design/components/grid/#Col) | { xs: 24 }    |
| tooltip    | will add an icon next to the label to show the configured information when hovered                                                           | `string \| tooltipProps`                            | -             |
| secondary  | Whether secondary control, only valid for LightFilter                                                                                        | `boolean`                                           | `false`       |
| allowClear | Support for clearing, valid for LightFilter, will also be passed to `fieldProps` if actively set.                                            | `boolean`                                           | `true`        |

### Width

In some cases, we need to adapt the input box according to the page display, except that a form area should use the fixed width rule by default.

![width info](https://gw.alipayobjects.com/zos/alicdn/oEHLxX9DO/22.jpg)

- `XS=104px` for short numbers, short text or options.
- `S=216px` for shorter field entries, such as name, phone, ID, etc.
- `M=328px` Standard width, suitable for most field lengths.
- `L=440px` Suitable for longer field entries, such as long URLs, tag groups, file paths, etc.
- `XL=552px` Suitable for long text entry, such as long links, descriptions, notes, etc., usually used with adaptive multi-line input boxes or fixed height text fields.

### ProFormText

Same as [Input](https://ant.design/components/input/).

```tsx | pure
<ProFormText
  name="text"
  label="Name"
  placeholder="Please enter a name"
  fieldProps={inputProps}
/>
```

### ProFormCaptcha

ProFormCaptcha is a component developed to support common CAPTCHA functionality in the middle and backend.

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
  // The name of the phone number, which is injected by onGetCaptcha
  phoneName="phone"
  name="captcha"
  rules={[
    {
      required: true,
      message: 'Please enter the verification code',
    },
  ]}
  placeholder="Please enter a captcha"
  // If you need to fail, you can throw an error and onGetCaptcha will stop automatically
  // throw new Error("Error getting captcha")
  onGetCaptcha={async (phone) => {
    await waitTime(1000);
    message.success(
      `phone number ${phone} Verification code sent successfully! `,
    );
  }}
/>
```

| Parameters        | Description                                                                                         | Type                                                  | Default |
| ----------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------- |
| onGetCaptcha      | The event to click to get the captcha, if phoneName is configured it will be injected automatically | `(phone)=>Promise<any>`                               | -       |
| captchaProps      | The props of the Get Captcha button, same as antd's props                                           | `ButtonProps`                                         | -       |
| countDown         | The number of seconds to count down                                                                 | number                                                | 60      |
| captchaTextRender | Render the text of the timer                                                                        | `(timing: boolean, count: number) => React.ReactNode` | -       |

### ProFormText.Password

Same as [Input.Password](https://ant.design/components/input/#Input.Password).

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
```

### ProFormTextArea

Same as [Input.TextArea](https://ant.design/components/input/#Input.TextArea).

```tsx | pure
<ProFormTextArea
  name="text"
  label="name"
  placeholder="Please enter a name"
  fieldProps={inputTextAreaProps}
/>
```

### ProFormDigit

Same as [inputNumber](https://ant.design/components/input-number/). It comes with a formatting (retains 2 decimal places, minimum value is 0), you can turn it off if needed.

```tsx | pure
<ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
```

If you want to change the number of decimal places.

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

Same as [inputNumber](https://ant.design/components/input-number/). It provides numeric range input.

```tsx | pure
<ProFormDigitRange label="InputNumberRange" name="input-number-range" />
```

### ProFormDatePicker

Same as [DatePicker](https://ant.design/components/date-picker/).

```tsx | pure
<ProFormDatePicker name="date" label="date" />
```

### ProFormDateTimePicker

Same as [DatePicker](https://ant.design/components/date-picker/).

```tsx | pure
<ProFormDateTimePicker name="datetime" label="datetime" />
```

### ProFormDateRangePicker

Same as [DatePicker.RangePicker](https://ant.design/components/date-picker/#RangePicker).

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="date" />
```

### ProFormDateTimeRangePicker

Same as [DatePicker.RangePicker](https://ant.design/components/date-picker/#RangePicker).

```tsx | pure
<ProFormDateTimeRangePicker name="datetimeRange" label="datetime" />
```

### ProFormTimePicker

Same as [DatePicker](https://ant.design/components/date-picker/)

```tsx | pure
<ProFormDateRangePicker name="time" label="time" />
```

### ProFormSelect

Same as [select](https://ant.design/components/select/). Both request and valueEnum are supported to generate options.

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

| Parameters   | Description                                                                     | Type                                        | Default |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
| valueEnum    | Enumeration of current values [valueEnum](/components/table#valueenum)          | `Record`                                    | -       |
| request      | Enumerate data from network requests                                            | `()=>Promise<{[key:string`\|`number]:any}>` | -       |
| debounceTime | Debounce time, used in conjunction with `request`                               | `number`                                    | -       |
| params       | Parameters for initiating network requests, used in conjunction with `request`. | `Record`                                    | -       |
| fieldProps   | Props of Ant Design component                                                   | `SelectProps `                              | -       |

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

```tsx | pure
<>
  <ProFormSelect
    name="select"
    label="Select"
    valueEnum={{
      open: 'Unresolved',
      closed: 'Resolved',
    }}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSelect
    name="select2"
    label="Select"
    request={async () => [
      { label: 'all', value: 'all' }
      { label: 'Unresolved', value: 'open' }
      { label: 'Resolved', value: 'closed' }
      { label: 'Resolving', value: 'processing' },
    ]}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```

Related ProFormSelect

```tsx | pure
  <ProFormText name="name" label="姓名" />
  <ProFormSelect
    name="addr"
    width="md"
    label="Selector linked with name"
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

Customize options：

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

Same as [tree-select](https://ant.design/components/tree-select/). Both request and valueEnum are supported to generate options.

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

> When using `onOpenChange` in `fieldProps`, you need to separately manage the `open` state. For details, refer to [#8876](https://github.com/ant-design/pro-components/issues/8876)

| Parameters   | Description                                                                     | Type                                        | Default |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
| valueEnum    | Enumeration of current values [valueEnum](/components/table#valueenum)          | `Record`                                    | -       |
| request      | Enumerate data from network requests                                            | `()=>Promise<{[key:string`\|`number]:any}>` | -       |
| debounceTime | Debounce time, used in conjunction with `request`                               | `number`                                    | -       |
| params       | Parameters for initiating network requests, used in conjunction with `request`. | `Record`                                    | -       |
| fieldProps   | Props of Ant Design component                                                   | `TreeSelectProps`                           | -       |

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

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

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

Same as [checkbox](https://ant.design/components/checkbox/), but supports `options` and `layout`.

| Parameters | Description                                                                        | Type                                             | Default |
| ---------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| options    | Same as select, generates child nodes based on options, recommended.               | `string[]` \| `{label:ReactNode,value:string}[]` | -       |
| layout     | Configure the look of the checkbox to support vertical `vertical` and `horizontal` | `horizontal` \| `vertical`                       | -       |
| request    | Enumerate data from network requests                                               | `()=>Promise<{label,value}>`                     | -       |
| params     | Parameters for initiating network requests, used in conjunction with `request`.    | `Record`                                         | -       |
| fieldProps | Props of Ant Design component                                                      | `CheckboxProps`                                  | -       |

```tsx | pure
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="Industry Distribution"
  options={['Agriculture', 'Manufacturing', 'Internet']}
/>
```

### ProFormRadio.Group

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

Same as [radio](https://ant.design/components/radio/) but with support for `options`.

| Parameters | Description                                                                     | Type                                             | Default   |
| ---------- | ------------------------------------------------------------------------------- | ------------------------------------------------ | --------- |
| options    | Same as select, generates child nodes based on options, recommended.            | `string[]` \| `{label:ReactNode,value:string}[]` | -         |
| request    | Enumerate data from network requests                                            | `()=>Promise<{label,value}>`                     | -         |
| radioType  | Set whether button mode or radio mode                                           | `default` \| `button`                            | `default` |
| params     | Parameters for initiating network requests, used in conjunction with `request`. | `Record`                                         | -         |
| fieldProps | Props of Ant Design component                                                   | `RadioProps`                                     | -         |

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

Same as [cascader](https://ant.design/components/cascader-cn/), configure Cascader data through `fieldProps`.

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

```tsx | pure
<ProFormCascader
  name="area"
  label="Area"
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

| Parameters | Description                                                                            | Type                                             | Default |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------ | ------- |
| options    | Similar to Cascader, generates child nodes based on options. It is recommended to use. | `string[]` \| `{label:ReactNode,value:string}[]` | -       |
| request    | Enumerate data from network requests                                                   | `()=>Promise<{label,value}>`                     | -       |
| params     | Parameters for initiating network requests, used in conjunction with `request`.        | `Record`                                         | -       |
| fieldProps | Props of Ant Design component                                                          | `CascaderProps`                                  | -       |

### ProFormSwitch

Same as [switch](https://ant.design/components/switch/), configure Switch data through `fieldProps`.

| Parameters | Description                   | Type          | Default |
| ---------- | ----------------------------- | ------------- | ------- |
| fieldProps | Props of Ant Design component | `SwitchProps` | -       |

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

Same as [rate](https://ant.design/components/rate/), configure Rate data through `fieldProps`.

| Parameters | Description                   | Type        | Default |
| ---------- | ----------------------------- | ----------- | ------- |
| fieldProps | Props of Ant Design component | `RateProps` | -       |

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

Same as [slider](https://ant.design/components/slider/), configure Slider data through `fieldProps`.

| Parameters | Description                   | Type          | Default |
| ---------- | ----------------------------- | ------------- | ------- |
| fieldProps | Props of Ant Design component | `SliderProps` | -       |

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

Same as [upload](https://ant.design/components/upload/). Dragger style is preset, otherwise it is the same as Upload.

| Parameters  | Description               | Type        | Default                                      |
| ----------- | ------------------------- | ----------- | -------------------------------------------- |
| icon        | The chart of the Dragger. | `ReactNode` | InboxOutlined                                |
| title       | Dragger's title           | `ReactNode` | 'Click or drag files to this area to upload' |
| description | Dragger's description     | `ReactNode` | 'Support single or bulk uploads'             |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

Same as [upload](https://ant.design/components/upload/). The Button style is preset, otherwise it is the same as Upload.

| Parameters | Description                                                                                                                                                                                                   | Type         | Default         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------- |
| icon       | The chart of Dragger.                                                                                                                                                                                         | `ReactNode`  | UploadOutlined  |
| title      | Dragger's title                                                                                                                                                                                               | `ReactNode`  | Click to upload |
| max        | Maximum upload quantity. The upload button will be hidden if the maximum quantity is exceeded                                                                                                                 | `number`     | -               |
| imageProps | Preview the additional configuration of the [Image](https://ant-design.antgroup.com/components/image-cn) component, and you can customize the preview behavior, toolbar and other image component properties. | `ImageProps` | -               |
| ```tsx     | pure                                                                                                                                                                                                          |

<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormMoney

ProFormMoney's input box for entering amounts supports the display of currency symbols based on global internationalization, negative input, custom currency symbols, and more.

```tsx | pure
<ProFormMoney
  label="The minimum limit is 0"
  name="amount1"
  locale="en-US"
  initialValue={22.22}
  min={0}
/>
<ProFormMoney
  label="There is no limit to the amount size"
  name="amount2"
  locale="en-GB"
  initialValue={22.22}
/>
<ProFormMoney
  label="Currency symbols follow global internationalization"
  name="amount3"
  initialValue={22.22}
/>
<ProFormMoney
  label="Custom currency symbols"
  name="amount4"
  initialValue={22.22}
  customSymbol="💰"
/>
```

| Parameters          | Description                                                                                                                                                                               | Type                                                                               | Default      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------ |
| locale              | The internationalized region values set separately show different currency symbols depending on the region, as detailed in the region directory below                                     | `string`                                                                           | `zh-Hans-CN` |
| customSymbol        | Custom amount symbol                                                                                                                                                                      | `string`                                                                           | -            |
| numberPopoverRender | Custom Popover's value, false, can close his                                                                                                                                              | `((props: InputNumberProps, defaultText: string) => React.ReactNode)` \| `boolean` | false        |
| numberFormatOptions | The configuration of NumberFormat, where the documentation can view the of the [mdn](https://developer.mozilla.org/zh-CN/docs/web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)) | NumberFormatOptions                                                                | -            |
| min                 | The minimum value is                                                                                                                                                                      | `number`                                                                           | -            |
| max                 | The maximum value is                                                                                                                                                                      | `number`                                                                           | -            |

#### Below is a table of regional codes and currency symbols

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

Same as [Segmented](https://ant.design/components/segmented-cn/). Supports both `request` and `valueEnum` methods to generate options.

> Requesting remote data is more complicated, see [here](https://procomponents.ant.design/components/schema#request-%E5%92%8C-params) for details.

| Parameters   | Description                                                                     | Type                                        | Default |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
| valueEnum    | Enumeration of current values [valueEnum](/components/table#valueenum)          | `Record`                                    | -       |
| request      | Enumerate data from network requests                                            | `()=>Promise<{[key:string`\|`number]:any}>` | -       |
| debounceTime | Debounce time, used in conjunction with `request`                               | `number`                                    | -       |
| params       | Parameters for initiating network requests, used in conjunction with `request`. | `Record`                                    | -       |
| fieldProps   | Props of Ant Design component                                                   | `Segmented `                                | -       |

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

```tsx | pure
<>
  <ProFormSegmented
    name="segmented"
    label="segmented"
    valueEnum={{
      open: 'Unresolved',
      closed: 'Resolved',
    }}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSegmented
    name="segmented"
    label="segmented"
    request={async () => [
      { label: 'All', value: 'all' },
      { label: 'Unresolved', value: 'open' },
      { label: 'Resolved', value: 'closed' },
      { label: 'In Progress', value: 'processing' },
    ]}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```
