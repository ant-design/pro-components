import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    column={1}
    columns={[
      { label: '服务配置', dataIndex: 'config', valueType: 'jsonCode' },
    ]}
    dataSource={{
      config: JSON.stringify({ service: 'user-auth', replicas: 3 }, null, 2),
    }}
  />
);
