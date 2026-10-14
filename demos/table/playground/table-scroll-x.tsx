import { ProTable } from '@ant-design/pro-components';
import { rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    search={false}
    options={false}
    pagination={false}
    scroll={{ x: 720 }}
    columns={[
      { title: '服务', dataIndex: 'name', width: 240 },
      { title: '状态', dataIndex: 'status', width: 180 },
      { title: '说明', dataIndex: 'description', width: 300 },
    ]}
  />
);
