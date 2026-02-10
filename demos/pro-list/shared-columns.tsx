/**
 * 同一份 columns 同时用于 ProTable 和 ProList，一键切换视图
 */
import { ProList, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Radio, Space, Tag } from 'antd';
import { useState } from 'react';

type DataItem = {
  id: string;
  name: string;
  avatar: string;
  status: 'open' | 'closed' | 'processing';
  labels: string[];
  updatedAt: string;
};

const dataSource: DataItem[] = [
  {
    id: '1',
    name: '智慧零售平台',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    status: 'open',
    labels: ['技术专栏', '设计语言'],
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    status: 'processing',
    labels: ['Ant Design'],
    updatedAt: '2024-02-20',
  },
  {
    id: '3',
    name: '云原生微服务框架',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    status: 'closed',
    labels: ['云原生', '可视化'],
    updatedAt: '2024-03-10',
  },
];

/**
 * 这份 columns 同时用于 ProTable 和 ProList
 * - ProTable 渲染为表格列
 * - ProList 通过 listSlot 映射到列表项各部分
 */
const columns: ProColumns<DataItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    listSlot: 'title',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    listSlot: 'avatar',
    search: false,
    hideInTable: true,
  },
  {
    title: '标签',
    dataIndex: 'labels',
    listSlot: 'subTitle',
    search: false,
    render: (_, row) => (
      <Space size={4}>
        {row.labels?.map((label) => (
          <Tag color="blue" key={label}>
            {label}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      open: { text: '未解决', status: 'Error' },
      closed: { text: '已解决', status: 'Success' },
      processing: { text: '处理中', status: 'Processing' },
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    valueType: 'date',
    search: false,
    listSlot: 'description',
  },
  {
    title: '操作',
    listSlot: 'actions',
    search: false,
    render: () => [
      <a key="edit">编辑</a>,
      <a key="delete">删除</a>,
    ],
  },
];

export default () => {
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  return (
    <div style={{ padding: 24 }}>
      <Radio.Group
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value)}
        style={{ marginBottom: 16 }}
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: '列表视图', value: 'list' },
          { label: '表格视图', value: 'table' },
        ]}
      />
      {viewMode === 'list' ? (
        <ProList<DataItem>
          rowKey="id"
          headerTitle="列表视图"
          columns={columns}
          dataSource={dataSource}
        />
      ) : (
        <ProTable<DataItem>
          rowKey="id"
          headerTitle="表格视图"
          columns={columns}
          dataSource={dataSource}
          search={false}
          pagination={false}
        />
      )}
    </div>
  );
};
