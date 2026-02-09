import { ProList } from '@ant-design/pro-components';
import { Slider, Space, Tag, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
  'ProComponents',
  'ProLayout',
  'ProTable',
  'ProForm',
].map((item, index) => ({
  id: index,
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a key="view">查看</a>, <a key="edit">编辑</a>],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div>
      <div>这是一个示例卡片的内容区域</div>
      <div style={{ color: '#999', fontSize: 12 }}>可以自定义显示任何内容</div>
    </div>
  ),
}));

export default () => {
  const [column, setColumn] = useState<number>(3);
  const [gutter, setGutter] = useState<number>(16);

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        padding: 24,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: 24,
          marginBottom: 24,
          borderRadius: 8,
        }}
      >
        <Title level={5}>Grid 配置</Title>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong>列数 (column): {column}</Text>
            <Slider
              min={1}
              max={6}
              value={column}
              onChange={setColumn}
              marks={{
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
              }}
            />
          </div>
          <div>
            <Text strong>间距 (gutter): {gutter}px</Text>
            <Slider
              min={0}
              max={48}
              step={4}
              value={gutter}
              onChange={setGutter}
              marks={{
                0: '0',
                8: '8',
                16: '16',
                24: '24',
                32: '32',
                48: '48',
              }}
            />
          </div>
        </Space>
      </div>

      <ProList<any>
        grid={{ gutter, column }}
        itemCardProps={{
          bordered: true,
        }}
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: true,
          pageSizeOptions: ['6', '12', '18', '24'],
        }}
        showActions="hover"
        metas={{
          title: {},
          subTitle: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        headerTitle="Grid 布局配置示例"
        tooltip="可以通过调整上方的滑块来改变列数和间距"
        dataSource={data}
      />
    </div>
  );
};
