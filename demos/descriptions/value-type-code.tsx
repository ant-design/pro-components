import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <ProDescriptions
    column={1}
    columns={[{ label: '部署命令', dataIndex: 'command', valueType: 'code' }]}
    dataSource={{ command: 'pnpm run build' }}
  />
);
