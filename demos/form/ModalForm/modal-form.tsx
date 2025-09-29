import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm, ProFormDateRangePicker, ProFormSelect, ProFormText } from '@xxlabs/pro-components';
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
    <ModalForm<{
      name: string;
      company: string;
    }>
      autoFocusFirstInput
      form={form}
      modalProps={{
        destroyOnHidden: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      title="Create New Form"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Create New Form
        </Button>
      }
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('Submission successful');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          label="Contract Customer Name"
          name="name"
          placeholder="Please enter a name"
          tooltip="Up to 24 characters"
          width="md"
        />

        <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText label="Contract Name" name="contract" placeholder="Please enter a name" width="md" />
        <ProFormDateRangePicker label="Contract Effective Time" name="contractTime" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="Contract Agreed Effective Method"
          name="useMode"
          request={async () => [
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          width="xs"
        />
        <ProFormSelect
          label="Contract Agreed Invalid Method"
          name="unusedMode"
          options={[
            {
              value: 'time',
              label: 'Terminate after performance',
            },
          ]}
          width="xs"
        />
      </ProForm.Group>
      <ProFormText label="Main Contract Number" name="id" width="sm" />
      <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" />
      <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
    </ModalForm>
  );
};
