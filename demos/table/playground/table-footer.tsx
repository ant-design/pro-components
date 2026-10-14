import { ProTable } from '@ant-design/pro-components';
import { columns, rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    columns={columns}
    search={false}
    options={false}
    pagination={false}
    footer={() => '共 4 个服务'}
  />
);
