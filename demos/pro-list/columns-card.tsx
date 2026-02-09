/**
 * 卡片模式使用 columns + listSlot，actions 的 cardActionProps 控制渲染位置
 */
import { ProList } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';

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

const columns: ProColumns<DataItem>[] = [
  { dataIndex: 'title', listSlot: 'title' },
  { dataIndex: 'subTitle', listSlot: 'subTitle' },
  { dataIndex: 'avatar', listSlot: 'avatar' },
  { dataIndex: 'content', listSlot: 'content' },
  {
    listSlot: 'actions',
    cardActionProps: 'actions',
    render: () => [
      <a key="invite">邀请</a>,
      <a key="delete">删除</a>,
    ],
  },
];

export default () => (
  <div
    style={{
      backgroundColor: '#eee',
      margin: -24,
      padding: 24,
    }}
  >
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
