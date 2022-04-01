---
title: Structured data
order: 1
group:
  path: /
nav:
  title: Components
  path: /components
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

In addition to display type form items, we also provide form items for combining data:

## ProFormList

ProFormList is basically the same as the [Form.List](https://ant.design/components/form/#Form.List) API. It adds its own operation buttons: delete and copy, and it also includes a `new row` button.

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
    creatorButtonText: 'Building a line',
  }}
  creatorRecord={{
    useMode: 'none',
  }}
>
  <ProFormSelect
    key="useMode"
    options={[
      {
        value: 'chapter',
        label: 'Valid after stamping',
      },
      {
        value: 'none',
        label: 'Not effective',
      },
    ]}
    width="md"
    name="useMode"
    label="Contract agreement effective method"
  />
</ProFormList>
```

### ProFormList API

| Parameters | Description | Type | Default Value |
| --- | --- | --- | --- |
| creatorRecord | Default value of a new line | `Record<string, any>` | - |
| creatorButtonProps | Configuration of a new line of buttons | `buttonProps & {creatorButtonText:string,position:"top"\|"bottom" }` | `{creatorButtonText:"Create a new line"}` |
| label | Same as From.Item | `ReactNode` | - |
| name | The value of list in the form, required | `NamePath` | - |
| alwaysShowItemLabel | always show label in Item | `boolean` | - |

## ProFormFieldSet

ProFormFieldSet can combine the values of multiple children inside and store them in ProForm, and can be transformed at commit time via `transform`. Here is a simple usage to easily combine multiple input fields and format them to the desired data.

```tsx | pure
<ProFormFieldSet
  name="list"
  label="List of components"
  // Two methods are supported, type="group" will be wrapped with input.group
  // If not configured, use space by default
  type="group"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet
```
