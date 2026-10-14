import { ProTable } from '@ant-design/pro-components';
import { columns, rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    dataSource={rows}
    columns={columns}
    search={false}
    options={{
      density: false,
      fullScreen: false,
      setting: true,
      reload: false,
    }}
    pagination={false}
  />
);
