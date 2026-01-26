### ProForm

**Purpose**: High-performance form component with layout capabilities and preset fields.

**When to use**:
- For standard data entry forms on a page.
- When you need a simple, direct form without modal or drawer wrappers.

**Note**:
- For forms in a Modal, see [ModalForm](modal-form.md).
- For forms in a Drawer, see [DrawerForm](drawer-form.md).
- For multi-step forms, see [StepsForm](steps-form.md).

**API Overview**:
- `onFinish`: Triggered on form submission. `(values) => Promise<boolean | void>`
- `initialValues`: Initial values.
- `submitter`: Configure the submit/reset buttons.
- `layout`: Form layout ('horizontal', 'vertical', 'inline').
- `grid`: Enable grid layout for children.

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
- Use `ProForm.Group` to group related fields.
- Use `width` prop to control field width (`xs`, `sm`, `md`, `lg`, `xl`) instead of raw pixels for consistency.
- Use `request` in `ProFormSelect` to load options asynchronously.
