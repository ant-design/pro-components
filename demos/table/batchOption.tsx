import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

import { createTableDataSource, DEMO_CREATOR_VALUE_ENUM } from '../mockData';

const { RangePicker } = DatePicker;

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
} as const;

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};

const tableListDataSource = createTableDataSource({
  count: 50,
  withProgress: true,
  withCallNumber: true,
}) as TableListItem[];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 140,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    width: 100,
    dataIndex: 'containers',
    align: 'right',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '请求量',
    width: 100,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '部署进度',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status as 'close'],
    }),
  },
  {
    title: '负责人',
    width: 100,
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: DEMO_CREATOR_VALUE_ENUM,
  },
  {
    title: '部署时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    formItemRender: () => {
      return <RangePicker />;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '操作',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [<a key="detail">详情</a>],
  },
];

const Demo = () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => {
        console.log(selectedRowKeys, selectedRows);
        return (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            <span>{`容器总数: ${selectedRows.reduce(
              (pre, item) => pre + item.containers,
              0,
            )} 个`}</span>
            <span>{`请求总量: ${selectedRows.reduce(
              (pre, item) => pre + item.callNumber,
              0,
            )} 次`}</span>
          </Space>
        );
      }}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量重启</a>
            <a>批量下线</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      dataSource={tableListDataSource}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 5,
      }}
      rowKey="key"
      headerTitle="批量操作"
      toolBarRender={() => [<Button key="export">导出报表</Button>]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
