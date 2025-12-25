import {
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <ProForm
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Submission successful');
      }}
      initialValues={{
        name: 'Ant Design Co., Ltd.',
        name2: 'Ant Design Group',
        useMode: 'chapter',
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="Contract Customer Name"
        tooltip="Up to 24 characters"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name={['name2', 'text']}
        label="Contract Customer Name"
        tooltip="Up to 24 characters"
        placeholder="Please enter a name"
      />
      {/* ProFormDependency will automatically inject and perform shouldUpdate comparison */}
      <ProFormDependency name={['name', ['name2', 'text']]}>
        {({ name, name2 }) => {
          return (
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: 'Effective after stamping',
                },
              ]}
              width="md"
              name="useMode"
              label={`Effective method agreed in the contract with "${name || ''}" and "${name2?.text || ''}"`}
            />
          );
        }}
      </ProFormDependency>
      {/* noStyle shouldUpdate is required, writing name will invalidate it */}
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: 'Effective after stamping',
                },
              ]}
              width="md"
              name="useMode"
              label={`Effective method agreed in the contract with "${form.getFieldValue('name')}"`}
            />
          );
        }}
      </ProForm.Item>
    </ProForm>
  
    </div>
  );
};
