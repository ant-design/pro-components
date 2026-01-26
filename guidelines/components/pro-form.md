### ProForm

**Purpose**: High-performance form component with layout capabilities and preset fields.

**When to use**:
- For data entry forms.
- When you need complex layouts (groups, steps, modal forms).
- When you want to use `valueType` fields like in ProTable.

**Variants**:
- `ProForm`: Standard form.
- `ModalForm`: Form inside a modal.
- `DrawerForm`: Form inside a drawer.
- `StepsForm`: Multi-step form.
- `QueryFilter`: Search form (used in ProTable).
- `LightFilter`: Lightweight filter form.

**API Overview**:
- `onFinish`: Triggered on form submission. `(values) => Promise<boolean | void>`
- `initialValues`: Initial values.
- `submitter`: Configure the submit/reset buttons.
- `layout`: Form layout ('horizontal', 'vertical', 'inline').

**Field Components**:
- `ProFormText`
- `ProFormTextArea`
- `ProFormSelect`
- `ProFormDatePicker`
- `ProFormDateRangePicker`
- `ProFormDigit`
- `ProFormSwitch`
- `ProFormUploadButton`
- ...and many more.

**Usage Pattern**:

```tsx
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDateRangePicker,
} from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
        message.success('Submitted successfully');
      }}
      initialValues={{
        name: 'Ant Design',
        useMode: 'chapter',
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Contract Name"
          tooltip="The name of the contract"
          placeholder="Please enter a name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        />
        <ProFormText
          width="md"
          name="company"
          label="Company"
          placeholder="Please enter a company"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          request={async () => [
            { label: 'Chapter', value: 'chapter' },
            { label: 'Section', value: 'section' },
          ]}
          width="xs"
          name="useMode"
          label="Contract Mode"
        />
        <ProFormDateRangePicker name="contractTime" label="Contract Time" />
      </ProForm.Group>
    </ProForm>
  );
};
```

**Best Practices**:
- Use `ProForm.Group` to group fields.
- Use `width` prop to control field width (`xs`, `sm`, `md`, `lg`, `xl`) instead of raw pixels.
- Use `request` in `ProFormSelect` to load options asynchronously.
- Use `ModalForm` or `DrawerForm` for popup forms to handle visibility and loading states automatically.
