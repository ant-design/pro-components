### EditableProTable

**Purpose**: A specific mode of ProTable for editing data rows directly within the table.

**When to use**:

- When you need to edit data line by line.
- For inline editing scenarios where a full form is too heavy.
- Supports adding new rows, deleting rows, and editing existing rows.

**Semantic**:

- Uses `ProTable` with the `editable` prop configuration.
- Can manage data via `value` (controlled) or internal state.

**API Overview**:

- `editable`: Configuration object for edit mode.
  - `type`: 'single' | 'multiple' (default: 'single').
  - `editableKeys`: Keys of the rows currently being edited (controlled).
  - `onChange`: Callback when data changes.
  - `onSave`: Async callback when a row is saved. `(key, record, originRow) => Promise<any>`
  - `onDelete`: Async callback when a row is deleted.
  - `actionRender`: Custom render for the action column.
- `recordCreatorProps`: Configuration for the "Add New" button.
  - `record`: Default data for the new row.
  - `position`: 'top' | 'bottom'.

**Usage Pattern**:

```tsx
import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: 'Activity name',
    readonly: 'Read-only',
    decs: 'Description',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: 'Activity name 2',
    readonly: 'Read-only',
    decs: 'Description',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>(defaultData);

  return (
    <EditableProTable<DataSourceType>
      rowKey="id"
      headerTitle="Editable Table"
      maxLength={5}
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
      }}
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          formItemProps: (form, { rowIndex }) => {
            return {
              rules: [{ required: true, message: 'Title is required' }],
            };
          },
          // Columns can be editable
          editable: true,
        },
        {
          title: 'State',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            all: { text: 'All', status: 'Default' },
            open: { text: 'Open', status: 'Error' },
            closed: { text: 'Closed', status: 'Success' },
          },
        },
        {
          title: 'Option',
          valueType: 'option',
          width: 200,
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              Edit
            </a>,
            <a
              key="delete"
              onClick={() => {
                setDataSource(
                  dataSource.filter((item) => item.id !== record.id),
                );
              }}
            >
              Delete
            </a>,
          ],
        },
      ]}
      value={dataSource}
      onChange={setDataSource}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          console.log(rowKey, data, row);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};
```

**Common Mistakes**:

- Forgetting to provide a unique `rowKey`.
- Not handling `editableKeys` properly in controlled mode.
- Assuming `onSave` automatically updates the data source (you often need to update state manually or use `onChange` for local data).
- Not configuring `recordCreatorProps` correctly for new rows.
