---
title: 🥳 可能是最好的可编辑表格发布啦
order: 5
group:
  path: /
nav:
  title: 文档
  order: 1
  path: /docs
---

# 🥳 可能是最好的可编辑表格发布啦

可编辑表格是 ProTable 中呼声比较高的功能，在项目中虽然使用频率不高，但是实现起来难度确不小。所以 ProTable 在完成了架构升级后，就开始着手可编辑表格的开发，现在它终于来了。

## 🧚🏻‍♀️ 默认好看的样式

作为了 Ant Design 的衍生作品，我们对 EditableTable  的样式进行了预设，我们很容易就能做出这么好看的可编辑表格。同时我们提供了顶部添加和底部添加两种模式，用于适应不同的场景。我们可以做到默认好看，同时默认好用。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/VVWpUPXgsp/image%252520%281%29.png)

为了改善在狭窄空间内的错误提示，我们重写错误信息的展示方式，使用 Tooltip 类似的方式来展示错误。当然为了防止抖动，我们也重写了 Form 的样式使其更加的适合狭窄的输入区域，这样在使用 EditableTable  时并不会产生明显的跳动感，感觉非常顺滑。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/l4SiOUPtAm/image.png)

## 👩🏻‍🦽 默认好用的 API

EditableTable  定义了一套和 Ant Design 相同的 API , 如果你是熟练的 Ant Design 使用者在使用时会感觉到非常的熟悉。为了方便大家使用 `EditableTable` 修改了 `value` 和 `onChange` ，只要放到 Form 中就会像 `Input` 一样自动绑定数据。

除了 value 和 onChange 我们还提供了 editable 来自定义编辑表格的行为，包括是否支持多行编辑，当前正在编辑行的 key 等，基本可以满足所有的开发需求。

| 属性 | 描述 | 类型 |
| --- | --- | --- |
| type | 可编辑表格的类型，单行编辑或者多行编辑 | `single` &#124; `multiple` |
| editableKeys | 正在编辑的行，受控属性。 默认 `key` 会使用 `rowKey` 的配置，如果没有配置会使用 `index` | `Key[]` |
| onChange | 行的数据发生改变时触发 | `(editableKeys:Key[], editableRows: T[]) => void` |
| onSave | 保存一行的时候触发，只更新 | `(key: Key, row: T,newLine?: newLineConfig) => Promise<boolean>` |
| onDelete | 删除一行的时候触发 | `(key: Key, row: T) => Promise<boolean>` |
| onCancel | 取消行编辑时触发 | `(key: Key, row: T,newLine?: newLineConfig) => Promise<boolean>` |
| actionRender | 自定义编辑模式的操作栏 | `(row: T, config: ActionRenderConfig<T>) => React.ReactNode[]` |

## 🎣 如何使用？

### editable 编辑配置

市面上的可编辑表格是非常多的，但是很多使用起来非常麻烦，Table 的表单区域虽然小但是输入控件却不简单，常见的文本，下拉框，数组，日期甚至有时候还会有麻烦的日期区间等，那么 EditableTable  是如何解决这个问题的？

EditableTable  是基于 ProTable 实现的，在 ProTable 中我们是有查询表单这个功能的，通过配置不同的 `valueType` 就可以生成不同的查询表单，可编辑表格也是使用了同样的 API ,下图是 ProTable 支持的所有日期类的 `valueType`。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/weBjSsue5J/image%252520%282%29.png)

在这样的能力加持下，EditableTable  的使用变得非常简单，我们可以像 rowSelection 那样使用 editable ，下面是一个简单的例子。

```typescript | pure
const columns: ProColumns<DataSourceType>[] = [
  {
    title: '活动名称',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '描述',
    dataIndex: 'decs',
    valueType: 'text',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

<EditableProTable<DataSourceType>
  rowKey="id"
  headerTitle="可编辑表格"
  columns={columns}
  value={dataSource}
  onChange={setDataSource}
  recordCreatorProps={{
    position: 'end',
    record: { id: (Math.random() * 1000000).toFixed(0) },
  }}
  editable={{
    editableKeys,
    onChange: setEditableRowKeys,
  }}
/>;
```

我们可以控制 editableKeys 来修改当前编辑的行，value 来控制当前的数据。以上的代码会生成下面的样式。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/qCVZrBfmFs/image%252520%283%29.png)

### action 默认行为

可编辑表格的重点是 action ，这个变量有点像 Form 的 formInstance 实例，你可以调用它的方法来操作可编辑表格的一些行为 ,以下是支持的 API 列举：

