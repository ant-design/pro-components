import { ProList } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Segmented, Slider, Switch, Tag } from 'antd';
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
  const [bordered, setBordered] = useState<boolean>(true);
  const [ghost, setGhost] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<'hover' | 'always'>('hover');

  return (
    <div style={{ padding: 24, backgroundColor: '#f5f5f5' }}>
      <Alert
        title="Grid 布局配置"
        description="ProList 使用 CSS Grid 实现网格布局，支持自定义列数和间距。通过 grid 属性配置，可以实现响应式的卡片网格布局。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card title="配置面板" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>
                列数 (column): {column}
              </div>
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
          </Col>

          <Col xs={24} md={12}>
            <div>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>
                间距 (gutter): {gutter}px
              </div>
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
          </Col>

          <Col xs={24} md={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 500 }}>显示边框:</span>
              <Switch checked={bordered} onChange={setBordered} />
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 500 }}>幽灵模式:</span>
              <Switch checked={ghost} onChange={setGhost} />
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 500 }}>操作按钮:</span>
              <Segmented
                value={showActions}
                onChange={setShowActions}
                options={[
                  { label: '悬停显示', value: 'hover' },
                  { label: '始终显示', value: 'always' },
                ]}
              />
            </div>
          </Col>
        </Row>

        <Alert
          title="代码示例"
          description={
            <pre style={{ margin: 0, fontSize: 12 }}>
              {`<ProList
  grid={{ gutter: ${gutter}, column: ${column} }}
  itemCardProps={{ bordered: ${bordered}, ghost: ${ghost} }}
  showActions="${showActions}"
  ...
/>`}
            </pre>
          }
          type="success"
          style={{ marginTop: 24 }}
        />
      </Card>

      <ProList<any>
        grid={{ gutter, column }}
        itemCardProps={{
          bordered,
          ghost,
        }}
        ghost={ghost}
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: true,
          pageSizeOptions: ['6', '12', '18', '24'],
        }}
        showActions={showActions}
        metas={{
          title: {},
          subTitle: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps: 'extra',
          },
        }}
        headerTitle="Grid 布局示例"
        tooltip="使用 CSS Grid 实现的响应式卡片布局"
        dataSource={data}
      />
    </div>
  );
};
