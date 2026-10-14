import { ProForm, ProFormCheckbox } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: ['A', 'B'] }}>
    <ProFormCheckbox.Group
      name="value"
      label="功能"
      options={['A', 'B', 'C']}
    />
  </ProForm>
);
