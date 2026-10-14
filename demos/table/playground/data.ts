import type { ProColumns } from '@ant-design/pro-components';

export type Row = {
  id: number;
  name: string;
  status: 'running' | 'closed';
  description: string;
};

export const rows: Row[] = [
  {
    id: 1,
    name: '用户认证服务',
    status: 'running',
    description: '提供用户登录与权限验证',
  },
  {
    id: 2,
    name: '支付网关',
    status: 'closed',
    description: '处理订单支付与对账',
  },
  {
    id: 3,
    name: '订单中心',
    status: 'running',
    description: '处理订单创建与查询',
  },
  { id: 4, name: '消息服务', status: 'running', description: '发送通知和提醒' },
];

export const columns: ProColumns<Row>[] = [
  { title: '服务', dataIndex: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: { running: '运行中', closed: '已关闭' },
  },
];
