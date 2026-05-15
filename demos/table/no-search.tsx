import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../mockData';

type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};

const tableListDataSource = createTableDataSource({
  count: 5,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a key="link">链路</a>, <a key="warn">报警</a>],
  },
];

export default () => (
  <ProTable<TableListItem>
    columns={columns}
    request={() =>
      Promise.resolve({
        data: tableListDataSource,
        total: tableListDataSource.length,
        success: true,
      })
    }
    rowKey="key"
    search={false}
    options={{ reload: true, setting: true }}
  />
);
