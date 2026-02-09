/**
 * 使用 columns + listKey 的新 API，与 ProTable 兼容
 */
import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

type DataItem = {
  id: string;
  name: string;
  image: string;
  desc: string;
  labels: string[];
};

const dataSource: DataItem[] = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    labels: ['语雀专栏', '设计语言'],
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态',
    labels: ['Ant Design', 'TechUI'],
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '蚂蚁金服体验科技是一个致力于提升用户体验的技术团队',
    labels: ['蚂蚁金服'],
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'TechUI 是一个面向企业级中后台的设计解决方案',
    labels: ['TechUI'],
  },
];

/**
 * 同一份 columns 可同时用于 ProTable 和 ProList
 * ProTable 忽略 listKey，ProList 使用 listKey 映射到列表项的各个部分
 */
const columns: ProColumns<DataItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    listKey: 'title',
  },
  {
    dataIndex: 'image',
    listKey: 'avatar',
    search: false,
  },
  {
    title: '标签',
    dataIndex: 'labels',
    listKey: 'subTitle',
    search: false,
    render: (_, row) => (
      <Space size={8}>
        {row.labels?.map((label) => (
          <Tag color="blue" key={label}>
            {label}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '描述',
    dataIndex: 'desc',
    listKey: 'description',
    search: false,
  },
  {
    title: '操作',
    listKey: 'actions',
    search: false,
    render: (_, row) => [
      <a key="edit">编辑</a>,
      <a key="delete">删除</a>,
    ],
  },
];

const Demo = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

  return (
    <ProList<DataItem>
      rowKey="id"
      headerTitle="columns API（与 ProTable 兼容）"
      toolBarRender={() => [
        <Button key="add" type="primary">
          新建
        </Button>,
      ]}
      columns={columns}
      expandable={{
        expandedRowKeys,
        onExpandedRowsChange: setExpandedRowKeys,
      }}
      dataSource={dataSource}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
