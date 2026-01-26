### ModalForm

**Purpose**: A form wrapped in a Modal, used for creating or editing data in a dialog.

**When to use**:

- For "Create" or "Edit" actions that don't require a full page.
- When you need a quick interaction without leaving the current context.
- When the form content is relatively short.

**Semantic**:

- Combines `antd` Modal and `ProForm`.
- Automatically handles the `visible` (via `trigger`) and `loading` states.

**API Overview**:

- `trigger`: ReactNode. The element that opens the modal when clicked.
- `title`: Modal title.
- `width`: Modal width.
- `open`: Controlled visibility state (optional).
- `onOpenChange`: Callback when visibility changes.
- `onFinish`: Async function. The modal closes automatically if this returns `true`.
- `modalProps`: Props passed to the underlying `antd` Modal.

**Usage Pattern**:

```tsx
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="Create New Entry"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          New Entry
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('Submitted successfully');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="Name"
        placeholder="Please enter name"
        rules={[{ required: true, message: 'This is required' }]}
      />
      <ProFormSelect
        width="md"
        name="type"
        label="Type"
        options={[
          { value: '1', label: 'Type 1' },
          { value: '2', label: 'Type 2' },
        ]}
      />
    </ModalForm>
  );
};
```

**Best Practices**:

- Always use `trigger` when possible to avoid managing `open` state manually.
- Return `true` in `onFinish` to close the modal. Return `false` or nothing to keep it open (e.g. if validation fails).
- Use `modalProps={{ destroyOnClose: true }}` to reset the form when closed.
- Keep the form simple. If the form is very long, consider using `DrawerForm` or `StepsForm`.
