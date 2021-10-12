import React, { useState } from 'react';
import { Button, Badge, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '创建者',
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
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="这是一段描述">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: (_, record) => [
      record.status === 'close' && <a key="link">发布</a>,
      (record.status === 'running' || record.status === 'online') && <a key="warn">停用</a>,
      record.status === 'error' && <a key="republish">重新发布</a>,
      <a
        key="republish"
        style={
          record.status === 'running'
            ? {
                color: 'rgba(0,0,0,.25)',
                cursor: 'not-allowed',
              }
            : {}
        }
      >
        监控
      </a>,
    ],
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -2,
        marginLeft: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

export default () => {
  const [activekey, setActiveKey] = useState<React.Key>('tab1');

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="响应日期" />
          </LightFilter>
        ),
        menu: {
          type: 'tab',
          activeKey: activekey,
          items: [
            {
              key: 'tab1',
              label: <span>应用{renderBadge(99, activekey === 'tab1')}</span>,
            },
            {
              key: 'tab2',
              label: <span>项目{renderBadge(30, activekey === 'tab2')}</span>,
            },
            {
              key: 'tab3',
              label: <span>文章{renderBadge(30, activekey === 'tab3')}</span>,
            },
          ],
          onChange: (key) => {
            setActiveKey(key as string);
          },
        },
        actions: [
          <Button key="primary" type="primary">
            新建应用
          </Button>,
        ],
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      options={{
        setting: {
          draggable: true,
          checkable: true,
          checkedReset: false,
          extra: [<a>确认</a>],
        },
      }}
    />
  );
};
