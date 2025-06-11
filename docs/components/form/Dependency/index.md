---
title: ProFormDependency - 数据联动
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

### 互相依赖表单

<code src="./demos/dependency.tsx" title="互相依赖表单" ></code>

### 获取表单依赖值

下面例子演示了不同情形下的依赖取值顺序：

- `<ProFormDependency>`**不在**`<ProFormList>`中：根据`name`声明的依赖项，从全局取值（情形 1）
- `<ProFormDependency>`**在**`<ProFormList>`中
  - `<ProFormDependency>`的`ignoreFormListField`为`true`：根据`name`声明的依赖项，从全局取值（情形 2）
  - `<ProFormDependency>`的`ignoreFormListField`为`false`：根据`name`声明的依赖项，从局部取值（情形 3）

<code src="./demos/dependency2.tsx" title="获取表单依赖值"></code>
