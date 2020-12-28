---
title: ProForm
order: 1
group:
  path: /
nav:
  title: Components
  path: /components
---

# ProForm

ProForm adds some syntactic sugar and more layout settings to the original Form to help us develop a form quickly. Also add some default behaviors to make our forms work well by default.

Step-by-step forms, Modal forms, Drawer forms, Query forms, Lightweight filters and many other layouts can cover most of the usage scenarios and get rid of the complex and tedious form layout work, and do more with less code.

ProForm comes with a significant number of Fields, which are essentially a combination of FromItem and components, so we can use them as a FromItem and support various `props`. Each Field supports the `fieldProps` property to support setting the `props` of the input component. We support pass-through of `placeholder`, so you can set `placeholder` directly on the component.

- If you want to set default values, use `initialValues`, any direct use of component `value` and `onChange` may cause the value binding to fail.

- If you want to link forms or do some dependencies, you can use render props mode. Item node that wraps a `noStyle` and `shouldUpdate` to trigger a single render of the form

- If you want to listen to a value, it is recommended to use `onValuesChange`. Keeping a unidirectional data flow is a great benefit for developers and maintainers alike

- ProForm is not a hack, it's just a wrapper around antd's Form. If you want to use a custom component, you can wrap it in Form.

```tsx |pure
// Set overall default values
<ProForm initialValues={obj} />

// Set the individual control's
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>.

// Interdependent component linkage
<ProForm
  <Form.Item noStyle shouldUpdate>
    {(form) => {
      return (
        <ProFormSelect
          options={[
            {
              value: "chapter",
              label: "Effective when stamped",
            },
          ]}
          width="md"
          name="useMode"
          label={`with${form.getFieldValue("name")}contract agreement effective mode`}
        />
      );
    }}
  </Form.Item>.
</ProForm>;


// Using custom components
<ProForm
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item
</ProForm
```

## When to use

ProForm is the best choice when you want to implement a form quickly but don't want to spend too much time on layout.

## Code Examples

### Login

<code src="./demos/login.tsx" height="300px"/>

### Basic Use

<code src="./demos/base.tsx" height="548px"/>

### Interdependent form entries

<code src="./demos/dependency.tsx" height="248px"/>

### Step-by-step form

<code src="./demos/steps-from.tsx" height="532px"/>

### Step-by-Step Forms - Multi-Card

<code src="./demos/multi-card-step-form.tsx"  background="#f5f5f5" height="868px"/>

### Step-by-step forms - use with model

<code src="./demos/modal-step-form.tsx"  background="#f5f5f5" height="32px"/>

### Modal Forms

<code src="./demos/modal-form.tsx"  background="#f5f5f5"  height="32px"/>

### Drawer Forms

<code src="./demos/drawer-form.tsx"  background="#f5f5f5" height="32px"/>

### Query Filter

<code src="./demos/query-filter.tsx" height="168px"/>

### Query filtering - default put away

<code src="./demos/query-filter-collapsed.tsx" height="56px"/>

### Query filtering - vertical layout

<code src="./demos/query-filter-vertical.tsx"  height="172px"/>

### Query Filter - Search

<code src="./demos/search-filter.tsx" background="#f0f2f5" height="274px"/>

### Light filter screening

<code src="./demos/light-filter.tsx" height="86px"/>

### Lightweight filter-border mode

<code src="./demos/light-filter-bordered.tsx" height="32px" />

### Lightweight filtering-collapse mode

All options in collapsed mode will be collapsed by default, with or without values, and the control's `secondary` will no longer be valid.

<code src="./demos/light-filter-collapse.tsx" height="40px"/>

### Fixed footer

<code src="./demos/layout-base.tsx" iframe="764px" />

### Mixed use

<code src="./demos/components-other.tsx" heigh="1774px"/>

### Form Linking

<code src="./demos/linkage-customization.tsx" heigh="1774px" />

<code src="./demos/components-other-readonly.tsx" heigh="1774px" debug/>