- `action.startEditable(rowKey)` 开始编辑一行
- `action.cancelEditable(rowKey)` 结束编辑一行，相当于取消
- `action.addEditRecord(row)`   新增一行，row 相当于默认值，一定要包含 rowKey

### recordCreatorProps 新建按钮配置

为了使用，我们预设了一个新建的功能，大多数情况下已经可以满足大部分新建的需求，但是很多时候需求总是千奇百怪。我们也准备了 `recordCreatorProps` 来控制生成按钮。与 Pro 系列组件的 API 相同，`recordCreatorProps={false}`就可以关掉按钮，同时使用 `actionRef.current?.addEditRecord(row)`  来控制新建行。

`recordCreatorProps` 也支持自定义一些样式，`position='top'|'end'` 可以配置增加在表格头还是表格尾部。`record` 可以配置新增行的默认数据。以下是一个列举

```typescript | pure
recordCreatorProps = {
  // 顶部添加还是末尾添加
  position: 'end',
  // 不写 key ，会使用 index 当行 id
  record: {},
  // https://ant.design/components/button-cn/#API
  ...antButtonProps,
};
```

### renderFormItem 自定义编辑组件

虽然我们很希望默认的 valueType 可以满足所有的需求，但是现实往往不尽如人意。所以我们也提供了 `renderFormItem` 来自定义编辑输入组件。

`renderFormItem` 可以理解为在 Form.Item 下面加入一个元素， 伪代码实现是下面这样的：

```typescript | pure
const dom = renderFormItem();

<Form.Item>{dom}</Form.Item>;
```

所以与 Form.Item 相同，我们认为 `renderFormItem` 返回的组件都是拥有的 `value` 和 `onChange` 的，我们接下来将看到用 `renderFormItem` 将一个简单的 TagList 组件放入可编辑表格中。

> 没有 `value` 将会无法注入值，没有 `onChange` 会无法修改行数据

首先我们定义一个 TagList 组件。

```typescript | pure
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
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
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

```typescript | pure
 {
    title: '标签',
    dataIndex: 'labels',
    width: '40%',
    renderFormItem: () => <TagList />,
    render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
```

转化成的编辑表格效果如下 ：

![image.png](https://gw.alipayobjects.com/zos/antfincdn/2ClcRi2hv5/image%252520%284%29.png)

value 和 onChange 会自动注入，我们不需要显式的注入。数据绑定也是由编辑表格自己注入的，我们在 `onSave` 中可以拿到处理完成的数据。虽然我们可以行内的写出复杂的逻辑甚至网络请求，但是我们仍然推荐拆分组件，这样不仅性能更好，逻辑也可以拆分到另外的地方。

> `renderFormItem` 同时也用来生成查询表单，如果我们需要区分这两种情况，可以使用 `renderFormItem: (_, { isEditable }) => (isEditable ? <TagList /> : <Input /> )` 这样的方式来进行分别渲染。

### actionRender 自定义操作栏

可编辑表格默认提供了三大金刚， 保存，删除 和 取消，如果我们要实现复制一行，或者需求只需要的 保存和取消，不需要删除按钮就需要自定义了。可编辑表格提供了 API 来进行自定义，以下会直接展示代码:

#### 复制一行到底部

```typescript | pure
render: (text, record, _, action) => [
  <a
    key="editable"
    onClick={() => {
      action.startEditable?.(record.id);
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
    <a>复制此行到末尾</a>
  </EditableProTable.RecordCreator>,
];
```

#### 自定义操作栏

```typescript | pure
const editable = {
  actionRender: (row, config) => [
    <a
      key="save"
      onClick={async () => {
        const values = (await config?.form?.validateFields()) as DataSourceType;
        const hide = message.loading('保存中。。。');
        await config?.onSave?.(config.recordKey, { ...row, ...values });
        hide();
      }}
    >
      保存
    </a>,
    <a
      key="save"
      onClick={async () => {
        await config?.onCancel?.(config.recordKey, row);
      }}
    >
      取消
    </a>,
  ],
};
```

## 🔐 何时应该使用

ProComponents 的测试覆盖了达到了 97%，虽然离 antd 的 100% 还有很长的距离，但是已经可以保证不会因为变更而出现恼人的不兼容问题，同时在内部已经在数个项目中使用。如果你仍然保有疑虑，可以在我们的[官网](https://procomponents.ant.design/)体验。

![image.png](https://gw.alipayobjects.com/zos/antfincdn/GZ2nXopFf1/image%252520%285%29.png) 如果使用中碰到了任何问题，都可以提 issue，或者直接进行 PR。也许你的想法和意见可以帮助到更多的人。
