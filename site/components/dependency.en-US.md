---
title: ProFormDependency
order: 1
atomId: ProFormDependency
group: Form
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

## Examples

### Basic field dependency

`name={['channel']}` subscribes to the contact method. Switching between email and phone updates the label of the next field.

<code src="../../demos/form/dependency-demos/dependency.tsx" title="ProFormDependency: update a field label"></code>

### Dependency scopes

Outside `ProFormList`, `name` reads a global form field.

<code src="../../demos/form/dependency-demos/dependency-2.tsx" title="Global field"></code>

Inside `ProFormList`, `ignoreFormListField` keeps the lookup at the global scope.

<code src="../../demos/form/dependency-demos/dependency-list-global.tsx" title="Global field inside a list"></code>

Inside `ProFormList`, omit `ignoreFormListField` to read from the current row.

<code src="../../demos/form/dependency-demos/dependency-list-local.tsx" title="Current list row"></code>
