import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';

import { FIXED_BASE_DATE } from '../mockData';

const Demo = () => {
  return (
    <ProDescriptions
      column={2}
      title="订单详情"
      tooltip="展示订单的详细信息，包括金额、状态、日期等多种值类型"
      columns={[
        {
          valueType: 'option',
          render: () => [
            <Button key="primary" type="primary">
              提交审核
            </Button>,
          ],
        },
        {
          span: 2,
          valueType: 'text',
          renderText: (_) => {
            return _ + _;
          },
          ellipsis: true,
          label: '订单备注',
          children:
            '客户要求在一季度内完成全部部署上线工作，优先安排专属技术支持团队跟进对接，确保各环节顺利推进',
        },
        {
          label: '合同金额',
          tooltip: '仅供参考，以实际签约合同为准',
          valueType: 'money',
          children: 128000,
        },
        {
          label: '完成进度',
          valueType: 'percent',
          children: 75,
        },
        {
          label: '订单状态',
          valueEnum: {
            all: { text: '全部', status: 'Default' },
            pending: {
              text: '待审核',
              status: 'Warning',
            },
            processing: {
              text: '处理中',
              status: 'Processing',
            },
            completed: {
              text: '已完成',
              status: 'Success',
            },
            rejected: {
              text: '已驳回',
              status: 'Error',
            },
          },
          children: 'processing',
        },
        {
          label: '付款方式',
          request: async () => [
            { label: '对公转账', value: 'bank' },
            { label: '支付宝', value: 'alipay' },
            { label: '微信支付', value: 'wechat' },
            { label: '信用卡', value: 'credit' },
          ],
          children: 'bank',
        },
        {
          label: '交付进度',
          valueType: 'progress',
          children: 75,
        },
        {
          label: '下单时间',
          valueType: 'dateTime',
          children: FIXED_BASE_DATE.valueOf(),
        },
        {
          label: '签约日期',
          valueType: 'date',
          children: FIXED_BASE_DATE.valueOf(),
        },
        {
          label: '服务周期',
          valueType: 'dateTimeRange',
          children: [
            FIXED_BASE_DATE.valueOf(),
            FIXED_BASE_DATE.add(365, 'd').valueOf(),
          ],
        },
        {
          label: '创建时间',
          valueType: 'time',
          children: FIXED_BASE_DATE.valueOf(),
        },
        {
          label: '部署脚本',
          valueType: 'code',
          children: `
pnpm install
pnpm run build
pnpm run deploy --env production
        `,
        },
        {
          label: '服务配置',
          valueType: 'jsonCode',
          children: `{
  "service": {
    "name": "user-auth-service",
    "port": 8080,
    "replicas": 3,
    "healthCheck": "/api/health",
    "env": "production",
    "resources": {
      "cpu": "500m",
      "memory": "512Mi"
    }
  }
}`,
        },
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
