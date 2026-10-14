import { ProForm, ProFormSegmented } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ status: 'open' }}>
    <ProFormSegmented
      name="status"
      label="状态"
      valueEnum={{ open: '未解决', closed: '已解决' }}
    />
  </ProForm>
);
