import React, { useState, ReactText } from 'react';
import { Button, Progress, Tag } from 'antd';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import ProList from '@ant-design/pro-list';

const dataSource = ['语雀的天空', 'Ant Design', '蚂蚁金服体验科技', 'TechUI'];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };
  return (
    <>
      <ProList<string>
        actions={[
          <Button key="3" type="primary">
            新建
          </Button>,
        ]}
        rowKey="id"
        title="支持选中的列表"
        rowSelection={rowSelection}
        dataSource={dataSource}
        renderItem={(item) => ({
          title: item,
          subTitle: (
            <div>
              <Tag color="blue">Ant Design</Tag>
              <Tag
                color="#5BD8A6"
                style={{
                  marginRight: 8,
                }}
              >
                TechUI
              </Tag>
            </div>
          ),
          actions: [<a>邀请</a>],
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team',
          avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          children: (
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
        })}
      />
    </>
  );
};
