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

Step-by-step forms, Modal forms, Drawer forms, Query forms, Lightweight filters and many other layouts can cover most of the usage scenarios and get rid of the complicated and tedious form layout work and do more with less code.

- If you want to set default values, please use `initialValues`, any direct use of component `value` and `onChange` may cause value binding failure.

- If you want to link forms or do some dependencies, you can use render props mode, ProFormDependency is definitely the best choice
- ProForm's onFinish, unlike antd's Form, is a Promise that will automatically set the button to load for you if you return normally.
- If you want to listen to a value, it is recommended to use `onValuesChange`. Keeping a unidirectional data flow is a great benefit for both developers and maintainers
- ProForm has no black technology, it's just a wrapper for antd's Form, if you want to use a custom component you can wrap it with Form.

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
  <ProForm.Item noStyle shouldUpdate>
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
  </ProForm.Item>.
</ProForm>;


// Using custom components
<ProForm
  <ProForm.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </ProForm.Item
</ProForm
```

## When to Use

ProForm is the best choice when you want to implement a form quickly but don't want to spend too much time on layout.

## Code examples

### Basic Usage

<code src="./demos/base.tsx" height="548px"/>

### Form's layout toggle

<code src="./demos/layout-change.tsx" height="548px"/>

### Login

<code src="./demos/login-form.tsx" height="300px"/>

### Interdependent form entries

<code src="./demos/dependency.tsx" height="248px"/>

### Sync submission results to url

<code src="./demos/sync-to-url.tsx" height="548px"/>

### Fixed footer

<code src="./demos/layout-base.tsx" iframe="764px" />

### Form linkage

<code src="./demos/linkage-customization.tsx" heigh="1774px" />

## Layouts API

### ProForm

ProForm is a repackaging of antd Form, if you want to customize form elements, ProForm is the same way as antd, you can still customize it with FormItem + custom components. Of course this does not affect other components, QueryFilter and other components as well.

> antd's Form api View [here](https://ant.design/components/form/)

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| onFinish | Callback event after form is submitted and data validation is successful, same as antd 4 `Form` component API | `(values)=>Promise<void>` | - |
| onReset | Callback for clicking the reset button | `(e)=>void` | - |
| submitter | Submitter button-related configuration | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | AutoFormat data, mainly moment forms, supports string and number modes | `string\| number \|false` | string |
| syncToUrl | sync parameters to url,url only supports string, better read [documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) before using | `true` \| `(values,type)=>values` | - |
| omitNil | ProForm automatically clears null and undefined data, if you have agreed that nil means something, set to false to disable this feature | `boolean` | true |
| params | Parameters for initiating network requests, used in conjunction with request | `Record` | - |
| request | The parameters of the initiating network request, the return value will be overwritten to initialValues | `(params)=>Promise<data>` | - |
| isKeyPressSubmit | Whether to use carriage return to submit | `boolean` | - |
| autoFocusFirstInput | The first input box of the auto focus form | `boolean` | - |
| string | [(...)](https://ant.design/components/form/) | support other antd `Form` component parameters besides `wrapperCol` \| `labelCol` \| `layout` | - |

### ProForm.Group

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
| submitButtonProps | The props for the submit button | [ButtonProps](https://ant.design/components/button/) | - |
| resetButtonProps | The props for the reset button | [ButtonProps](https://ant.design/components/button/) | - |
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
    resetButtonProps: {
      style: {
        // Hide the reset button
        display: 'none',
      },
    },
    submitButtonProps: {},

    // Fully customize the entire area
    render: (props, doms) => {
      console.log(props);
      return [
        <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
          Reset
        </button>,
        <button type="button" key="submit" onClick={() => props.form?.submit? ()}>
          Submit
        </button>,
      ];
    },
  }}
/>
```
