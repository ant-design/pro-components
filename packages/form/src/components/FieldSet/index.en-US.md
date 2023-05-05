---
title: ProFormFields
order: 1
atomId: ProFormText
nav:
  title: Components
---

# ProFormFields

ProForm comes with a significant number of form items, which are essentially a combination of Form.Item and components. Each form item supports the `fieldProps` property to support setting the `props` of the input component. We support pass-through of `placeholder`, so you can set `placeholder` directly on the component.

Each form item also supports `readonly`, which has different read-only styles for different components, making `readonly` display more friendly compared to `disable`. The generated dom is also smaller, e.g. ProFormDigit automatically formats decimal digits.

ProFormText is the product of FormItem + Input and can be analogous to the following code.

```tsx | pure
const ProFormText = (props) => {
  return (
    <ProForm.Item {. .props}>
      <Input placeholder={props.placeholder} {. .props.fieldProps} />
    </ProForm.Item
  );
};
```

So the props we set for ProFormText are actually for Form.Item, and the fieldProps are for the included Input, remember.

## Demo

### Full amount of form field

<code src="./demos/components-other.tsx"></code>

### Query form

<code src="./demos/search-select.tsx" oldtitle=" Query form"></code>

### Date form

<code src="./demos/datatime.tsx" oldtitle="Date form"></code>

### Upload form

<code src="./demos/upload.tsx" oldtitle="Upload form"></code>

### Structured data

<code src="./demos/form-fieldset.tsx" oldtitle="Structured data"></code>

### Read-only for form field

<code src="./demos/components-other-readonly.tsx" debug></code>

## API

ProForm comes with Filed , which basically corresponds to the valueType one by one.

### Generic properties

| parameter | description | type | default |
| --- | --- | --- | --- |
| width | The length of the Field, we summarize the common Field lengths and suitable scenarios, support some enumeration "xs" , "s" , "m" , "l" , "x" | `number \| "xs" \| "s" \| "m" \| "l" \| "x"` | - |
| rowProps | Passed to `Row` when `grid` mode is enabled, Applies only to `ProFormGroup`, `ProFormList`, `ProFormFieldSet` | [RowProps](https://ant.design/components/grid/#Row) | { gutter: 8 } |
| colProps | Passed to `Col` when `grid` mode is enabled | [ColProps](https://ant.design/components/grid/#Col) | { xs: 24 } |
| tooltip | will add an icon next to the label to show the configured information when hovered | `string \| tooltipProps` | - |
| secondary | Whether secondary control, only valid for LightFilter | `boolean` | `false` |
| allowClear | Support for clearing, valid for LightFilter, will also be passed to `fieldProps` if actively set. | `boolean` | `true` |

### Width

In some cases, we need to adapt the input box according to the page display, except that a form area should use the fixed width rule by default.

! [width info](https://gw.alipayobjects.com/zos/antfincdn/CyJPTSL07y/1574664269794-254db9de-2574-4361-bcf1-b82c6db0c80a.png)

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

| parameters | description | type | default |
| --- | --- | --- | --- |
| onGetCaptcha | The event to click to get the captcha, if phoneName is configured it will be injected automatically | `(phone)=>Promise<any>` | - |
| captchaProps | The props of the Get Captcha button, same as antd's props | `ButtonProps` | - |
| countDown | The number of seconds to count down | number | 60 |
| captchaTextRender | Render the text of the timer | `(timing: boolean, count: number) => React.ReactNode` | - |

### ProFormText.Password

Same as [Input.Password](https://ant.design/components/input/#Input.Password).

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
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

### ProFormCheckbox

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

Same as [checkbox](https://ant.design/components/checkbox/), but supports `options` and `layout`.

| parameters | description | type | default |
| --- | --- | --- | --- | --- |
| options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - |
| layout | Configure the look of the checkbox to support vertical `vertical` and `horizontal` | `horizontal` \| `vertical` | - |

```tsx | pure
<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="Industry Distribution"
  options={['Agriculture', 'Manufacturing', 'Internet']}
/>
```

### ProFormRadio.Group

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

Same as [radio](https://ant.design/components/radio/) but with support for `options`.

| parameters | description | type | default |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - |  | radioType | Set whether button mode or radio mode | `default` \| `button` | `default` |

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

Same as [switch](https://ant.design/components/switch/).

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

Same as [rate](https://ant.design/components/rate/).

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

Same as [slider](https://ant.design/components/slider/).

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

| Parameters | Description | Type | Default |
| --- | --- | --- | --- | --- |
| icon | The chart of the Dragger. | `ReactNode` | InboxOutlined |
| title | Title | Dragger's title | `ReactNode` | 'Click or drag files to this area to upload' |
| description | Dragger's description | `ReactNode` | 'Support single or bulk uploads' |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

Same as [upload](https://ant.design/components/upload/). The Button style is preset, otherwise it is the same as Upload.

| Parameters | Description           | Type        | Default         |
| ---------- | --------------------- | ----------- | --------------- |
| icon       | The chart of Dragger. | `ReactNode` | UploadOutlined  |
| title      | Dragger's title       | `ReactNode` | Click to upload |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormSelect

Same as [select](https://ant.design/components/select/). Both request and valueEnum are supported to generate options.

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

| parameters | description | type | default |
| --- | --- | --- | --- |
| valueEnum | Enumeration of current values [valueEnum](/components/table#valueenum) | `Record` | - |
| request | Enumerate data from network requests | `()=>Promise<{[key:string`\|`number]:any}>` | - |

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

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

| parameters | description | type | default |
| --- | --- | --- | --- |
| valueEnum | Enumeration of current values [valueEnum](/components/table#valueenum) | `Record` | - |
| request | Enumerate data from network requests | `()=>Promise<{[key:string`\|`number]:any}>` | - |

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
    showArrow: false,
    filterTreeNode: true,
    showSearch: true,
    dropdownMatchSelectWidth: false,
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

| parameters | description | type | default |
| --- | --- | --- | --- |
| locale | The internationalized region values set separately show different currency symbols depending on the region, as detailed in the region directory below | `string` | `zh-Hans-CN` |
| customSymbol | Custom amount symbol | `string` | - |
| numberPopoverRender | Custom Popover's value, false, can close his | `((props: InputNumberProps, defaultText: string) => React.ReactNode)` \| `boolean` | false |
| numberFormatOptions | The configuration of NumberFormat, where the documentation can view the of the [mdn](https://developer.mozilla.org/zh-CN/docs/web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)) | NumberFormatOptions | - |
| min | The minimum value is | `number` | - |
| max | The maximum value is | `number` | - |

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
