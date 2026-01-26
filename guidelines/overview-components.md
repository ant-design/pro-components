## Components

Always prefer components from `@ant-design/pro-components` for complex scenarios (layouts, tables, forms). For basic elements, use `antd`.

Here are the guidelines files and additional guidelines for the ProComponents:

| Component | Overview | Guidelines file |
|----------|----------|----------|
| ProCard | Card component with better layout and actions | [pro-card.md](components/pro-card.md) |
| ProDescriptions | Descriptions component with valueType support | [pro-descriptions.md](components/pro-descriptions.md) |
| ProField | Atomic field component for display and edit | [pro-field.md](components/pro-field.md) |
| ProForm | Form component with layout and valueType support | [pro-form.md](components/pro-form.md) |
| ProLayout | Heavy-duty layout component | [pro-layout.md](components/pro-layout.md) |
| ProList | List component with table-like features | [pro-list.md](components/pro-list.md) |
| ProSkeleton | Skeleton loading component | [pro-skeleton.md](components/pro-skeleton.md) |
| ProTable | Advanced table with search, filter, and valueType | [pro-table.md](components/pro-table.md) |

## General Component Usage and Best Practices

### Common Props

Most ProComponents accept these common props:
- `loading`: boolean | ReactNode - Loading state
- `headerTitle`: ReactNode - Title for the component
- `tooltip`: string | TooltipProps - Tooltip for the title
- `extra`: ReactNode - Extra actions
- `request`: (params) => Promise<Data> - Request data from server

### ValueType

ProComponents use `valueType` to abstract the render logic. Common valueTypes:
- `text`: Default text
- `date`, `dateRange`, `dateTime`, `time`: Date related
- `select`: Select box (requires `valueEnum` or `request`)
- `money`: Currency
- `digit`: Number
- `percent`: Percentage
- `avatar`: Avatar
- `image`: Image
- `jsonCode`: JSON code block
- `textarea`: Text area
- `password`: Password input

### Controlled vs Uncontrolled

ProForm and ProTable support both controlled and uncontrolled modes.
- Prefer `request` for data fetching (Uncontrolled data)
- Use `formRef` or `actionRef` to interact with the component instance
