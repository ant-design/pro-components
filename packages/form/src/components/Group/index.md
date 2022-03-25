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
    key="useMode"
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
| alwaysShowItemLabel | Item 中总是展示 label | `boolean` | - |
| min | 最少条目，删除时如果当前数据条目少于该数则无法删除 | `number` | - |
| max | 最多条目，新增或复制时如果当前数据条目多于该数则无法新增或复制 | `number` | - |

### ProFormList RenderProps 模式

ProFormList 支持传入一个方法来获取到当前行的信息和快捷操作，这对于复杂的联动来说是很方便的。

```tsx | pure
<ProFormList>
  {(
    // 当前行的基本信息 {name: number; key: number}
    meta,
    // 当前的行号
    index,
    /**
     * action
     * @name 用于操作行的一些快捷方法
     * @example 给第二行增加数据 action.add?.({},1);
     * @example 删除第二行 action.remove?.(1);
     * @example 从 1 移到 2: action.move?.(2,1);
     * @example 获取当前行的数据: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
     * @example 设置当前行的数据: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx'}
     * @example 清空当前行的数据：{id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
     */
    action,
  ) => {
    return (
      <div key="row">
        <ProFormText name="id" />
        <ProFormText name="name" />
      </div>
    );
  }}
</ProFormList>
```

这三个参数的类型定义如下：

```tsx | pure
type RenderActionParams = {
  /**
   * @name 当前行的meta信息
   * @example {name: number; key: number}
   */
  meta: FormListFieldData;
  /**
   * @name 当前行的行号
   */
  index: number;
  /**
   * @name 用于操作行的一些快捷方法
   * @example 给第二行增加数据 action.add?.({},1);
   * @example 删除第二行 action.remove?.(1);
   * @example 从 1 移到 2: action.move?.(2,1);
   * @example 获取当前行的数据: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
   * @example 设置当前行的数据: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx'}
   * @example 清空当前行的数据：{id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
   */
  action: FormListOperation & {
    /**
     * @name 获取当前行的数据
     * @example getCurrentRowData -> {id:"xxx",name:'123',age:18}
     */
    getCurrentRowData: () => any;
    /**
     * @name 设置当前行的数据
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:'xxx'}) -> {id:"123",name:'123'}
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:undefined}) -> {id:"123"}
     */
    setCurrentRowData: (data: any) => void;
  };
};
```

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

### 联动的 FormList

<code src="./demos/base-use" heigh="174px" title="ProForm.List" />

### 可调整的新建按钮位置

<code src="./demos/list.tsx" heigh="174px" title="ProForm.List-position" />

### 表单互相嵌套

<code src="./demos/nested-list.tsx" heigh="174px" title="ProForm.List-ProFormList" />

### 复杂联动

<code src="./demos/dependency.tsx" heigh="174px" title="ProForm.List-dependency" />

### 行为守卫

<code src="./demos/pro-form-list.tsx" heigh="1774px" title="行为守卫"/>

### 增删条目限制

<code src="./demos/countLimit.tsx" heigh="1774px" title="增删条目限制"/>
