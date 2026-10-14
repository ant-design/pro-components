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
    tooltip="这里列出系统服务"
    headerTitle="服务列表"
  />
);
