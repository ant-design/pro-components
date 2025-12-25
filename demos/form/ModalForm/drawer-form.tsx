import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <div style={{ padding: 24 }}>

    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="Create New Form"
      resize={{
        onResize() {
          console.log('resize!');
        },
        maxWidth: window.innerWidth * 0.8,
        minWidth: 300,
      }}
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Create New Form
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnHidden: true,
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
        initialValue="xxxx Project"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="Business Manager"
        initialValue="Qitu"
      />
    </DrawerForm>
  
    </div>
  );
};
