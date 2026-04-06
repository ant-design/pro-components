/**
 * 使用 columns + listSlot 的新 API，与 ProTable 兼容
 */
import type { ProColumns } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
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
    name: '智慧零售平台',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
    labels: ['技术专栏', '设计语言'],
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '企业级数据看板与可视化分析工具，开箱即用的图表方案',
    labels: ['Ant Design', '可视化'],
  },
  {
    id: '3',
    name: '云原生微服务框架',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '基于 K8s 的微服务开发与治理框架，支持服务注册与发现',
    labels: ['云原生'],
  },
  {
    id: '4',
    name: '数据可视化引擎',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '面向企业级中后台的数据可视化解决方案',
    labels: ['可视化'],
  },
];

/**
 * 同一份 columns 可同时用于 ProTable 和 ProList
 * ProTable 忽略 listSlot，ProList 使用 listSlot 映射到列表项的各个部分
 */
const columns: ProColumns<DataItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    listSlot: 'title',
  },
  {
    dataIndex: 'image',
    listSlot: 'avatar',
    search: false,
  },
  {
    title: '标签',
    dataIndex: 'labels',
    listSlot: 'subTitle',
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
    listSlot: 'description',
    search: false,
  },
  {
    title: '操作',
    listSlot: 'actions',
    search: false,
    render: () => [<a key="edit">编辑</a>, <a key="delete">删除</a>],
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
