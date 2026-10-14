import { ProForm, ProFormRadio } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: 'a' }}>
    <ProFormRadio.Group
      name="value"
      label="方案"
      radioType="button"
      options={[
        { label: '方案 A', value: 'a' },
        { label: '方案 B', value: 'b' },
      ]}
    />
  </ProForm>
);
