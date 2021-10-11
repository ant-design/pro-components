---
title: ProFormList - 数据结构化
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# 数据结构化

我们还提供了用来进行结构化数据的录入:

- ProFormList 录入结构化的多维数组数据。
- ProFormFieldSet 录入结构化的一维数组数据。
- ProFormDependency 数据依赖的相关组件

## ProFormList

ProFormList 与 [Form.List](https://ant.design/components/form-cn/#Form.List) API 基本相同，增加了自带的操作按钮：删除和复制，并且自带了了一个`新建一行`按钮。

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
    creatorButtonText: '在建一行',
  }}
  creatorRecord={{
    useMode: 'none',
  }}
>
  <ProFormSelect
    options={[
      {
        value: 'chapter',
        label: '盖章后生效',
      },
      {
        value: 'none',
        label: '不生效',
      },
    ]}
    width="md"
    name="useMode"
    label="合同约定生效方式"
  />
</ProFormList>
```

### ProFormList API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemRender | 自定义 Item，可以用来将 action 放到别的地方 | `doms,listMeta)=> ReactNode` | - |
| creatorRecord | 新建一行的默认值 | `Record<string, any> \| () => Record<string, any>` | - |
| creatorButtonProps | 新建一行按钮的配置 | `buttonProps & { creatorButtonText:string,position:"top"\|"bottom" }` | `{creatorButtonText:"新建一行"}` |
| label | 与 From.Item 相同 | `ReactNode` | - |
| name | list 在 form 中的值，必填项 | `NamePath` | - |

## ProFormFieldSet

ProFormFieldSet 可以将内部的多个 children 的值组合并且存储在 ProForm 中，并且可以通过 `transform` 在提交时转化。下面是一个简单的用法,可以方便的组合多个输入框，并且格式化为想要的数据。

```tsx | pure
<ProFormFieldSet
  name="list"
  label="组件列表"
  // 支持 两种方式，type="group" 会用input.group 包裹
  // 如果不配置 默认使用 space
  type="group"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet>
```

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

### 基本使用

<code src="./demos/base-use" heigh="174px" title="ProForm.List" />

### 自定义 List

<code src="./demos/customize.tsx" heigh="174px" title="ProForm.List" />

### 基本使用

<code src="./demos/list.tsx" heigh="174px" title="ProForm.List" />

### 互相依赖表单

<code src="./demos/dependency.tsx" heigh="174px" title="ProForm.List" />

### 获取表单依赖值

下面例子演示了不同情形下的依赖取值顺序：

- `<ProFormDependency>`**不在**`<ProFormList>`中：根据`name`声明的依赖项，从全局取值（情形 1）
- `<ProFormDependency>`**在**`<ProFormList>`中
  - `<ProFormDependency>`的`ignoreFormListField`为`true`：根据`name`声明的依赖项，从全局取值（情形 2）
  - `<ProFormDependency>`的`ignoreFormListField`为`false`：根据`name`声明的依赖项，从局部取值（情形 3）

<code src="./demos/dependency2.tsx" heigh="1774px" title="ProForm.List" />

### 表单互相嵌套

<code src="./demos/nested-list.tsx" heigh="1774px" title="ProForm.List" />
