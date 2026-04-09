import { ProDescriptions, ProDescriptionsItem } from '@ant-design/pro-components';
import { Button } from 'antd';

import { FIXED_BASE_DATE } from '../mockData';

const Demo = () => {
  return (
    <ProDescriptions
      column={2}
      title="订单详情"
      tooltip="展示订单的详细信息，包括金额、状态、日期等多种值类型"
    >
      <ProDescriptionsItem valueType="option">
        <Button key="primary" type="primary">
          提交审核
        </Button>
      </ProDescriptionsItem>
      <ProDescriptionsItem
        span={2}
        valueType="text"
        renderText={(_) => {
          return _ + _;
        }}
        ellipsis
        label="订单备注"
      >
        客户要求在一季度内完成全部部署上线工作，优先安排专属技术支持团队跟进对接，确保各环节顺利推进
      </ProDescriptionsItem>
      <ProDescriptionsItem
        label="合同金额"
        tooltip="仅供参考，以实际签约合同为准"
        valueType="money"
      >
        128000
      </ProDescriptionsItem>
      <ProDescriptionsItem label="完成进度" valueType="percent">
        75
      </ProDescriptionsItem>
      <ProDescriptionsItem
        label="订单状态"
        valueEnum={{
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
        }}
      >
        processing
      </ProDescriptionsItem>
      <ProDescriptionsItem
        label="付款方式"
        request={async () => [
          { label: '对公转账', value: 'bank' },
          { label: '支付宝', value: 'alipay' },
          { label: '微信支付', value: 'wechat' },
          { label: '信用卡', value: 'credit' },
        ]}
      >
        bank
      </ProDescriptionsItem>
      <ProDescriptionsItem label="交付进度" valueType="progress">
        75
      </ProDescriptionsItem>
      <ProDescriptionsItem label="下单时间" valueType="dateTime">
        {FIXED_BASE_DATE.valueOf()}
      </ProDescriptionsItem>
      <ProDescriptionsItem label="签约日期" valueType="date">
        {FIXED_BASE_DATE.valueOf()}
      </ProDescriptionsItem>
      <ProDescriptionsItem label="服务周期" valueType="dateTimeRange">
        {[FIXED_BASE_DATE.valueOf(), FIXED_BASE_DATE.add(365, 'd').valueOf()]}
      </ProDescriptionsItem>
      <ProDescriptionsItem label="创建时间" valueType="time">
        {FIXED_BASE_DATE.valueOf()}
      </ProDescriptionsItem>
      <ProDescriptionsItem label="部署脚本" valueType="code">
        {`
pnpm install
pnpm run build
pnpm run deploy --env production
        `}
      </ProDescriptionsItem>
      <ProDescriptionsItem label="服务配置" valueType="jsonCode">
        {`{
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
}`}
      </ProDescriptionsItem>
    </ProDescriptions>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
