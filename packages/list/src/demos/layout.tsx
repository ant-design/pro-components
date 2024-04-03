import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
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
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="竖排样式"
      dataSource={dataSource}
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
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ],
        },
        extra: {
          render: () => (
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
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
    />
  );
};
