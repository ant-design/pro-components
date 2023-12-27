---
title: EditableProTable - 可编辑表格
atomId: EditableProTable
---

# EditableProTable - 可编辑表格

可编辑表格 EditableProTable 与 ProTable 的功能基本相同，为了方便使用 EditableProTable 增加了一些预设，关掉了查询表单和操作栏，同时修改了 value 和 onChange 使其可以方便的继承到 antd 的 Form 中。

## 代码演示

### 可编辑表格

<code src="./demos/basic.tsx"  background="var(--main-bg-color)" title="可编辑表格"></code>

### 与 FormItem 配合

<code src="./demos/form-item.tsx"  background="var(--main-bg-color)" title="与 FormItem 配合"></code>

### 与编辑表格外的内容联动

<code src="./demos/form-linkage.tsx"  background="var(--main-bg-color)" title="与编辑表格外的内容联动"></code>

### 有子列的表格增加

<code src="./demos/children.tsx"  background="var(--main-bg-color)" title="有子列的表格增加"></code>

### 自定义可编辑表格

<code src="./demos/custom.tsx"  background="var(--main-bg-color)" title="自定义可编辑表格"></code>

### 实时保存的编辑表格

<code src="./demos/real-time-editing.tsx"  background="var(--main-bg-color)" title="实时保存的编辑表格"></code>

## API

