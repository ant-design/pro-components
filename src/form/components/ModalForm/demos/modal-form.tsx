import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '../../../../components';
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
      title="Create New Form"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          Create New Form
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('Submission successful');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
        />

        <ProFormText
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
          request={async () => [
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
    </ModalForm>
  );
};
