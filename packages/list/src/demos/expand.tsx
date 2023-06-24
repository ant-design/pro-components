import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Space, Tag } from 'antd';
import type { ReactText } from 'react';
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
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    [],
  );

  return (
    <ProList<{ title: string }>
      rowKey="title"
      headerTitle="支持展开的列表"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
      dataSource={dataSource}
      metas={{
        title: {},
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        description: {
          render: () => {
            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
          },
        },
        avatar: {},
        content: {
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
            return <a key="invite">邀请</a>;
          },
        },
      }}
    />
  );
};
