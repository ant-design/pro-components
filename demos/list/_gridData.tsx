import type { ProColumns } from '@ant-design/pro-components';

type AppItem = { id: string; title: string; content: string };

export const gridData: AppItem[] = [
  { id: '1', title: '数据分析', content: '查看业务指标和报表' },
  { id: '2', title: '任务管理', content: '跟踪项目进度' },
  { id: '3', title: '知识库', content: '整理团队文档' },
  { id: '4', title: '客户管理', content: '维护客户资料' },
];

export const gridColumns: ProColumns<AppItem>[] = [
  { dataIndex: 'title', listSlot: 'title' },
  { dataIndex: 'content', listSlot: 'content' },
];
