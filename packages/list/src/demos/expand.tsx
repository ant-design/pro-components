import React, { useState, ReactText } from 'react';
import { Button, Progress, Tag, Space } from 'antd';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import ProList from '@ant-design/pro-list';

const dataSource = ['语雀的天空', 'Ant Design', '蚂蚁金服体验科技', 'TechUI'];

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);

  return (
    <>
      <ProList<string>
        actions={[
          <Button key="3" type="primary">
            新建
          </Button>,
        ]}
        rowKey="id"
        title="支持展开的列表"
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        dataSource={dataSource}
        renderItem={(item) => ({
          title: item,
          subTitle: (
            <Space size={0}>
              <Tag color="blue">Ant Design</Tag>
              <Tag color="#5BD8A6">TechUI</Tag>
            </Space>
          ),
          actions: [<a>邀请</a>],
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team',
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          children: (
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
        })}
      />
    </>
  );
};
