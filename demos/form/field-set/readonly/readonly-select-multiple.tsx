import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: ['red', 'green'] }}
  >
    <ProFormSelect
      name="value"
      label="颜色"
      valueEnum={{ red: '红', green: '绿' }}
      fieldProps={{ mode: 'multiple' }}
    />
  </ProForm>
);