| 属性                   | 描述                                                      | 类型                                                                                                 | 默认值         |
| -------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- |
| `value`              | 同 dataSource，传入一个数组，是 table 渲染的元数据                      | `T[]`                                                                                              | `undefined` |
| `onChange`           | dataSource 修改时触发，删除和修改都会触发，如果设置了 value，Table 会成为一个受控组件。 | `(value:T[])=>void`                                                                                | `undefined` |
| `recordCreatorProps` | 新建一行数据的相关配置                                             | [RecordCreatorProps](#recordcreator) & [ButtonProps](https://ant.design/components/button-cn/#API) | -           |
| `maxLength`          | 最大的行数，到达最大行数新建按钮会自动消失                                   | number                                                                                             | -           |
| `editable`           | 可编辑表格的相关配置                                              | [TableRowEditable](#editable-编辑行配置)                                                                | -           |
| `controlled`         | 是否受控，如果受控每次编辑都会触发 onChange，并且会修改 dataSource             | `boolean`                                                                                          | false       |
| `editableFormRef`    | table 所有的 form，带了一些表格特有的操作                              | `React.Ref<EditableFormInstance<T>>`                                                               | `undefined` |

> 别的 API 与 ProTable 相同。

### Editable 新建行

新增一行的时候要保证 `recordCreatorProps.record` key 唯一，不然会导致编辑出错。

```tsx | pure
<EditableTable
  rowKey="id"
  recordCreatorProps={{
    position: position as 'top',
    // 每次新增的时候需要Key
    record: () => ({ id: getNewId() }),
  }}
/>
```

### EditableFormInstance 表格列表单操作

相比于 ProForm 的表单，可编辑表格增加了以下的三个方法。

```tsx | pure
  /**
   * 获取一行数据的
   * @param rowIndex
   * @returns T | undefined
   *
   * @example getRowData(1)  可以传入第几行的数据
   * @example getRowData("id")  也可以传入 rowKey，根据你列的唯一key 来获得。
   */
  getRowData?: (rowIndex: string | number) => T | undefined;
  /**
   * 获取整个 table 的数据
   * @returns T[] | undefined
   */
  getRowsData?: () => T[] | undefined;
  /**
   * 设置一行的数据，会将数据进行简单的 merge
   *
   * {title:"old", decs:"old",id:"old"} -> set {title:"new"} -> {title:"new", decs:"old",id:"old"}
   *
   * @description 只会做最第一层对象的 merge 哦。
   * {title:"old", decs:{name:"old",key:"old"},id:"old"} -> set {decs:{name:"new"}} -> {title:"old", decs:{name:"new"},id:"old"} -> set {decs:{name:"old"}}
   *
   * @param rowIndex
   * @param data
   * @returns void
   *
   * 根据行号设置
   * @example setRowData(1, { title:"new" })  可以传入修改第几行
   *
   * 根据行 id 设置
   * @example setRowData("id", { title:"new" })  也可以传入 rowKey，根据你列的唯一 key 来设置。
   *
   * 清空原有数据
   * @example setRowData(1, { title:undefined })
   *
   */
  setRowData?: (rowIndex: string | number, data: Partial<T>) => void;
```

### editable 编辑行配置

| 属性                            | 描述                                                                   | 类型                                                                      | 默认值        |
| ----------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------- |
| type                          | 可编辑表格的类型，单行编辑或者多行编辑                                                  | `single` \| `multiple`                                                  | -          |
| form                          | 可编辑表格的 form 实例，使用 `Form.useForm` 生成后使用                               | `FormInstance`                                                          | -          |
| formProps                     | 可以配置 form 的属性，但是不支持 onFinish                                         | [`FormProps`](https://procomponents.ant.design/components/form#proform) | -          |
| editableKeys                  | 正在编辑的行，受控属性。 默认 `key` 会使用 `rowKey` 的配置，如果没有配置会使用 `index`，建议使用 rowKey | `Key[]`                                                                 | -          |
| onChange                      | 行数据被修改的时候触发                                                          | `(editableKeys: Key[], editableRows: T[]) => void`                      | -          |
| onSave                        | 保存一行的时候触发                                                            | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>` | -          |
| saveText                      | 保存一行的文字                                                              | `React.ReactNode`                                                       | `保存`       |
| onDelete                      | 删除一行的时候触发                                                            | `(key: Key, row: T) => Promise<any>`                                    | -          |
| deleteText                    | 删除一行的文字                                                              | `React.ReactNode`                                                       | `删除`       |
| onCancel                      | 取消编辑一行时触发                                                            | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>` | -          |
| cancelText                    | 取消编辑一行的文字                                                            | `React.ReactNode`                                                       | `取消`       |
| actionRender                  | 自定义编辑模式的操作栏                                                          | `(row: T, config: ActionRenderConfig<T>) => ReactNode[]`                | -          |
| deletePopconfirmMessage       | 删除时弹出的确认框提示消息                                                        | `ReactNode`                                                             | `删除此项？`    |
| onlyOneLineEditorAlertMessage | 只能编辑一行的的提示                                                           | `ReactNode`                                                             | `只能同时编辑一行` |
| onlyAddOneLineAlertMessage    | 只能同时新增一行的提示                                                          | `ReactNode`                                                             | `只能新增一行`   |

### recordCreatorProps 新建按钮配置

为了使用，我们预设了一个新建的功能，大多数情况下已经可以满足大部分新建的需求，但是很多时候需求总是千奇百怪。我们也准备了 `recordCreatorProps` 来控制生成按钮。与 Pro 系列组件的 API 相同，`recordCreatorProps={false}`就可以关掉按钮，同时使用 `actionRef.current?.addEditRecord(row)`  来控制新建行。

`recordCreatorProps` 也支持自定义一些样式，`position='top'|'bottom'` 可以配置增加在表格头还是表格尾部。`record` 可以配置新增行的默认数据。以下是一个列举

```typescript
recordCreatorProps = {
  // 要增加到哪个节点下，一般用于多重嵌套表格
  parentKey: React.key,
  // 顶部添加还是末尾添加
  position: 'bottom',
  // 新增一行的方式，默认是缓存，取消后就会消失
  // 如果设置为 dataSource 会触发 onchange，取消后也不会消失，只能删除
  newRecordType: 'dataSource',
  // 不写 key ，会使用 index 当行 id
  record: {},
  // 设置按钮文案
  creatorButtonText: '新增一行',
  // 按钮的样式设置，可以设置按钮是否显示
  // 这样可以做最大行限制和最小行限制之类的功能
  style: {
    display: 'none',
  },
  // https://ant.design/components/button-cn/#API
  ...antButtonProps,
};
```

### renderFormItem 自定义编辑组件

虽然我们很希望默认的 valueType 可以满足所有的需求，但是现实往往不尽如人意。所以我们也提供了 `renderFormItem` 来自定义编辑输入组件。

`renderFormItem` 可以理解为在 Form.Item 下面加入一个元素， 伪代码实现是下面这样的：

```typescript
const dom = renderFormItem();

<Form.Item>{dom}</Form.Item>;
```

所以与 Form.Item 相同，我们认为 `renderFormItem` 返回的组件都是拥有的 `value` 和 `onChange` 的，我们接下来将看到用 `renderFormItem` 将一个简单的 TagList 组件放入可编辑表格中。

> 没有 `value` 将会无法注入值，没有 `onChange` 会无法修改行数据

首先我们定义一个 TagList 组件。

```typescript
const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (
      inputValue &&
      tempsTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};
```

在列中我们可以这样配置它。

```typescript
 {
    title: '标签',
    dataIndex: 'labels',
    width: '40%',
    renderFormItem: () => <TagList />,
    render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
```

转化成的编辑表格效果如下 ：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/473a8336e31647ac8ab5041dde6ac4ec~tplv-k3u1fbpfcp-zoom-1.image)

value 和 onChange 会自动注入，我们不需要显式的注入。数据绑定也是由编辑表格自己注入的，我们在 `onSave` 中可以拿到处理完成的数据。虽然我们可以行内的写很复杂的逻辑甚至网路请求，但是我们推荐使用拆分组件，这样不仅性能更好，逻辑也可以拆分的很简单。

> `renderFormItem` 同时也用来生成查询表单，如果我们需要区分这两种情况，可以使用 `renderFormItem: (_, { isEditable }) => (isEditable ? <TagList /> : <Input /> )` 这样的方式来进行分别渲染。

### actionRender 自定义操作栏

可编辑表格默认提供了三大金刚， 保存，删除 和 取消，如果我们要实现复制一行，或者需求只需要的 保存和取消，不需要删除按钮就需要自定义了。可编辑表格提供了 API 来进行自定义，以下会直接展示代码:

#### 复制一行到底部

```typescript
render: (text, record, _, action) => [
  <a
    key="editable"
    onClick={() => {
      action?.startEditable?.(record.id);
    }}
  >
    编辑
  </a>,
  <EditableProTable.RecordCreator
    record={{
      ...record,
      id: (Math.random() * 1000000).toFixed(0),
    }}
  >
    <a>复制此项到末尾</a>
  </EditableProTable.RecordCreator>,
];
```

#### 自定义操作栏

```typescript
const editable = {
  // defaultDom = {save,cancel,delete} 可以酌情添加和使用
  actionRender: (row, config, defaultDom) => [
    defaultDom.save,
    defaultDom.cancel,
  ],
};
```
