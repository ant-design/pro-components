---
title: ProFormDependency
order: 1
atomId: ProFormDependency
nav:
  title: component
---

# ProFormDependency - Data Linkage

Data linkage in Form is very common, so we encapsulate a component for data processing.

## ProFormDependency

ProFormDependency is a simplified version of Form.Item. It has noStyle and shouldUpdate built in by default. We only need to configure the name to determine which data we rely on. ProFormDependency will automatically process the diff and extract the corresponding value from the form.

The name parameter must be an array. If it is a nested structure, it can be configured like `name={['name', ['name2', 'text']]}`. The value of the configured name will be passed in renderProps . `name={['name', ['name2', 'text']]}` The value of the passed in values ​​is `{ name: string,name2: { text:string } }`.

```tsx | pure
<ProFormDependency name={['name']}>
  {({ name }) => {
    return (
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: 'It will take effect after stamping',
          },
        ]}
        width="md"
        name="useMode"
        label={`The contract with "${name}" agreed on the effective method`}
      />
    );
  }}
</ProFormDependency>
```

## code example

### Interdependent Forms

<code src="./demos/dependency.tsx" oldtitle="ProForm.List"></code>

### Get form dependency values

The following examples demonstrate the order in which dependencies are evaluated in different situations:

- `<ProFormDependency>`\*\* is not in\*\*`<ProFormList>`: according to the dependency declared by `name`, the value is taken from the global (case 1)
- `<ProFormDependency>`\*\* in \*\*`<ProFormList>`
  - `ignoreFormListField` of `<ProFormDependency>` is `true`: according to the dependency declared by `name`, the value is taken from the global (case 2)
  - `ignoreFormListField` of `<ProFormDependency>` is `false`: according to the dependency declared by `name`, the value is taken locally (case 3)

<code src="./demos/dependency2.tsx" oldtitle="ProForm.List"></code>
