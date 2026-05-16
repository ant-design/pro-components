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

### Interdependent fields

<code src="../../demos/form/dependency-demos/dependency.tsx" title="ProFormDependency"></code>

### Inside ProFormList

The examples below clarify evaluation order inside or outside lists:

- `<ProFormDependency>` **not** nested in `<ProFormList>`: values come from global form paths (scenario 1)
- Nested under `<ProFormList>`
  - `ignoreFormListField={true}`: still read globals (scenario 2)
  - `ignoreFormListField={false}`: scoped to row context (scenario 3)

<code src="../../demos/form/dependency-demos/dependency-2.tsx" title="Scoped dependencies"></code>
