import { ProForm, ProFormSegmented } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ status: 'open' }}>
    <ProFormSegmented
      name="status"
      label="状态"
      request={async () => [
        { label: '未解决', value: 'open' },
        { label: '已解决', value: 'closed' },
      ]}
    />
  </ProForm>
);
