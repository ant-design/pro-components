---
title: ProForm
atomId: ProForm
order: 1

nav:
  title: Components
---

# ProForm

ProForm adds some syntactic sugar and more layout settings to the original Form to help us develop a form quickly. Also add some default behaviors to make our forms work well by default.

Step-by-step forms, Modal forms, Drawer forms, Query forms, Lightweight filters and many other layouts can cover most of the usage scenarios and get rid of the complicated and tedious form layout work and do more with less code.

- If you want to set default values, please use `initialValues`, any direct use of component `value` and `onChange` may cause value binding failure.

- If you want to link forms or do some dependencies, you can use render props mode, ProFormDependency is definitely the best choice
- ProForm's onFinish, unlike antd's Form, is a Promise that will automatically set the button to load for you if you return normally.
- If you want to listen to a value, it is recommended to use `onValuesChange`. Keeping a unidirectional data flow is a great benefit for both developers and maintainers
- ProForm has no black technology, it's just a wrapper for antd's Form, if you want to use a custom component you can wrap it with Form.

```tsx | pure
// Set overall default values
<ProForm initialValues={obj} />

// Set the individual control's
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>

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
  </ProForm.Item>
</ProForm>;


// Using custom components
<ProForm
  <ProForm.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </ProForm.Item
</ProForm
```

## Data conversion

Many times there is no exact match between the data required by the component and the data required by the backend, and ProForm provides two APIs to solve this problem, 'transform' and 'convertValue'.

### convertValue Pre-conversion

convertValue occurs before the component obtains data, usually the data directly sent from the backend to the frontend, and sometimes needs to be refined.

```tsx | pure
   export type SearchConvertKeyFn = (value: any, field: NamePath) => string | Record<string, any>;
  /**
   * @name Converts the value when getting it, generally used to format the data into the format received by the component
   * @param value field value
   * @param namePath field name
   * @returns the new value of the field
   *
   *
   * @example a,b => [a,b]
   * convertValue: (value,namePath)=> value.split(",")
   * @example string => json
   * convertValue: (value,namePath)=> JSON.parse(value)
   * @example number => date
   * convertValue: (value,namePath)=> Moment(value)
   * @example YYYY-MM-DD => date
   * convertValue: (value,namePath)=> Moment(value,"YYYY-MM-DD")
   * @example string => object
   * convertValue: (value,namePath)=> { return {value,label:value} }
   */
  convertValue?: SearchConvertKeyFn;
```

### transform transform when submitting

Transform occurs when submitting, generally speaking, it is spit out the data stored in the database to the backend.

For the convenience of everyone, both `ProFormDependency` and `formRef` support `transform`, which can get the transformed value.

```tsx | pure
<ProFormDependency>
  {(value, form) => {
    // value is transformed by transform
    // form's current formRef, you can get the unconverted value
    return ReactNode;
  }}
</ProFormDependency>
```

formRef has several built-in methods to get the converted value, which is also more functional than antd's Form. For details, see the type definition of ProFormInstance.

```tsx | pure
  /** Get all data formatted by ProForm */
  getFieldsFormatValue?: (nameList?: true) => T;
  /** Get the single data after formatting */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /** Get the single data after formatting */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /** After validating the fields, return all the data after formatting */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
```

```tsx | pure
  export type SearchTransformKeyFn = (
    value: any,
    namePath: string,
    allValues: any,
  ) => string | Record<string, any>;

  /**
   * @name Convert value when submitting, generally used to convert value into submitted data
   * @param value field value
   * @param namePath field name
   * @param allValues ​​all fields
   * The new value of the @returns field, if an object is returned, it will be merged with all values ​​once
   *
   * @example {name:[a,b] => {name:a,b } transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string } transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:moment} => {name:string transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:moment}=> {name:timestamp} transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string} transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName } transform: (value,namePath,allValues)=> { valueName:value.value, labelName:value.name }
   */
  transform?: SearchTransformKeyFn;
```

