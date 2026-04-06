import { EllipsisOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Tag } from 'antd';
import React, { Key, useState } from 'react';

const types = ['top', 'inline', 'new'];
const data = [
  '智慧零售平台（top）',
  'Ant Design Pro（inline）',
  '云原生微服务框架（new）',
  '数据可视化引擎',
].map((item, index) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">技术专栏</Tag>,
  actions: [
    <a key="invite">邀请</a>,
    <a key="operate">操作</a>,
    <a key="rest">
      <EllipsisOutlined />
    </a>,
  ],
  description: (
    <div>
      <div>top 会有小角标</div>
      <div>inline 标题字体是 normal</div>
      <div>new 会有一个入场动画</div>
    </div>
  ),
  type: types[index],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

const Demo = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };
  const [dataSource, setDataSource] = useState<any[]>([...data] as any[]);

  return (
    <>
      <ProList<{
        title: string;
        subTitle: React.JSX.Element;
        actions: React.JSX.Element[];
        description: React.JSX.Element;
        type?: 'top' | 'inline' | 'new';
        avatar: string;
        children: React.JSX.Element;
      }>
        columns={[
          { dataIndex: 'title', listSlot: 'title' },
          { dataIndex: 'subTitle', listSlot: 'subTitle' },
          { dataIndex: 'type', listSlot: 'type' },
          { dataIndex: 'description', listSlot: 'description' },
          { dataIndex: 'avatar', listSlot: 'avatar' },
          { dataIndex: 'content', listSlot: 'content' },
          { dataIndex: 'actions', listSlot: 'actions' },
        ]}
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              setDataSource([...data.map((item) => ({ ...item }))]);
              setTimeout(() => {
                const list = [...data.map((item) => ({ ...item }))];
                list[1].type = 'new';
                setDataSource(list);
              }, 0);
            }}
          >
            刷新
          </Button>,
        ]}
        rowKey="id"
        headerTitle="预设的列状态"
        rowSelection={rowSelection}
        dataSource={dataSource}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
      />
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
