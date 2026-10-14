import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm readonly submitter={false} initialValues={{ value: 'china' }}>
    <ProFormSelect
      name="value"
      label="国家"
      valueEnum={{ china: '中国', usa: '美国' }}
    />
  </ProForm>
);
