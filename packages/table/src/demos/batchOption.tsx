import React from 'react';
import { Button, DatePicker, Space } from 'antd';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

export interface TableListItem {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    hideInSearch: true,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '调用次数',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: (_, { value, onChange }) => {
      return <RangePicker value={value} onChange={onChange} />;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [
      <a>链路</a>,
      <a>报警</a>,
      <a>监控</a>,
      <a>
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{}}
      tableAlertRender={({ selectedRowKeys, selectedRows }) => (
        <Space size={24}>
          <span>已选 {selectedRowKeys.length} 项</span>
          <span>{`容器数量: ${selectedRows.reduce(
            (pre, item) => pre + item.containers,
            0,
          )} 个`}</span>
          <span>{`调用量: ${selectedRows.reduce(
            (pre, item) => pre + item.callNumber,
            0,
          )} 次`}</span>
        </Space>
      )}
      tableAlertOptionRender={(props) => {
        const { onCleanSelected } = props;
        return (
          <Space>
            <Button type="link" onClick={onCleanSelected}>
              取消选择
            </Button>
            <Button danger type="link">
              批量删除
            </Button>
            <Button type="link">导出数据</Button>
          </Space>
        );
      }}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      rowKey="key"
      headerTitle="批量操作"
      toolBarRender={() => [
        <Button>查看日志</Button>,
        <Button>
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary">创建应用</Button>,
      ]}
    />
  );
};
