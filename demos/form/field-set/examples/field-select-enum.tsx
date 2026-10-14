import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ country: 'china' }}>
    <ProFormSelect
      name="country"
      label="国家"
      valueEnum={{ china: '中国', usa: '美国' }}
    />
  </ProForm>
);
