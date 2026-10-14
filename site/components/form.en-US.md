---
title: ProForm Advanced Form
atomId: ProForm
order: 1
group: Form
---

# ProForm Advanced Form

ProForm adds some syntactic sugar and more layout settings to the original Form to help us develop a form quickly. Also add some default behaviors to make our forms work well by default.

Step-by-step forms, Modal forms, Drawer forms, Query forms, lightweight filters, and other layouts cover most scenarios and help you accomplish more with less layout code.

- If you want to set default values, please use `initialValues`, any direct use of component `value` and `onChange` may cause value binding failure.
- If you want to link forms or do some dependencies, you can use render props mode, ProFormDependency is definitely the best choice
- ProForm's onFinish, unlike antd's Form, is a Promise that will automatically set the button to load for you if you return normally.
- If you want to listen to a value, it is recommended to use `onValuesChange`. Keeping a unidirectional data flow is a great benefit for both developers and maintainers
- ProForm is not magic: it is just a thin wrapper around antd's Form—use `Form.Item` for custom controls and mix freely.

## Issue regression scenarios

<code src="../../demos/form/overlay-initial-values.tsx" title="Modal initialization: ModalForm.initialValues"></code>
<code src="../../demos/form/request-reuse.tsx" title="Repeated parameter requests: ProForm.params and request"></code>

`dateFormatter` formats a date field as a string. Submit to inspect the value.

<code src="../../demos/form/_base-test.tsx" title="dateFormatter: custom date format"></code>

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
<ProForm>
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
          label={`Agreement with "${form.getFieldValue('name') || '—'}"`}
        />
      );
    }}
  </Form.Item>
</ProForm>;


// Using custom components
<ProForm>
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
</ProForm>
```

## When to Use ProForm?

ProForm is the best choice when you want to implement a form quickly but don't want to spend too much time on layout.

ProForm is a degradable encapsulation based on antd Form, fully aligned with antd functionality, but adds some preset behaviors and multiple layouts on top of it. These layouts can be switched seamlessly and share a common API.

| Layout                                          | Usage Scenario                                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [ProForm](/components/form#proform)             | Standard Form, adds automatic `loading` in `onFinish` and automatic retrieval of default values ​​based on `request`. |
| [ModalForm\|DrawerForm](/components/modal-form) | Added `trigger` on the basis of ProForm, no need to maintain `open` status.                                           |
| [QueryFilter](/components/query-filter)         | Generally used as a filter form, needs to be used with other data display components.                                 |
| [LightFilter](/components/query-filter)         | Generally used as an inline built-in filter, such as card action bar and table action bar.                            |
| [StepsForm](/components/steps-form)             | Step form, needs to be used with StepForm configuration.                                                              |

## Data conversion

Many times there is no exact match between the data required by the component and the data required by the backend, and ProForm provides two APIs to solve this problem, `transform` and `convertValue`.

### convertValue Pre-conversion

convertValue occurs before the component obtains data, usually the data directly sent from the backend to the frontend, and sometimes needs to be refined.

```tsx | pure
   export type SearchConvertKeyFn =
    (value: any, field: NamePath)=>string | boolean | Record<string, any>;
  /**
   * @name Converts the value when getting it, generally used to format the data into the format received by the component
   * @param value field value
   * @param namePath field name
   * @returns the new value of the field
   *
   * @example a,b => [a,b]
   * convertValue:(value,namePath)=>value.split(",")
   * @example string =>json
   * convertValue:(value,namePath)=>JSON.parse(value)
   * @example number =>date
   * convertValue:(value,namePath)=>Moment(value)
   * @example YYYY-MM-DD => date
   * convertValue:(value,namePath)=>Moment(value,"YYYY-MM-DD")
   * @example  string => object
   * convertValue:(value,namePath)=>({value,label:value})
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
    namePath: string[],
    allValues: any,
  ) => string | Record<string, any>;

  /**
   * @name Convert value when submitting, generally used to convert value into submitted data
   * @param value field value
   * @param namePath field name
   * @param allValues ​​all fields
   * The new value of the @returns field, if an object is returned, it will be merged with all values ​​once
   *
   * @example {name:[a,b] => {name:a,b }
   * transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }
   * transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:moment} => {name:string
   * transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:moment}=> {name:timestamp}
   * transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string}
   * transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  }
   * transform: (value)=>{valueName:value.value,labelName:value.name}
   */
  transform?: SearchTransformKeyFn;
