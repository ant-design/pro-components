/**
 * 卡片模式使用 columns + listSlot，推荐使用新的 columns API
 * actions 在卡片模式下默认渲染到 extra 位置
 */
import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Alert, Card, Progress, Radio, Tag } from 'antd';
import { useState } from 'react';

type DataItem = {
  title: string;
  subTitle: React.ReactNode;
  avatar: string;
  content: React.ReactNode;
};

const data: DataItem[] = [
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
  const [cardActionProps, setCardActionProps] = useState<'extra' | 'actions'>(
    'extra',
  );

  const columns: ProColumns<DataItem>[] = [
    { dataIndex: 'title', listSlot: 'title' },
    { dataIndex: 'subTitle', listSlot: 'subTitle' },
    { dataIndex: 'avatar', listSlot: 'avatar' },
    { dataIndex: 'content', listSlot: 'content' },
    {
      listSlot: 'actions',
      cardActionProps,
      render: () => [<a key="invite">邀请</a>, <a key="delete">删除</a>],
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <Alert
        title="推荐使用 columns + listSlot API"
        description="新的 columns API 与 ProTable 保持一致，通过 listSlot 指定数据在列表项中的位置。相比 metas API 更加灵活和易于维护。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Card
        title="配置选项"
        size="small"
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: '12px 16px' } }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>操作按钮位置 (cardActionProps):</span>
          <Radio.Group
            value={cardActionProps}
            onChange={(e) => setCardActionProps(e.target.value)}
            size="small"
          >
            <Radio.Button value="extra">
              Extra（卡片右上角，推荐）
            </Radio.Button>
            <Radio.Button value="actions">Actions（卡片底部）</Radio.Button>
          </Radio.Group>
        </div>
      </Card>

      <ProList<DataItem>
        pagination={{ defaultPageSize: 8, showSizeChanger: false }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        columns={columns}
        headerTitle="卡片列表（columns API）"
        dataSource={data}
      />
    </div>
  );
};
