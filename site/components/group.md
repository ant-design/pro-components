---
group: Form
title: ProFormList 数据结构化
atomId: ProFormList
order: 1
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
    creatorButtonText: '再建一行',
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

| 参数                | 说明                                                                     | 类型                                                                                                                             | 默认值                           |
| ------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| itemRender          | 自定义 Item，可以用来将 action 放到别的地方                              | `(doms,listMeta)=> ReactNode`                                                                                                    | -                                |
| itemContainerRender | 自定义 Item 容器，例如将每个 item 包在卡片中                             | `(doms,listMeta)=> ReactNode`                                                                                                    | -                                |
| creatorRecord       | 新建一行的默认值                                                         | `Record<string, any> \| () => Record<string, any>`                                                                               | -                                |
| creatorButtonProps  | 新建一行按钮的配置，设为 `false` 可隐藏按钮                              | `false \| (ButtonProps & { creatorButtonText?: ReactNode, position?: "top"\|"bottom" })`                                         | `{creatorButtonText:"新建一行"}` |
| label               | 与 From.Item 相同                                                        | `ReactNode`                                                                                                                      | -                                |
| tooltip             | 标题旁边的提示信息                                                       | `LabelTooltipType`                                                                                                               | -                                |
| name                | list 在 form 中的值，必填项                                              | `NamePath`                                                                                                                       | -                                |
| alwaysShowItemLabel | Item 中总是展示 label                                                    | `boolean`                                                                                                                        | -                                |
| actionRef           | 当前 List 的自带操作，可以增删改查列表项                                 | `MutableRefObject<{add,remove,move,get,getList} \| undefined>`                                                                   | -                                |
| actionGuard         | FormItem 的拦截器，包含删除和添加的拦截，可以用 actionRef 拿到当前行的值 | `{beforeAddRow:(defaultValue,index,count)=>boolean\|Promise<boolean>, beforeRemoveRow:(index,count)=>boolean\|Promise<boolean>}` | -                                |
| min                 | 最少条目，删除时如果当前数据条目少于该数则无法删除                       | `number`                                                                                                                         | -                                |
| max                 | 最多条目，新增或复制时如果当前数据条目多于该数则无法新增或复制           | `number`                                                                                                                         | -                                |
| copyIconProps       | 复制按钮的配置，false 可以取消                                           | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false`                                                                       | -                                |
| deleteIconProps     | 删除按钮的配置，false 可以取消                                           | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false`                                                                       | -                                |
| actionRender        | 自定义操作按钮                                                           | `(field,action,defaultActionDom,count)=>React.ReactNode[]`                                                                       | -                                |
| fieldExtraRender    | 在最后增加一个 dom，可用于自定义新增按钮                                 | `(fieldAction,meta)=> ReactNode`                                                                                                 | -                                |
| onAfterAdd          | 新增数据后的钩子                                                         | `(defaultValue: StoreValue, insertIndex: number, count: number) => void`                                                         | -                                |
| onAfterRemove       | 删除数据后的钩子                                                         | `(index: number, count: number) => void`                                                                                         | -                                |
| arrowSort           | 是否开启箭头按钮排序                                                     | `boolean`                                                                                                                        | -                                |
| upIconProps         | 向上排序按钮的配置，false 可以取消                                       | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false`                                                                       | -                                |
| downIconProps       | 向下排序按钮的配置，false 可以取消                                       | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false`                                                                       | -                                |
| transform           | 提交时转化值，一般用于将值转化为提交的数据                               | `(value, namePath, allValues) => any`                                                                                            | -                                |
| isValidateList      | 是否同时校验列表是否为空                                                 | `boolean`                                                                                                                        | `false`                          |
| emptyListMessage    | 当 isValidateList 为 true 时执行为空提示                                 | `string`                                                                                                                         | `列表不能为空`                   |
| readonly            | 是否只读模式                                                             | `boolean`                                                                                                                        | -                                |
| required            | 是否必填（配合 rules 展示校验信息）                                      | `boolean`                                                                                                                        | -                                |

### actionRef 操作项目实例

```tsx | pure
const actionRef = useRef<
  FormListActionType<{
    name: string;
  }>
>();

return (
  /**
   * @name 获取到 list 操作实例
   * @description 可用删除，新增，移动等操作
   *
   * @example  actionRef?.current.add?.({},1);
   * @example  actionRef?.current.remove?.(1);
   * @example  actionRef?.current.move?.(1,2);
   * @example  actionRef?.current.get?.(1);
   */
  <>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          const list = actionRef.current?.getList();
          actionRef.current?.add({
            name: '新增' + list?.length,
          });
        }}
      >
        增加一行
      </Button>
      <Button
        danger
        onClick={() => {
          actionRef.current?.remove(1);
        }}
      >
        删除一行
      </Button>
      <Button
        onClick={() => {
          actionRef.current?.move(1, 0);
        }}
      >
        移动到第一行
      </Button>
      <Button
        type="dashed"
        onClick={() => {
          const row = actionRef.current?.get(1);
          console.log(row);
        }}
      >
        获取一行数据
      </Button>
      <Button
        type="dashed"
        onClick={() => {
          const row = actionRef.current?.getList();
          console.log(row);
        }}
      >
        获取所有数据
      </Button>
    </Space>
    <ProFormList actionGuard={actionGuard} actionRef={actionRef}>
      <ProFormText key="useMode" name="name" label="姓名" />
    </ProFormList>
  </>
);
```

### actionGuard 拦截器