```

#### Two common return patterns for `transform` (recommended)

In practice, `transform` is usually used in two ways:

- **1) Return a primitive (most straightforward and stable)**: it replaces the submitted value of the current field.

```tsx | pure
<ProFormText name="name" transform={(value) => `${value}:suffix`} />
// Submit: { name: 'xxx:suffix' }
```

- **2) Return an object (rename/split/write back nested paths)**: we recommend building the object by the field `name`/`namePath` to avoid “looks correct but submit unchanged”.

```tsx | pure
import { set } from '@rc-component/util';

// Write back to the same nested path (recommended)
<ProFormText
  name={['company', 'name']}
  transform={(value) => set({}, ['company', 'name'], `${value}:suffix`)}
/>
// Submit: { company: { name: 'xxx:suffix' } }

// Rename key example: name -> displayName
<ProFormText
  name="name"
  transform={(value) => ({ displayName: value })}
/>
// Submit: { displayName: 'xxx' } (note: this changes the output shape)
```

> Note: `SearchTransformKeyFn` is typed as `(value, namePath: string[], allValues) => any`, but in some scenarios (nested paths / `ProFormList`) the runtime value may not always be the “full path array” you expected. That’s why using the component `name` to build the return object is often safer.

## Code examples

### Label and Form Item Layout

`ProForm.layout` supports `horizontal`, `vertical`, and `inline`. Switch between them to compare how the same fields are arranged.

<code src="../../demos/form/form-layout.tsx" title="layout: horizontal, vertical, inline"></code>

`labelCol` and `wrapperCol` can use breakpoints to size labels and inputs responsively.

<code src="../../demos/form/label-col.tsx" title="Responsive label width"></code>

### Grid layout

`grid` enables the grid layout, `rowProps.gutter` sets spacing, and each field's `colProps` controls its width at different breakpoints. Resize the page to see the fields switch from two columns to one.

<code src="../../demos/form/form-layout-grid.tsx" title="grid: responsive form columns"></code>

`ProFormDependency name={[["customer", "name"]]}` subscribes to a nested field. Editing the customer name updates the note field's label.

<code src="../../demos/form/dependency.tsx" title="Nested field dependency"></code>

`ProForm.Item` with `trigger="onValuesChange"` includes editable table rows in the submitted form values. Save the edited row before submitting the form.

<code src="../../demos/form/pro-form-editable-table.tsx" title="Editable table in ProForm"></code>

### Sync submission results to url

When opening, the url parameters are also set as default values, supports transform, but pay attention to field mapping.

### Money input

Each `ProFormMoney` example focuses on one property. Submit to inspect the stored form value.

<code src="../../demos/form/money.tsx" title="customSymbol: custom symbol"></code>

<code src="../../demos/form/money-no-symbol.tsx" title="moneySymbol: hide the symbol"></code>

<code src="../../demos/form/money-locale.tsx" title="locale: regional format"></code>

<code src="../../demos/form/money-precision.tsx" title="precision: whole numbers"></code>

<code src="../../demos/form/money-min.tsx" title="min: minimum amount"></code>

## Components that hijack render functions

FormItemRender is used specifically to handle code organization using render props, to better aggregate business code with requests, and also to better complete the function of custom form items.

Forms are essential in middle and backend projects, and are usually accompanied by some non-standard controls and complex form items. At this time, custom form items are needed, and completing a custom form item requires at least the implementation of value and onChange. And if the component is only used once and requires a lot of context parameters, then encapsulation is very ungrateful, so there is this component.

- Use useControlModel to quickly create a custom form item, while supporting single instance or multiple instances (suitable for encapsulating custom form components and using them in multiple places)
- Use withFormItemRender to generate a FormItemRender, which can organize code inline (suitable for scenarios where it is used only once or requires many context parameters)
- Use FormControlRender to convert a form component into a render props form, which is useful in certain situations (such as some design defects of certain third-party components, where the component in render cannot call the onChange method, wrapping it at this time can solve it)

> Of course, you don't necessarily have to use withFormItemRender. Form.Item can be nested, or Form.Item can be nested with noStyle set on the outer layer to organize your code. This will wrap more div elements. If it does not affect your style, you can also use it.

### Using useControlModel

The following examples each submit an amount and currency. Change them and submit to compare three ways of building a composite form field.

A controlled component receives `value` and calls `onChange` explicitly.

<code src="../../demos/form/antd.tsx" title="Custom control: value / onChange"></code>

`useControlModel` provides controlled props for both parts of the value.

<code src="../../demos/form/antd-modify.tsx" title="useControlModel: composite value"></code>

Nested `Form.Item noStyle` binds each control directly to a field under `price`.

<code src="../../demos/form/antd-nest.tsx" title="Form.Item noStyle: nested fields"></code>

### FormControlRender

Using FormControlRender allows you to write code inline and write logic more flexibly. It is suitable for some components wrapped with ProForm.Item or Form.Item.

Sometimes you need to use Form.Item.useStatus, but you must meet the usage specifications of hooks, which makes development require extraction into a separate component for use, and cannot be used inline, and FormControlRender solves this situation very well.

Submitting an empty value triggers validation. `FormControlRender` exposes `status` to the inline textarea, while `pickControlPropsWithId` passes its value, change handler, and input id.

<code src="../../demos/form/form-control-render.tsx" title="Show validation status in an inline control"></code>

### FormItemRender & ProFormItemRender

`ProFormItemRender` and `pickControlProps` pass form values and events to a custom input.

<code src="../../demos/form/form-item-render.tsx" title="Custom input with ProFormItemRender"></code>

`FormItemRender` and `pickControlPropsWithId` also pass the input's `id`.

<code src="../../demos/form/form-item-render-with-id.tsx" title="Pass the input id with FormItemRender"></code>

`useControlModel` connects one custom component to a form field.

<code src="../../demos/form/use-control-model.tsx" title="Single-value control model"></code>

Its multi-field configuration combines a checkbox and input into one form value.

<code src="../../demos/form/use-control-model-multiple.tsx" title="Multi-value control model"></code>

### Dynamic options with ProFormDependency

`name={['dbName']}` watches the database name and updates the migration options. Submit to inspect the selected values.

<code src="../../demos/form/linkage-customization.tsx" title="Options depending on another field"></code>

### Select `labelInValue`

How `labelInValue` changes option payload shape inside ProForm selects.

### Custom `request` loading state

While `request` is loading a centered `Spin` is rendered by default; use `loadingRender` to replace it with a `Skeleton` or any custom node.

### Select local search with `request`

When `request` fetches the full dataset once, set `fetchDataOnSearch={false}` so that searching filters locally instead of re-triggering the request.

| Property          | Description                                                                                   | Type      | Default |
| ----------------- | --------------------------------------------------------------------------------------------- | --------- | ------- |
| fetchDataOnSearch | Whether searching re-triggers `request`; set `false` to fetch once on init and filter locally | `boolean` | `true`  |

### ProProvider / ConfigProvider (debug)

## ProForm

ProForm is a repackaging of antd Form, if you want to customize form elements, ProForm is the same way as antd, you can still customize it with FormItem + custom components. Of course this does not affect other components, QueryFilter and other components as well.

> antd's Form api View [here](https://ant.design/components/form/), initialValues related knowledge view [here](https://procomponents.ant.design/docs/faq)

| Parameters                                      | Description                                                                                                                                                  | Type                                                                                                                                                                                                                          | Default         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| onFinish                                        | Callback event after form is submitted and data validation is successful, supports Promise, will automatically set button loading effect                     | `(formData: T) => Promise<boolean \| void> \| void`                                                                                                                                                                           | -               |
| onReset                                         | Callback for clicking the reset button                                                                                                                       | `(e) => void`                                                                                                                                                                                                                 | -               |
| submitter                                       | Submitter button-related configuration                                                                                                                       | `SubmitterProps<{form?: FormInstance<any>}> \| false`                                                                                                                                                                         | `true`          |
| loading                                         | Form button loading state                                                                                                                                    | `boolean`                                                                                                                                                                                                                     | -               |
| loadingRender                                   | Custom render while `request` is loading, defaults to a centered `Spin`. Pass `Skeleton` to align with antd 5.18+ loading style                              | `ReactNode \| (() => ReactNode)`                                                                                                                                                                                              | `<Spin />`      |
| onLoadingChange                                 | Callback when loading state changes                                                                                                                          | `(loading: boolean) => void`                                                                                                                                                                                                  | -               |
| formRef                                         | Get the form instance. `ProFormInstance` adds formatted-value helpers compared to antd Form                                                                  | `React.MutableRefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined> \| React.RefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined>` | -               |
| syncToUrl                                       | sync parameters to url, url only supports string, better read [documentation](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) before using | `boolean \| ((values: T, type: 'get' \| 'set') => T)`                                                                                                                                                                         | -               |
| syncToUrlAsImportant                            | When syncToUrl is true, when the page is displayed, the parameters on the url are mainly used, default is false                                              | `boolean`                                                                                                                                                                                                                     | `false`         |
| extraUrlParams                                  | Extra url parameters                                                                                                                                         | `Record<string, any>`                                                                                                                                                                                                         | -               |
| syncToInitialValues                             | Sync results to initialValues, default is true, if false, data obtained from url will be ignored when form.reset                                             | `boolean`                                                                                                                                                                                                                     | `true`          |
| omitNil                                         | ProForm automatically clears null and undefined data, if you have agreed that nil means something, set to false to disable this feature                      | `boolean`                                                                                                                                                                                                                     | `true`          |
| dateFormatter                                   | AutoFormat data, mainly moment/dayjs forms, supports string and number modes. you also can use formatter function to format date                             | `string \| 'string' \| 'number' \| ((value: dayjs.Dayjs, valueType: string) => string \| number) \| false`                                                                                                                    | `'string'`      |
| onInit                                          | Form initialization successful, such as layout, label calculation completed                                                                                  | `(values: T, form: ProFormInstance<any>) => void`                                                                                                                                                                             | -               |
| params                                          | Parameters for initiating network requests, used in conjunction with request                                                                                 | `U`                                                                                                                                                                                                                           | -               |
| request                                         | The parameters of the initiating network request, the return value will be overwritten to initialValues                                                      | `ProRequestData<T, U>`                                                                                                                                                                                                        | -               |
| isKeyPressSubmit                                | Whether to use carriage return to submit                                                                                                                     | `boolean`                                                                                                                                                                                                                     | -               |
| formKey                                         | Used to control whether the form key is the same, advanced usage                                                                                             | `string`                                                                                                                                                                                                                      | -               |
| autoFocusFirstInput                             | Auto focus the first input of the form (only valid for input-like fields)                                                                                    | `boolean`                                                                                                                                                                                                                     | `true`          |
| readonly                                        | Whether read-only mode, effective for all form items, priority lower than readonly of form items                                                             | `boolean`                                                                                                                                                                                                                     | -               |
| grid                                            | Enable grid mode, default width percentage, use `colProps` to control width [view example](/components/form#grid-layout)                                     | `boolean`                                                                                                                                                                                                                     | `false`         |
| rowProps                                        | Passed to `Row` when `grid` mode is enabled, only valid in `ProFormGroup`, `ProFormList`, `ProFormFieldSet`                                                  | [RowProps](https://ant.design/components/grid/#Row)                                                                                                                                                                           | `{ gutter: 8 }` |
| colProps                                        | Passed to `Col` when `grid` mode is enabled, only valid in `ProFormGroup`, `ProFormList`, `ProFormFieldSet`                                                  | [ColProps](https://ant.design/components/grid/#Col)                                                                                                                                                                           | `{ xs: 24 }`    |
| [(...)](https://ant.design/components/form-cn/) | Note that `LightFilter` and `QueryFilter` only support other antd `Form` component parameters except `wrapperCol` \| `labelCol` \| `layout`                  | -                                                                                                                                                                                                                             | -               |

### ProFormInstance

ProFormInstance adds some capabilities compared to antd's form.

```tsx | pure
  /**
   * Get all data formatted by ProForm
   * @param nameList boolean
   * @param omitNil boolean whether to ignore null and undefined
   * @returns T
   *
   * @example getFieldsFormatValue() -> returns all data
   * @example getFieldsFormatValue(true) -> returns all data, even if not hosted by form
   * @example getFieldsFormatValue(true, true) -> returns all data, ignoring null and undefined
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T;
  /**
   * Get a single data formatted by ProForm
   * @param nameList (string|number)[]
   * @returns T
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  /** Get the single data after formatting */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * Get the single data formatted by ProForm, including his name
   * @param nameList (string|number)[]
   * @returns T
   * @example
   * {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   * Return all data after formatting after field validation
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
```

### ProForm.Group

ProForm.Group supports group configs like `title`, `tooltip`, `extra`, see `ProFormBaseGroupProps` for the full type.

| Parameters | Description                   | Type              | Default |
| ---------- | ----------------------------- | ----------------- | ------- |
| title      | title                         | `ReactNode`       | -       |
| children   | form control or other element | `React.ReactNode` | -       |

#### submitter

While we would prefer not to modify the submitter, it is a common requirement to do so in use, and ProForm's components use the same API to support the requirement.

| Parameters        | Description                                                           | Type                                                        | Default |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| onSubmit          | Submit method                                                         | `(value?: T)=>void`                                         | -       |
| onReset           | Reset method                                                          | `(value?: T)=>void`                                         | -       |
| searchConfig      | The configuration of the search, generally used to configure the text | `{resetText,submitText}`                                    | -       |
| submitButtonProps | The props for the submit button                                       | `false \| ButtonProps`                                      | -       |
| resetButtonProps  | The props for the reset button                                        | `false \| ButtonProps`                                      | -       |
| render            | Rendering of custom actions                                           | `false\|((props,dom:JSX[])=>ReactNode[]\|ReactNode\|false)` | -       |

> The second argument to render is the default dom array, the first is the submit button and the second is the reset button.

```tsx | pure
<ProForm
  submitter={{
    // Configure the button text
    searchConfig: {
      resetText: 'Reset',
      submitText: 'Submit',
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

### formRef

`formRef` exposes the form instance. Each example demonstrates one method and shows its result.

<code src="../../demos/form/form-ref.tsx" title="setFieldsValue"></code>

<code src="../../demos/form/form-ref-get-field-value.tsx" title="getFieldValue"></code>

<code src="../../demos/form/form-ref-format-value.tsx" title="getFieldsFormatValue"></code>

<code src="../../demos/form/form-ref-validate-format-value.tsx" title="validateFieldsReturnFormatValue"></code>

`ProFormInstance` adds the following methods based on `FormInstance`:

|            Method Name            |                                                 Usage Description                                                 | Remarks |
| :-------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :-----: |
|      `getFieldsFormatValue`       |             Usage is the same as `FormInstance`'s `getFieldsValue` method, returns all formatted data             |         |
|       `getFieldFormatValue`       |          Usage is the same as `FormInstance`'s `getFieldValue` method, returns formatted specified data           |         |
|    `getFieldFormatValueObject`    |   Usage is the same as `FormInstance`'s `getFieldValue`, returns formatted specified data (including name path)   |         |
| `validateFieldsReturnFormatValue` | Usage is the same as `FormInstance`'s `validateFields` method, returns all formatted data after validation passes |         |
