import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [size, setSize] = useState(256);

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      name="modal-form-drawer-form-demo"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Create New Form
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        title: 'Create New Form',
        destroyOnHidden: true,
        size,
        resizable: {
          onResize: (newSize) => setSize(newSize),
        },
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('Submission successful');
        // Not returning will not close the modal
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          width="md"
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="company"
          label="Our Company Name"
          placeholder="Please enter a name"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="contract"
          label="Contract Name"
          placeholder="Please enter a name"
        />
        <ProFormDateRangePicker
          name="contractTime"
          label="Contract Effective Time"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          width="xs"
          name="useMode"
          label="Contract Agreed Effective Method"
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 'time',
              label: 'Terminate after performance',
            },
          ]}
          formItemProps={{
            style: {
              margin: 0,
            },
          }}
          name="unusedMode"
          label="Contract Agreed Invalid Method"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="Main Contract Number" />
      <ProFormText
        name="project"
        disabled
        label="Project Name"
        initialValue="示例项目"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="Business Manager"
        initialValue="书琰"
      />
    </DrawerForm>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
