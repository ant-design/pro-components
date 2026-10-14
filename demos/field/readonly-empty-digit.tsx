import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormDigit
      label="只读空值"
      name="empty"
      readonly
      fieldProps={{ addonAfter: '次' }}
    />
  </ProForm>
);
