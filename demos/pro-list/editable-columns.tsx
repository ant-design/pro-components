/**
 * columns API 配合可编辑列表
 */
import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useState } from 'react';

const defaultData = [
  {
    id: '1',
    name: '智慧零售平台',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '云原生微服务框架',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

type DataItem = (typeof defaultData)[number];

const columns: ProColumns<DataItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    listSlot: 'title',
  },
  {
    dataIndex: 'image',
    listSlot: 'avatar',
    editable: false,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    listSlot: 'description',
  },
  {
    listSlot: 'subTitle',
    search: false,
    editable: false,
    render: () => (
      <Space size={8}>
        <Tag color="blue">Ant Design</Tag>
        <Tag color="#5BD8A6">可视化</Tag>
      </Space>
    ),
  },
  {
    listSlot: 'actions',
    search: false,
    render: (_, row, __, action) => [
      <a
        onClick={() => {
          action?.startEditable(row.id);
        }}
        key="edit"
      >
        编辑
      </a>,
    ],
  },
];

const Demo = () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
  return (
    <ProList<DataItem>
      rowKey="id"
      headerTitle="可编辑列表（columns API）"
      dataSource={dataSource}
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      onDataSourceChange={setDataSource}
      columns={columns}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
