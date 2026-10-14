import { ProForm, ProFormRadio } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ priority: 'high' }}>
    <ProFormRadio.Group
      name="priority"
      label="优先级"
      radioType="button"
      options={[
        { label: '高', value: 'high' },
        { label: '低', value: 'low' },
      ]}
    />
  </ProForm>
);
