import React from 'react';
import { Button, Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, EllipsisOutlined } from '@ant-design/icons';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import ProList from '@ant-design/pro-list';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const dataSource = [
  {
    title: '分组标题',
    children: [
      { title: '语雀的天空' },
      { title: 'Ant Design' },
      { title: '蚂蚁金服体验科技' },
      { title: 'TechUI' },
    ],
  },
];

export default () => {
  return (
    <>
      <ProList<{
        title: string;
        children: {
          title: string;
        }[];
      }>
        actions={[
          <Button key="3" type="primary">
            新建
          </Button>,
        ]}
        itemLayout="vertical"
        rowKey="id"
        title="复杂的例子"
        dataSource={dataSource}
        renderItem={(item) => {
          if (item.children) {
            return {
              title: '分组标题',
              actions: [
                <a>邀请</a>,
                <a>操作</a>,
                <a>
                  <EllipsisOutlined />
                </a>,
              ],
            };
          }
          return {
            title: item.title,
            actions: [
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ],
            description: (
              <>
                <Tag>语雀专栏</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </>
            ),
            extra: (
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            ),
            // avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
            children: (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
              </div>
            ),
          };
        }}
      />
    </>
  );
};
