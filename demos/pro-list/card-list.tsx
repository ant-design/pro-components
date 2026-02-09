import { ProList } from '@ant-design/pro-components';
import { Card, Progress, Radio, Switch, Tag } from 'antd';
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
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div style={{ flex: 1 }}>
      <div style={{ width: 200 }}>
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default () => {
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>(
    'extra',
  );
  const [ghost, setGhost] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <Card
        title="配置选项"
        size="small"
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: '12px 16px' } }}
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>幽灵模式:</span>
            <Switch checked={ghost} onChange={setGhost} size="small" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>操作按钮位置:</span>
            <Radio.Group
              value={cardActionProps}
              onChange={(e) => setCardActionProps(e.target.value)}
              size="small"
            >
              <Radio.Button value="extra">Extra</Radio.Button>
              <Radio.Button value="actions">Actions</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </Card>

      <ProList<any>
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
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
        headerTitle="卡片列表展示"
        dataSource={data}
      />
    </div>
  );
};