## When to Use

ProForm is the best choice when you want to implement a form quickly but don't want to spend too much time on layout.

## Code examples

### Basic Usage

<code src="../demos/base.tsx" ></code>

### Grid mode

supported in `ProForm`, `SchemaForm`, `ModalForm`, `DrawerForm`, `StepsForm`

<code src="../demos/form-layout-grid.tsx" oldtitle="Grid layout"></code>

### Form's layout toggle

<code src="../demos/layout-change.tsx" ></code>

### Interdependent form entries

<code src="../demos/dependency.tsx" ></code>

### Sync submission results to url

<code src="../demos/sync-to-url.tsx" ></code>

### Fixed footer

<code src="../demos/layout-footer.tsx" iframe="580"></code>

### Money

<code src="../demos/money.tsx" oldtitle="Money"></code>

### Form linkage

<code src="../demos/linkage-customization.tsx" ></code>

## Layouts API

### ProForm

ProForm is a repackaging of antd Form, if you want to customize form elements, ProForm is the same way as antd, you can still customize it with FormItem + custom components. Of course this does not affect other components, QueryFilter and other components as well.

> antd's Form api View [here](https://ant.design/components/form/)

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| onFinish | Callback event after form is submitted and data validation is successful, same as antd 4 `Form` component API | `(values)=>Promise<void>` | - |
| onReset | Callback for clicking the reset button | `(e)=>void` | - |
| submitter | Submitter button-related configuration | `boolean` \| `SubmitterProps` | `true` |
| dateFormatter | AutoFormat data, mainly moment forms, supports string and number modes. you also can use formatter function to format date | `string\| number \| ((value: Moment, valueType: string) => string \| number) \|false` | string |
| syncToUrl | sync parameters to url,url only supports string, better read [documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) before using | `true` \| `(values,type)=>values` | - |
| omitNil | ProForm automatically clears null and undefined data, if you have agreed that nil means something, set to false to disable this feature | `boolean` | true |
| formRef | Get the form used by the form | `MutableRefObject<Instance<T>>` | - |
| params | Parameters for initiating network requests, used in conjunction with request | `Record` | - |
| request | The parameters of the initiating network request, the return value will be overwritten to initialValues | `(params)=>Promise<data>` | - |
| isKeyPressSubmit | Whether to use carriage return to submit | `boolean` | - |
| autoFocusFirstInput | The first input box of the auto focus form | `boolean` | - |
| grid | Enable grid mode, default width 100%, use `colProps` to control width | `boolean` | - |
| rowProps | Passed to `Row` when `grid` mode is enabled | [RowProps](https://ant.design/components/grid/#Row) | { gutter: 8 } |
| string | [(...)](https://ant.design/components/form/) | support other antd `Form` component parameters besides `wrapperCol` \| `labelCol` \| `layout` | - |

### ProFormInstance

ProFormInstance adds some capabilities compared to antd's form.

```tsx | pure
  /**
   * Get all data formatted by ProForm
   * @param nameList boolean
   * @returns T
   *
   * @example getFieldsFormatValue() -> returns all data
   * @example getFieldsFormatValue(true) -> returns all data, even if not hosted by form
   */
  getFieldsFormatValue?: (nameList?: true) => T;
  /**
   * Get a single data formatted by ProForm
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  /** Get the single data after formatting */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * Get the single data formatted by ProForm, including his name
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example
   * {a:{b:value}}->getFieldFormatValueObject(['a', 'b'])->{a:{b:value}}
   */
  /** Get the single data after formatting */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   *Return all data after formatting after field validation
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
```

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
        <button
          type="button"
          key="rest"
          onClick={() => props.form?.resetFields()}
        >
          Reset
        </button>,
        <button
          type="button"
          key="submit"
          onClick={() => props.form?.submit?.()}
        >
          Submit
        </button>,
      ];
    },
  }}
/>
```
