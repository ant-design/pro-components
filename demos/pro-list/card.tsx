import { ProList } from '@ant-design/pro-components';
import { Card, Progress, Radio, Switch, Tag } from 'antd';
import { useState } from 'react';

const projects = [
  { name: '企业官网重构', progress: 85, status: '进行中', team: '前端组', priority: 'high' },
  { name: '移动端 App 开发', progress: 60, status: '进行中', team: '移动组', priority: 'high' },
  { name: '数据可视化平台', progress: 92, status: '测试中', team: '数据组', priority: 'medium' },
  { name: '用户管理系统', progress: 45, status: '开发中', team: '后端组', priority: 'medium' },
  { name: 'CI/CD 流程优化', progress: 78, status: '进行中', team: 'DevOps', priority: 'low' },
  { name: '性能监控系统', progress: 30, status: '规划中', team: '运维组', priority: 'low' },
  { name: '微服务架构升级', progress: 55, status: '开发中', team: '架构组', priority: 'high' },
  { name: '设计系统建设', progress: 70, status: '进行中', team: '设计组', priority: 'medium' },
];

const priorityColor = {
  high: '#ff4d4f',
  medium: '#faad14',
  low: '#52c41a',
};

const data = projects.map((project, index) => ({
  id: index,
  title: project.name,
  subTitle: <Tag color={priorityColor[project.priority]}>{project.team}</Tag>,
  actions: [<a key="detail">详情</a>, <a key="edit">编辑</a>],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div style={{ flex: 1 }}>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>{project.status}</div>
        <Progress
          percent={project.progress}
          size="small"
          status={project.progress === 100 ? 'success' : 'active'}
        />
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
