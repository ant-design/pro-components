---
group: Form
title: ProFormDependency 数据联动
order: 1
atomId: ProFormDependency
---

# 数据联动

Form 中的数据联动非常常见，所以我们封装了一个组件来进行数据处理。

## ProFormDependency

ProFormDependency 是一个简化版本的 Form.Item，它默认内置了 noStyle 与 shouldUpdate，我们只需要配置 name 来确定我们依赖哪个数据，ProFormDependency 会自动处理 diff 和并且从表单中提取相应的值。

name 参数必须要是一个数组，如果是嵌套的结构可以这样配置 `name={['name', ['name2', 'text']]}`。配置的 name 的值会在 renderProps 中传入。`name={['name', ['name2', 'text']]}` 传入的 values 的值 为 `{ name: string,name2: { text:string } }`。

```tsx | pure
<ProFormDependency name={['name']}>
  {({ name }) => {
    return (
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: '盖章后生效',
          },
        ]}
        width="md"
        name="useMode"
        label={`与《${name}》合同约定生效方式`}
      />
    );
  }}
</ProFormDependency>
```

## 代码示例

### 基础字段联动

`name={['channel']}` 订阅联系方式字段；切换邮箱和手机时，下方输入项的标签随之更新。

<code src="../../demos/form/dependency-demos/dependency.tsx" title="ProFormDependency：根据字段值更新标签"></code>

### 获取表单依赖值

在列表外，`name` 读取表单的全局字段。

<code src="../../demos/form/dependency-demos/dependency-2.tsx" title="全局依赖"></code>

在 `ProFormList` 内设置 `ignoreFormListField`，仍从全局字段取值。

<code src="../../demos/form/dependency-demos/dependency-list-global.tsx" title="列表内读取全局字段"></code>

在 `ProFormList` 内省略 `ignoreFormListField`，从当前列表项取值。

<code src="../../demos/form/dependency-demos/dependency-list-local.tsx" title="列表内读取当前项"></code>
