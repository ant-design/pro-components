/** Title: Front Watermark */
import type { ProColumns } from '@ant-design/pro-components';
import {
  LightFilter,
  ProFormDatePicker,
  ProTable,
  TableDropdown,
  WaterMark,
} from '@ant-design/pro-components';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}
const tableListDataSource: TableListItem[] = [];

const creators = [
  'Fu Xiaoxiao',
  'Qu Lili',
  'Lin Dongdong',
  'Chen Shuai',
  'Jian Moumou',
];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? 'A very long text that needs to be displayed but needs to leave a tail'
        : 'Short memo text',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: 'AppName',
    width: 80,
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: 'Number of Containers',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: 'Status',
    width: 80,
    dataIndex: 'status',
    initialValue: 'all',
    valueEnum: {
      all: { text: 'All', status: 'Default' },
      close: { text: 'Close', status: 'Default' },
      running: { text: 'Running', status: 'Processing' },
      online: { text: 'Online', status: 'Success' },
      error: { text: 'Error', status: 'Error' },
    },
  },
  {
    title: 'Creator',
    width: 80,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: 'All' },
      'Fu Xiaoxiao': { text: 'Fu Xiaoxiao' },
      'Qu Lili': { text: 'Qu Lili' },
      'Lin Dongdong': { text: 'Lin Dongdong' },
      'Chen Shuai': { text: 'Chen Shuai' },
      'Jian Moumou': { text: 'Jian Moumou' },
    },
  },
  {
    title: 'Memo',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'Actions',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">Link</a>,
      <a key="link2">Alert</a>,
      <a key="link3">Monitor</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: 'Copy' },
          { key: 'delete', name: 'Delete' },
        ]}
      />,
    ],
  },
];

export default () => (
  <>
    <WaterMark content="Ant Group">
      <ProTable<TableListItem>
        columns={columns}
        dataSource={tableListDataSource}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        toolbar={{
          title: 'Tags',
          multipleLine: true,
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" label="Response Date" />
            </LightFilter>
          ),
        }}
        search={false}
        dateFormatter="string"
      />
    </WaterMark>
  </>
);
