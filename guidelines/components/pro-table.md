### ProTable

**Purpose**: Advanced table component that solves common table issues like search, filter, sort, and pagination.

**When to use**:
- For admin interfaces displaying lists of data.
- When you need built-in search/filter forms.
- When you need to handle server-side sorting and pagination easily.

**Semantic**:
- Uses `antd` Table under the hood but adds a search form above and toolbars.
- `dataSource` can be fetched automatically via `request` prop.

**API Overview**:

- `columns`: Array of `ProColumns`. Defines table columns and search form fields.
- `request`: Function to fetch data. `(params, sort, filter) => Promise<{ data, success, total }>`
- `rowKey`: Unique key for each row (required).
- `headerTitle`: Title of the table.
- `toolBarRender`: Render custom actions in the toolbar.
- `actionRef`: Ref to trigger table actions like `reload()`.

**ProColumns Configuration**:
- `dataIndex`: Key in the data object.
- `title`: Column header title.
- `valueType`: Type of the data (e.g. `date`, `money`, `select`).
- `hideInSearch`: Hide this field in the search form.
- `hideInTable`: Hide this column in the table.
- `search`: Configure search behavior (transform, etc.).
- `render`: Custom render function.
- `valueEnum`: Map of values for `select` type.

**Usage Pattern**:

```tsx
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

// Define the data type
type GithubIssueItem = {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
};

export default () => {
  const actionRef = useRef();

  return (
    <ProTable<GithubIssueItem>
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          copyable: true,
          ellipsis: true,
          tip: 'Title is too long',
          formItemProps: {
            rules: [
              {
                required: true,
                message: 'This is required',
              },
            ],
          },
        },
        {
          title: 'State',
          dataIndex: 'state',
          valueType: 'select',
          valueEnum: {
            open: { text: 'Open', status: 'Error' },
            closed: { text: 'Closed', status: 'Success' },
          },
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          valueType: 'date',
          sorter: true,
          hideInSearch: true,
        },
        {
          title: 'Option',
          valueType: 'option',
          render: (text, record, _, action) => [
            <a
              key="editable"
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              Edit
            </a>,
          ],
        },
      ]}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        // Mock request
        return {
          data: [],
          success: true,
          total: 0,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // syncToUrl: (values, type) => {
        //   if (type === 'get') {
        //     return {
        //       ...values,
        //       created_at: [values.startTime, values.endTime],
        //     };
        //   }
        //   return values;
        // },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced Table"
    />
  );
};
```

**Common Mistakes**:
- Forgetting `rowKey`.
- Manually managing `dataSource` and `loading` when `request` is better.
- Not using `valueType` and writing custom `render` for everything.
- Modifying `params` directly in `request` without returning the correct structure.