## Layouts API

### ProForm

ProForm is a wrapper around antd Form, if you want to customize form elements, ProForm is the same way as antd, you can still customize it with FormItem + custom components. Of course this does not affect other components, QueryFilter and other components as well.

> antd's From api View [here](https://ant.design/components/form-cn/)

| Parameters | Description | Type | Default |
| --- | --- | --- | --- | --- |
| onFinish | Callback event after form is submitted and data validation is successful, same as antd 4 `Form` component API | `(values)=>Promise<void>` | - |
| onReset | Callback for clicking the reset button, the reset button will be rendered only after it is set | `(e)=>void` | - |
| submitter | Submitter button-related configuration | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | AutoFormat data, mainly moment forms, supports string and number modes | `string\| number \|false` | string |
| string | [(...)] (https://ant.design/components/form-cn/) | support other antd `Form` component parameters besides `wrapperCol` \| `labelCol` \| `layout` | - | - |

### ProForm.

| Parameters | Description                   | Type              | Default |
| ---------- | ----------------------------- | ----------------- | ------- |
| title      | title                         | `string`          | -       |
| children   | form control or other element | `React.ReactNode` | -       |

#### submitter

While we would prefer not to modify the submitter, it is a common requirement to do so in use, and ProForm's components use the same API to support the requirement.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| onSubmit | Submit method | `()=>void` | - |
| onReset | Reset method | `()=>void` | - |
| searchConfig | The configuration of the search, generally used to configure the text | `{resetText,submitText}` | - |
| submitButtonProps | The props for the submit button | [ButtonProps](https://ant.design/components/button-cn/) | - |
| resetButtonProps | The props for the reset button | [ButtonProps](https://ant.design/components/button-cn/) | - |
| render | Rendering of custom actions | `false` \|`(props,dom:JSX[])=>ReactNode[]` | - |

The second argument to > render is the default dom array, the first is the reset button and the second is the submit button.

```tsx | pure
<ProForm
  submitter={{
    // Configure the button text
    searchConfig: {
      resetText: 'reset',
      submitText: 'submit',
    },
    // Configure the properties of the button
    resetButtonProps: {},
    submitButtonProps: {},

    // Fully customize the entire area
    render: (props, doms) => {
      return (
        <button type="button" id="rest" onClick={() => props?.onReset? ()}>
          rest
        </button>
      );
    },
  }}
/>
```

### QueryFilter

QueryFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| collapsed | Whether or not to collapse out-of-bounds form items for controlled mode | `boolean` | - |
| defaultCollapsed | Whether or not to collapse out-of-order form items in default state | `boolean` | true |
| onCollapse | Callback when toggling the collapsed state of the form | `(collapsed)=>void` | - |
| hideRequiredMark | Hide the required markers for all form items, **hide by default** | `boolean` | true |
| defaultColsNumber | The default number of controls to be displayed in the collapsed state, if not set or less than 0, one line of controls will be displayed; if the number is greater than or equal to the number of controls, the expand button will be hidden | `number` | - |
| labelWidth | label width | `number` \| `'auto'` | `98` |
| span | width of form items | `number[0 - 24]` | - |
| split | whether each line has a split line | `boolean` | - |

#### Responsive Breakpoint Rules

Note that the values of the breakpoints are the size of the form container and not the viewport size.

##### Rules for default layout

| container-width breakpoint | single-row display form single-column count (including action area) | default layout |
| --- | --- | --- | --- | --- |
| `≧ 1352px` | 4 columns | `horizontal` |
| `≧ 1062px` | 3 columns | `horizontal` |
| `≧ 701px && < 1063px` | 3 columns | `horizontal` | `≧ 701px && < 1063px` | 3 columns |
| `≧ 513px && < 701px` | 2 columns | `vertical` |
| `< 513px` | 1 column | `vertical` |

##### Rules when forcing top and bottom layout

| container width breakpoint | single row display table single column count (including operation area) |
| --- | --- |
| `≧ 1057px` | 4 columns |
| `≧ 785px && < 1057px` | 3 columns |
| `≧ 513px && < 785px` | 2 columns |
| < 513px` | 1 column |

### LightFilter

LightFilter supports the following properties in addition to the API inherited from ProForm.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| collapse | whether to collapse all fields by default | `boolean` | `false` |
| collapseLabel | label of collapsed area | `ReactNode` | `MoreFilter <DownOutlined/>` |

### StepsForm

StepsForm is essentially a Provider that adds a step bar and some related APIs.

The documentation for > Form.Provider can be found [here](https://ant.design/components/form-cn/#Form.Provider), the value of the transform moment is a function provided by ProForm, so `onFormFinish` and ` onFormChange` where the values are untransformed

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| current | The current number of steps in the form, starting from `0` | `number` | 0 |
| onCurrentChange | current The event that changed | `(current:number)=>void` | - |
| onFinish | Triggered when the last step of the form was submitted successfully | `(values:T)=>void` | - |
| stepsProps | StepsForm's own props for Steps, used in the same way as [antd](https://ant.design/components/steps-cn/), but without the current and onChange | [ props](https://ant.design/components/steps-cn/#API) | - |
| stepFormRender | Customize the currently displayed form, return dom inside the form | `(form) => ReactNode` | - |
| stepsFormRender | Customize the entire form area, returning the dom on the outside of the form | `(form,submitter) => ReactNode` | - |
| stepsRender | Customize the stepsizer | `(steps,dom)=>ReactNode` | - |

#### StepForm

Exactly the same as ProForm, except that onFinish supports Promise, so if it returns `false`, it won't jump to the next step.

| onFinish | form submit success trigger | `(values:T)=>Promise<false>` | - |

### ModalForm

ModalForm combines Modal and ProForm to reduce tedious state management.

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| trigger | The dom used to trigger the Modal to open, usually the button | `ReactNode` | - |
| visible | whether to open | `boolean` | - |
| onVisibleChange | trigger when visible changes | `(visible:boolean)=>void` | - |

## Fields API

ProForm comes with Filed , which basically corresponds to valueType.

### Common properties

| parameter | description | type | default |
| --- | --- | --- | --- | --- |
| width | The length of the Field, we summarize the common Field lengths and suitable scenarios, support some enumeration "xs" , "s" , "m" , "l" , "x" | `number \| "xs" \| "s" \| "m" \| "l" \| "x"` | - | tooltip |
| tooltip | will add an icon next to the label to show the configured information when hovered | `string \| tooltipProps` | - |
| secondary | Whether secondary control, only valid for LightFilter | `boolean` | `false` |
| allowClear | Support for clearing, valid for LightFilter, will also be passed to `fieldProps` | `boolean` | `true` | if actively set. |

### Width

In some cases, we need to adapt the input box according to the page display, except that a form area should use the fixed width rule by default.

! [width info](https://gw.alipayobjects.com/zos/antfincdn/CyJPTSL07y/1574664269794-254db9de-2574-4361-bcf1-b82c6db0c80a.png)

- XS=104px for short numbers, short text or options.
- S=216px for shorter field entries, such as name, phone, ID, etc.
- M=328px Standard width, suitable for most field lengths.
- L=440px for longer field entries, such as long URLs, tag groups, file paths, etc.
- XL=552px for long text entry, such as long links, descriptions, notes, etc. Usually used with adaptive multi-line input boxes or fixed height text fields.

### ProFormText

Same as [Input](https://ant.design/components/input-cn/).

```tsx | pure
<ProFormText name="text" label="Name" placeholder="Please enter a name" fieldProps={inputProps} />
```

### ProFormText.Password

Same as [Input.Password](https://ant.design/components/input-cn/#Input.Password).

```tsx | pure
<ProFormText.Password label="InputPassword" name="input-password" />
```

### ProFormDatePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDatePicker name="date" label="date" />
```

### ProFormDateTimePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateTimePicker name="datetime" label="date" />
```

### ProFormDateRangePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateRangePicker name="dateRange" label="date" />
```

### ProFormDateTimeRangePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/).

```tsx | pure
<ProFormDateRangePicker name="datetimeRange" label="date" />
```

### ProFormTimePicker

Same as [DatePicker](https://ant.design/components/date-picker-cn/)

```tsx | pure
<ProFormDateRangePicker name="time" label="time" />
```

### ProFormTextArea

Same as [Input](https://ant.design/components/input-cn/).

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

Same as [checkbox](https://ant.design/components/checkbox-cn/), but supports `options` and `layout`.

| parameters | description | type | default | | --- | --- | --- | --- | options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - | | layout | Configure the look of the checkbox to support vertical `vertical` and `horizontal` | `horizontal` \| `vertical` | - |

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

Same as [radio](https://ant.design/components/radio-cn/) but with support for `options`.

| parameters | description | type | default | | --- | --- | --- | --- | options | options | Same as select, generates child nodes based on options, recommended. | `string[]` \| `{label:ReactNode,value:string}[]` | - | | radioType | set whether button mode or radio mode | `button` \| `radio` | `radio` |

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

Same as [switch](https://ant.design/components/switch-cn/).

```tsx | pure
<ProFormSwitch name="switch" label="Switch" />
```

### ProFormRate

Same as [rate](https://ant.design/components/rate-cn/).

```tsx | pure
<ProFormRate name="rate" label="Rate" />
```

### ProFormSlider

Same as [slider](https://ant.design/components/slider-cn/).

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

Same as [upload](https://ant.design/components/upload-cn/). Dragger style is preset, otherwise it is the same as Upload.

| Parameters  | Description               | Type            | Default                          |
| ----------- | ------------------------- | --------------- | -------------------------------- | -------------------------------------------- |
| icon        | The chart of the Dragger. | `ReactNode`     | InboxOutlined                    |
| title       | Title                     | Dragger's title | `ReactNode`                      | 'Click or drag files to this area to upload' |
| description | Dragger's description     | `ReactNode`     | 'Support single or bulk uploads' |

```tsx | pure
<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### ProFormUploadButton

Same as [upload](https://ant.design/components/upload-cn/). The Button style is preset, otherwise it is the same as Upload.

| Parameters | Description           | Type        | Default         |
| ---------- | --------------------- | ----------- | --------------- |
| icon       | The chart of Dragger. | `ReactNode` | UploadOutlined  |
| title      | Dragger's title       | `ReactNode` | Click to upload |

```tsx | pure
<ProFormUploadButton label="upload" name="upload" action="upload.do" />
```

### ProFormSelect

Same as [select](https://ant.design/components/select-cn/). Both request and valueEnum are supported to generate options.

> Requesting remote data is more complicated, see [here](/components/field#remote data) for details.

> Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.

| parameters | description | type | default |
| --- | --- | --- | --- |
| valueEnum | Enumeration of current values [valueEnum](/components/table#valueenum) | `{[key:string`\|`number]:any}` | - |
| request | Enumerating data from network requests | `()=>Promise<{[key:string`\|`number]:any}>` | - |

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
      { label: 'unresolved', value: 'open' }
      { label: 'Resolved', value: 'closed' }
      { label: 'Resolving', value: 'processing' },
    ]}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
```

### ProFormDigit

Same as [inputNumber](https://ant.design/components/input-number-cn/). It comes with a formatting (retains 2 decimal places, minimum value is 0), you can turn it off if needed.

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

### ProFormFieldSet

ProFormFieldSet can combine the values of multiple children internally and store them in ProForm, and can be transformed at commit time via `transform`. Here is a simple usage to easily combine multiple input fields and format them to the desired data.

```tsx | pure
<ProFormFieldSet
  name="list"
  label="List of components"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet
```
