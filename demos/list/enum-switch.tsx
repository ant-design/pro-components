import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Segmented, Space, Tag } from 'antd';
import { useState } from 'react';

type ProjectItem = {
  title: string;
  avatar: string;
  description: string;
  progress: number;
  status: string;
};

const dataSource: ProjectItem[] = [
  {
    title: '智慧零售平台',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '面向线下门店的数字化经营解决方案',
    progress: 85,
    status: '开发中',
  },
  {
    title: 'Ant Design Pro',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '开箱即用的中台前端解决方案',
    progress: 100,
    status: '已上线',
  },
  {
    title: '云原生微服务框架',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '基于 K8s 的微服务开发与治理框架',
    progress: 92,
    status: '测试中',
  },
  {
    title: '数据可视化引擎',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '企业级数据看板与图表分析工具',
    progress: 60,
    status: '开发中',
  },
];

const Demo = () => {
  const [itemLayout, setItemLayout] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [variant, setVariant] = useState<'outlined' | 'borderless' | 'filled'>(
    'borderless',
  );
  const [split, setSplit] = useState(true);

  return (
    <div
      style={{
        background: '#ddd',
        padding: 24,
      }}
    >
      <Space
        orientation="vertical"
        size={12}
        style={{
          width: '100%',
          marginBlockEnd: 16,
          padding: 16,
          background: '#ddd',
          border: '1px solid #f0f0f0',
          borderRadius: 8,
        }}
      >
        <Space>
          <span>itemLayout 列表项方向：</span>
          <Segmented
            value={itemLayout}
            onChange={(v) => setItemLayout(v as any)}
            options={[
              { label: '水平 horizontal', value: 'horizontal' },
              { label: '垂直 vertical', value: 'vertical' },
            ]}
          />
        </Space>
        <Space>
          <span>variant 外观变体：</span>
          <Segmented
            value={variant}
            onChange={(v) => setVariant(v as any)}
            options={[
              { label: '线框 outlined', value: 'outlined' },
              { label: '填充 filled', value: 'filled' },
              { label: '无边框 borderless', value: 'borderless' },
            ]}
          />
        </Space>
        <Space>
          <span>split 分割线：</span>
          <Segmented
            value={split ? 'true' : 'false'}
            onChange={(v) => setSplit(v === 'true')}
            options={[
              { label: '有分割线', value: 'true' },
              { label: '无分割线', value: 'false' },
            ]}
          />
        </Space>
      </Space>

      <ProList<ProjectItem>
        headerTitle="项目列表枚举切换"
        itemLayout={itemLayout}
        variant={variant}
        split={split}
        dataSource={dataSource}
        rowKey="title"
        toolBarRender={() => [
          <Button key="new" type="primary">
            新建项目
          </Button>,
        ]}
        columns={[
          { dataIndex: 'title', listSlot: 'title' },
          { dataIndex: 'avatar', listSlot: 'avatar' },
          { dataIndex: 'description', listSlot: 'description' },
          {
            listSlot: 'content',
            render: (_, record) => (
              <div style={{ width: 200 }}>
                <div>
                  {record.status}{' '}
                  <Tag
                    color={record.progress === 100 ? 'success' : 'processing'}
                  >
                    {record.progress}%
                  </Tag>
                </div>
                <Progress percent={record.progress} showInfo={false} />
              </div>
            ),
          },
          {
            listSlot: 'actions',
            render: () => [
              <a key="view">查看</a>,
              <a key="edit">编辑</a>,
              <a key="archive">归档</a>,
            ],
          },
        ]}
      />
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
