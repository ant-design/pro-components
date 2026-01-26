### DrawerForm

**Purpose**: A form wrapped in a Drawer, sliding from the side.

**When to use**:
- For creating or editing complex data that requires more vertical space than a Modal.
- When you want to keep the user in context but offer a larger workspace.
- For side-panel configuration or details editing.

**Semantic**:
- Combines `antd` Drawer and `ProForm`.
- Handles `visible` and `loading` states automatically.

**API Overview**:
- `trigger`: ReactNode. The element that opens the drawer.
- `title`: Drawer title.
- `width`: Drawer width (default is usually enough, but can be customized).
- `onFinish`: Async function. Drawer closes if returns `true`.
- `drawerProps`: Props passed to underlying `antd` Drawer.

**Usage Pattern**:

```tsx
import { DrawerForm, ProFormText, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="New Project"
      resize={{
        onResize: (e) => {
          console.log(e);
        },
      }}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          New Project
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('Submitted successfully');
        return true;
      }}
    >
      <ProFormText
        name="name"
        width="md"
        label="Project Name"
        tooltip="The name of the project"
        rules={[{ required: true, message: 'Please enter a name' }]}
      />
      <ProFormDatePicker name="date" label="Date" />
      <ProFormSelect
        name="status"
        label="Status"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </DrawerForm>
  );
};
```

**Best Practices**:
- Similar to `ModalForm`, use `trigger` to avoid state management.
- Use for longer forms where a Modal would require scrolling or feel cramped.
- Consider `drawerProps={{ destroyOnClose: true }}` to clean up state.
