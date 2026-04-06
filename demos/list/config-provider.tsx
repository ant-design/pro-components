import { ProList } from '@ant-design/pro-components';
import { ConfigProvider, Progress } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '智慧零售平台',
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
    <ConfigProvider prefixCls="qixian">
      <ProList<{ title: string }>
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
                  minWidth: 200,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '200px',
                  }}
                >
                  <div>发布中</div>
                  <Progress percent={80} />
                </div>
              </div>
            ),
          },
          {
            listSlot: 'actions',
            render: () => [<a key="init">邀请</a>, '发布'],
          },
        ]}
        rowKey="title"
        headerTitle="支持选中的列表"
        rowSelection={rowSelection}
        dataSource={dataSource}
      />
    </ConfigProvider>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
