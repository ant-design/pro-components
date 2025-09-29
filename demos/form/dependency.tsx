import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@xxlabs/pro-components';
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
    <ProForm
      initialValues={{
        name: 'Ant Design Co., Ltd.',
        name2: 'Ant Design Group',
        useMode: 'chapter',
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Submission successful');
      }}
    >
      <ProFormText
        label="Contract Customer Name"
        name="name"
        placeholder="Please enter a name"
        tooltip="Up to 24 characters"
        width="md"
      />
      <ProFormText
        label="Contract Customer Name"
        name={['name2', 'text']}
        placeholder="Please enter a name"
        tooltip="Up to 24 characters"
        width="md"
      />
      {/* ProFormDependency will automatically inject and perform shouldUpdate comparison */}
      <ProFormDependency name={['name', ['name2', 'text']]}>
        {({ name, name2 }) => {
          return (
            <ProFormSelect
              label={`Effective method agreed in the contract with "${name || ''}" and "${name2?.text || ''}"`}
              name="useMode"
              options={[
                {
                  value: 'chapter',
                  label: 'Effective after stamping',
                },
              ]}
              width="md"
            />
          );
        }}
      </ProFormDependency>
      {/* noStyle shouldUpdate is required, writing name will invalidate it */}
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <ProFormSelect
              label={`Effective method agreed in the contract with "${form.getFieldValue('name')}"`}
              name="useMode"
              options={[
                {
                  value: 'chapter',
                  label: 'Effective after stamping',
                },
              ]}
              width="md"
            />
          );
        }}
      </ProForm.Item>
    </ProForm>
  );
};
