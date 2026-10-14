import { ProTable } from '@ant-design/pro-components';
import { rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    search={false}
    options={false}
    pagination={false}
    columns={[
      { title: '说明', dataIndex: 'description', width: 180, ellipsis: true },
    ]}
  />
);