actionGuard 可以拦截 list 的操作，现在有 `beforeAddRow` 和 `beforeRemoveRow` 两个事件。

```tsx | pure
const actionRef = useRef<
  FormListActionType<{
    name: string;
  }>
>();
const actionGuard = {
  beforeAddRow: async (defaultValue, insertIndex, count) => {
    return new Promise((resolve) => {
      console.log(defaultValue?.name, insertIndex, count);
      setTimeout(() => resolve(true), 1000);
    });
  },
  beforeRemoveRow: async (index, count) => {
    const row = actionRef.current?.get(index as number);
    console.log('--->', index, count, row);
    return new Promise((resolve) => {
      if (index === 0) {
        resolve(false);
        return;
      }
      setTimeout(() => resolve(true), 1000);
    });
  },
};
return (
  <ProFormList actionGuard={actionGuard} actionRef={actionRef}>
    <ProFormText key="useMode" name="name" label="姓名" />
  </ProFormList>
);
```

### actionRender 自定义操作按钮

```tsx | pure
  /**
   * @name 自定义操作按钮
   *
   * @example 删除按钮
   * actionRender:(field,action)=><a onClick={()=>action.remove(field.name)}>删除</a>
   * @example 最多只能新增三行
   * actionRender:(f,action,_,count)=><a onClick={()=>
   *   count>2?alert("最多三行！"):action.add({id:"xx"})}>删除
   * </a>
   */
  actionRender?: (
    field: FormListFieldData,
    /**
     * 操作能力
     * @example  action.add(data) 新增一行
     * @example  action.remove(index) 删除一行
     * @example  action.move(formIndex,targetIndex) 移动一行
     */
    action: FormListOperation,
    /**
     * 默认的操作dom
     * [复制，删除]
     */
    defaultActionDom: ReactNode[],
    /**
     * 当前共有几个列表项
     */
    count: number,
  ) => ReactNode[];


```

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
    // 总行数
    count,
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

这四个参数的类型定义如下：

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
  /**
   * @name 总行数
   */
  count: number;
};
```

## ProFormFieldSet

ProFormFieldSet 可以将内部的多个 children 的值组合并且存储在 ProForm 中，并且可以通过 `transform` 在提交时转化。下面是一个简单的用法，可以方便的组合多个输入框，并且格式化为想要的数据。

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

### 自定义删除和复制的 tooltip

<code src="../../demos/form/group/list-tooltip.tsx" title="操作图标与提示：copyIconProps / deleteIconProps" ></code>

### 设置当前列表项

每行的 `action.setCurrentRowData` 只更新当前列表项。点击两行的填入按钮，再提交查看数组值。

<code src="../../demos/form/group/base-use.tsx" title="setCurrentRowData：设置当前行"></code>

### 可调整的新建按钮位置

选择顶部或底部，观察 `ProFormList` 的 `creatorButtonProps.position` 如何移动新建按钮。添加成员后提交可查看列表值。

<code src="../../demos/form/group/list.tsx" title="creatorButtonProps.position：新建按钮位置"></code>

### 表单互相嵌套

<code src="../../demos/form/group/nested-list.tsx" title="嵌套列表：ProFormList" ></code>

`ProForm.Item` 使用 `name={[field.name, 'rows']}` 和 `trigger="onValuesChange"`，将每个分组的可编辑表格写入对应数组字段。

<code src="../../demos/form/form-list-editable-table.tsx" title="列表分组中的可编辑表格"></code>

### 列表内依赖选项

`ProFormSelect.dependencies={['name']}` 让 `request` 读取当前列表项的姓名。修改姓名后打开“称呼”查看新选项，再提交。

<code src="../../demos/form/group/dependency.tsx" title="dependencies：刷新当前项的选项"></code>

### 行为守卫

`actionGuard` 可在新增或删除列表项前决定是否允许操作。

<code src="../../demos/form/group/pro-form-list.tsx"></code>

### 列表操作引用

`actionRef` 提供 `add`、`remove`、`move`、`get` 和 `getList` 方法；以下每例只展示一种操作。

<code src="../../demos/form/group/list-action-add.tsx" title="actionRef.add"></code>
<code src="../../demos/form/group/list-action-remove.tsx" title="actionRef.remove"></code>
<code src="../../demos/form/group/list-action-move.tsx" title="actionRef.move"></code>
<code src="../../demos/form/group/list-action-get.tsx" title="actionRef.get"></code>
<code src="../../demos/form/group/list-action-get-list.tsx" title="actionRef.getList"></code>

`creatorRecord` 预填新建行的数据。

<code src="../../demos/form/group/list-creator-record.tsx" title="creatorRecord"></code>

`itemRender` 自定义每一行的外层卡片。

<code src="../../demos/form/group/list-item-render.tsx" title="itemRender"></code>

### 增删条目限制

`min={1}` 阻止删除最后一项，`max={3}` 限制最多三项。尝试增删后提交，可查看列表值。

<code src="../../demos/form/group/count-limit.tsx" id="countLimit-1" title="ProFormList：最少与最多条目"></code>

### 横向布局

`ProForm layout="horizontal"` 让列表内的“规格名”和“规格值”以横向标签布局显示。新增一项后提交，可查看数组值。

<code src="../../demos/form/group/horizontal-layout.tsx" id="horizontal-layout-1" title="ProFormList：横向标签布局"></code>

### 箭头排序

<code src="../../demos/form/group/list-arrow-sort.tsx" title="箭头排序：arrowSort"></code>
