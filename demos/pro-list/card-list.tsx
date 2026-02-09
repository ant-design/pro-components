import { ProFormSwitch, ProList } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';
import { useState } from 'react';

const projectData = [
  {
    title: '智慧零售平台',
    tag: '核心项目',
    tagColor: '#108ee9',
    progress: 85,
    progressLabel: '开发中',
  },
  {
    title: 'Ant Design Pro',
    tag: '开源项目',
    tagColor: '#87d068',
    progress: 100,
    progressLabel: '已上线',
  },
  {
    title: '数据可视化引擎',
    tag: '创新孵化',
    tagColor: '#f50',
    progress: 60,
    progressLabel: '开发中',
  },
  {
    title: '云原生微服务框架',
    tag: '基础设施',
    tagColor: '#2db7f5',
    progress: 92,
    progressLabel: '测试中',
  },
  {
    title: '智能客服系统',
    tag: 'AI 应用',
    tagColor: '#722ed1',
    progress: 45,
    progressLabel: '开发中',
  },
  {
    title: '统一权限管理中心',
    tag: '基础设施',
    tagColor: '#2db7f5',
    progress: 100,
    progressLabel: '已上线',
  },
  {
    title: '实时数据仓库',
    tag: '大数据',
    tagColor: '#eb2f96',
    progress: 70,
    progressLabel: '开发中',
  },
  {
    title: 'DevOps 工具链',
    tag: '效能平台',
    tagColor: '#13c2c2',
    progress: 88,
    progressLabel: '灰度发布',
  },
];

const data = projectData.map((item) => ({
  title: item.title,
  subTitle: <Tag color={item.tagColor}>{item.tag}</Tag>,
  actions: [<a key="invite">邀请</a>, <a key="archive">归档</a>],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
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
        <div>{item.progressLabel}</div>
        <Progress percent={item.progress} />
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
      <ProFormSwitch
        label="幽灵模式"
        fieldProps={{
          checked: ghost,
          onChange: (e) => setGhost(e),
        }}
      />
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
        headerTitle="项目卡片列表"
        dataSource={data}
      />
    </div>
  );
};
