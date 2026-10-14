import { ProTable } from '@ant-design/pro-components';
import { rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    search={false}
    options={false}
    pagination={false}
    columns={[{ title: '服务', dataIndex: 'name', copyable: true }]}
  />
);
