import { ProList } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Segmented, Slider, Switch, Tag } from 'antd';
import { useState } from 'react';

const apps = [
  {
    id: '1',
    name: 'Analytics Pro',
    category: '数据分析',
    description: '企业级数据分析平台，支持多维度数据分析和可视化展示',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    status: 'active',
    users: 1280,
  },
  {
    id: '2',
    name: 'Cloud Storage',
    category: '云存储',
    description: '安全可靠的企业云存储服务，支持文件同步和共享',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/youdaoyun.png',
    status: 'active',
    users: 3450,
  },
  {
    id: '3',
    name: 'Task Manager',
    category: '项目管理',
    description: '高效的任务和项目管理工具，支持团队协作和进度跟踪',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
    status: 'active',
    users: 2150,
  },
  {
    id: '4',
    name: 'Email Suite',
    category: '企业邮箱',
    description: '专业的企业邮件服务，支持大附件和邮件加密',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    status: 'beta',
    users: 890,
  },
  {
    id: '5',
    name: 'Video Conference',
    category: '视频会议',
    description: '高清视频会议系统，支持屏幕共享和实时字幕',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/youdaoyun.png',
    status: 'active',
    users: 5200,
  },
  {
    id: '6',
    name: 'HR System',
    category: '人力资源',
    description: '一体化人力资源管理系统，涵盖招聘、考勤、薪酬等',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
    status: 'active',
    users: 1560,
  },
  {
    id: '7',
    name: 'CRM Platform',
    category: '客户关系',
    description: '智能客户关系管理平台，助力销售业绩提升',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    status: 'active',
    users: 2890,
  },
  {
    id: '8',
    name: 'Finance Suite',
    category: '财务管理',
    description: '专业的财务管理系统，支持多币种和自动对账',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/youdaoyun.png',
    status: 'active',
    users: 1120,
  },
  {
    id: '9',
    name: 'Workflow Engine',
    category: '流程引擎',
    description: '灵活的工作流引擎，支持可视化流程设计',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
    status: 'beta',
    users: 670,
  },
  {
    id: '10',
    name: 'Knowledge Base',
    category: '知识库',
    description: '企业知识管理系统，支持全文检索和智能推荐',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    status: 'active',
    users: 1940,
  },
  {
    id: '11',
    name: 'Security Center',
    category: '安全中心',
    description: '企业安全管理中心，实时监控和威胁检测',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/youdaoyun.png',
    status: 'active',
    users: 780,
  },
  {
    id: '12',
    name: 'API Gateway',
    category: '接口网关',
    description: '统一的 API 网关服务，支持流量控制和监控',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
    status: 'beta',
    users: 450,
  },
];

const statusMap = {
  active: { text: '运行中', color: 'success' },
  beta: { text: '测试中', color: 'processing' },
};

const data = apps.map((app) => ({
  id: app.id,
  title: app.name,
  subTitle: <Tag color={statusMap[app.status].color}>{statusMap[app.status].text}</Tag>,
  actions: [
    <a key="view">打开</a>,
    <a key="settings">设置</a>,
  ],
  avatar: app.icon,
  content: (
    <div>
      <div>{app.description}</div>
      <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
        {app.category} • {app.users.toLocaleString()} 用户
      </div>
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
