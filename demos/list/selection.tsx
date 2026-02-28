import { ProList } from '@ant-design/pro-components';
import { Button, Progress } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '智慧零售平台',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '云原生微服务框架',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '数据可视化引擎',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

const Demo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      columns={[
        { dataIndex: 'title', listSlot: 'title' },
        {
          listSlot: 'description',
          render: () => '面向企业级中后台的设计解决方案',
        },
        { dataIndex: 'avatar', listSlot: 'avatar' },
        {
          listSlot: 'content',
          render: () => (
            <div
              style={{
                width: '200px',
              }}
            >
              <div>发布中</div>
              <Progress percent={80} />
            </div>
          ),
        },
        {
          listSlot: 'actions',
          render: () => [
            <a key="init">邀请</a>,
            <Button key="publish" type="text">
              发布
            </Button>,
          ],
        },
      ]}
      rowKey="title"
      headerTitle="支持选中的列表"
      rowSelection={rowSelection}
      dataSource={dataSource}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
