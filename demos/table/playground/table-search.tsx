import { ProTable } from '@ant-design/pro-components';
import { rows } from './data';

export default () => (
  <ProTable
    rowKey="id"
    request={async ({ name, status }) => {
      const data = rows.filter(
        (row) =>
          (!name || row.name.includes(String(name))) &&
          (!status || row.status === status),
      );
      return { data, success: true, total: data.length };
    }}
    options={false}
    pagination={false}
    search={{}}
    columns={[
      { title: '服务', dataIndex: 'name' },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: { running: '运行中', closed: '已关闭' },
      },
    ]}
  />
);
