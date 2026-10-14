import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ colors: ['green', 'blue'] }}>
    <ProFormSelect
      name="colors"
      label="颜色"
      valueEnum={{ red: '红', green: '绿', blue: '蓝' }}
      fieldProps={{ mode: 'multiple' }}
    />
  </ProForm>
);
