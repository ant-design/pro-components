import { ProList } from '@ant-design/pro-components';
import { Button, Progress } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '语雀的天空',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '蚂蚁金服体验科技',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'TechUI',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
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
      metas={{
        title: {},
        description: {
          render: () => {
            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
          },
        },
        avatar: {},
        extra: {
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
        actions: {
          render: () => {
            return [<a key="init">邀请</a>, '发布'];
          },
        },
      }}
      rowKey="title"
      headerTitle="支持选中的列表"
      rowSelection={rowSelection}
      dataSource={dataSource}
    />
  );
};
