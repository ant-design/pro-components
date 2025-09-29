import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@xxlabs/pro-components';
import { Button, Tag } from 'antd';
import React from 'react';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const dataSource = [
  {
    title: '语雀的天空',
  },
  {
    title: 'Ant Design',
  },
  {
    title: '蚂蚁金服体验科技',
  },
  {
    title: 'TechUI',
  },
];

export default () => {
  return (
    <ProList<{ title: string }>
      dataSource={dataSource}
      headerTitle="竖排样式"
      itemLayout="vertical"
      metas={{
        title: {},
        description: {
          render: () => (
            <>
              <Tag>语雀专栏</Tag>
              <Tag>设计语言</Tag>
              <Tag>蚂蚁金服</Tag>
            </>
          ),
        },
        actions: {
          render: () => [
            <IconText key="list-vertical-star-o" icon={StarOutlined} text="156" />,
            <IconText key="list-vertical-like-o" icon={LikeOutlined} text="156" />,
            <IconText key="list-vertical-message" icon={MessageOutlined} text="2" />,
          ],
        },
        extra: {
          render: () => (
            <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" width={272} />
          ),
        },
        content: {
          render: () => {
            return (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
              </div>
            );
          },
        },
      }}
      rowKey="id"
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
    />
  );
};
