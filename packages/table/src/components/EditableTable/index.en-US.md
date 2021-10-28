---
title: EditableProTable
group:
  path: /
nav:
  title: Components
  path: /components
---

# EditableProTable - Editable Tables

EditableProTable is essentially the same as ProTable, with a few presets added to make it easier to use EditableProTable, turning off the query form and action bar, and modifying value and onChange to make it easy to inherit from antd's Form.

## Code Demo

### Editable forms

<code src="./demos/basic.tsx" background="#f5f5f5" height="420px" title="Editable Form" />

### Link with content outside the edit form

<code src="./demos/form-linkage.tsx" background="#f5f5f5" height="420px" title="Link with content outside the edit form" />

### Custom Editable Tables

<code src="./demos/custom.tsx" background="#f5f5f5" height="420px" title="Custom Editable Form" />

### Live Saved Editable Forms

<code src="./demos/real-time-editing.tsx" background="#f5f5f5" height="420px" title="Real-time saved editing form" />

## API

## API

| Properties | Description | Type | Default |
| --- | --- | --- | --- |
| value | Same as dataSource, pass in an array of metadata for table rendering | `T[]` | `undefined` |
| onChange | The dataSource is triggered when the table is modified, both deletion and modification. | `(value:T[])=>void` | `undefined` |
| recordCreatorProps | Configuration related to creating a new row of data | [RecordCreatorProps](#recordcreator) & [ButtonProps](<https://ant.design/components/button/> #API) | - |
| maxLength | The maximum number of rows, the New button will disappear when the maximum number of rows is reached | number | - |
| editable | Whether or not editable in the edit table, the function's arguments are the same as the table's render | `false` \| `(text: any, record: T,index: number) => boolean` | true |
| controlled | Whether controlled, if controlled every edit modifies the dataSource | `boolean` | false |

> Other APIs are the same as ProTable.

### editable edit line configuration

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| form | Form instance of editable form, use `Form.useForm` to generate and use | `FormInstance` | - |
| formProps | form properties can be configured, but onFinish is not supported | [`FormProps'](https://procomponents.ant.design/components/form#proform) | - |
| editableKeys | Row being edited, controlled attributes. The default`key` will use the configuration of `rowKey`,if there is no configuration, it will use the`index`, it is recommended to use rowKey | `Key[]` | - |
| onChange | Triggered when row data is modified | `(editableKeys: Key[], editableRows: T[]) => void` | - |
| onSave | Triggered when a row is saved | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>` | - |
| onDelete | Triggered when a row is deleted | `(key: Key, row: T) => Promise<any>` | - |
| onCancel | Triggered when cancel editing a line | `(key: Key, row: T,originRow:T,newLine?:newLineConfig) => Promise<any>` | - |
| actionRender | Custom edit mode action bar | `(row: T, config: ActionRenderConfig<T>) => ReactNode[]` | - |
| deletePopconfirmMessage | The pop-up confirmation box prompt message when deleting | `ReactNode` | `Delete this line?` |
| onlyOneLineEditorAlertMessage | Only one line can be edited | `ReactNode` | `Only one line can be edited at the same time` |
| onlyAddOneLineAlertMessage | Only one line can be added at the same time | `ReactNode` | `Only add one line` |

### recordCreatorProps New button configuration

In order to use it, we preset a New function, which in most cases already meets most new creation needs, but many times the needs are always strange. We have also prepared `recordCreatorProps` to control the generation of buttons. Same API as the Pro series components, `recordCreatorProps={false}` turns off the button and uses `actionRef.current?.addEditRecord(row)` to control the new row.

`recordCreatorProps` also supports some custom styles, `position='top'|'end'` can be configured to add at the head or at the end of the table. `record` can be configured to add a new row with default data. Here is an example

```typescript
recordCreatorProps = {
  // 顶部添加还是末尾添加
  position: 'end',
  // 新增一行的方式，默认是缓存，取消后就会消失
  // 如果设置为 dataSource 会触发 onchange，取消后也不会消失，只能删除
  newRecordType: 'dataSource',
  // 不写 key ，会使用 index 当行 id
  record: {},
  // 按钮的样式设置，可以设置按钮是否显示
  // 这样可以做最大行限制和最小行限制之类的功能
  style: {
    display: 'none',
  },
  // https://ant.design/components/button/#API
  ...antButtonProps,
};
```

```typescript
recordCreatorProps = {
  // Add at the top or at the end
  position: 'end',
  // the way to add a new line, default is cached, will disappear when cancelled
  // if set to dataSource it will trigger onchange, it won't disappear if cancelled, only deleted
  newRecordType: 'dataSource',
  // If you don't write key, index will be used as row id
  record: {},
  // the style of the button, you can set whether the button is displayed or not
  // so that you can do things like max row limit and min row limit
  style: {
    display: 'none',
  },
  // https://ant.design/components/button/#API
  ... .antButtonProps,
};
```

### renderFormItem Custom Edit Component

As much as we would like the default valueType to meet all our needs, the reality is often not as good as it could be. So we also provide `renderFormItem` to customize the edit input component.

`renderFormItem` can be understood as adding an element below Form.

```typescript
const dom = renderFormItem();

<Form.Item>{dom}</Form.Item>;
```

So as with Form.Item, we assume that the components returned by `renderFormItem` have `value` and `onChange`, and we'll see next that putting a simple TagList component into an editable form with `renderFormItem`.

> Without `value` you won't be able to inject values and without `onChange` you won't be able to modify the row data!

First we define a TagList component.

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

In the column we can configure it like this.

```typescript
 {
    title: 'labels',
    dataIndex: 'labels',
    width: '40%',
    renderFormItem: () => <TagList />,
    render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
```

The effect of the transformed edit form is as follows.

! [image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/473a8336e31647ac8ab5041dde6ac4ec~tplv-k3u1fbpfcp-zoom-1.image)

value and onChange are injected automatically, we don't need to inject them explicitly. Data binding is also injected by the edit form itself, and we can get the finished data in `onSave`. Although we can write complex logic and even web requests inline, we recommend using the split component, which not only provides better performance, but also allows the logic to be split very simply.

> `renderFormItem` is also used to generate query forms, if we need to distinguish between the two cases, we can use `renderFormItem: (_, { isEditable }) => (isEditable ? <TagList /> : <Input /> )` to render them separately.

### actionRender Custom Action Bar

If we want to copy a line, or if we only need the Save and Cancel, but not the Delete button, we need to customize it. The editable form provides an API to customize it, and the following will show the code directly:

#### Copy a line to the bottom

```typescript
render: (text, record, _, action) => [
  <a
    key="editable"
    onClick={() => {
      action?.startEditable? (record.id);
    }}
  >
    Edit
  </a>,
  <EditableProTable.RecordCreator
    record={()=>{
      ...record,
      id: (Math.random() * 1000000).toFixed(0),
    }}
  >
    <a>Copy this row to the end</a
  </EditableProTable.RecordCreator>,
];
```

#### Custom Action Bar

```typescript
const editable = {
  actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
};
```
