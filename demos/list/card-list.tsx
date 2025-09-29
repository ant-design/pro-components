import { ProFormRadio, ProFormSwitch, ProList } from '@xxlabs/pro-components';
import { Progress, Tag } from 'antd';
import { useState } from 'react';

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
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

export default () => {
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>('extra');

  const [ghost, setGhost] = useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <ProFormRadio.Group
        fieldProps={{
          value: cardActionProps,
          onChange: (e) => setCardActionProps(e.target.value),
        }}
        label="actions 放置的地方"
        options={[
          {
            label: '设置为 action',
            value: 'actions',
          },
          {
            label: '设置为 extra',
            value: 'extra',
          },
        ]}
      />
      <ProFormSwitch
        fieldProps={{
          checked: ghost,
          onChange: (e) => setGhost(e),
        }}
        label="幽灵模式"
      />
      <ProList<any>
        dataSource={data}
        ghost={ghost}
        grid={{ gutter: 16, column: 2 }}
        headerTitle="卡片列表展示"
        itemCardProps={{
          ghost,
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps,
          },
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        rowSelection={{}}
        showActions="hover"
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
      />
    </div>
  );
};
