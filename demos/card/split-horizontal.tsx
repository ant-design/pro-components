import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard
      title="上下切分"
      direction="column"
      split="horizontal"
      variant="outlined"
    >
      <ProCard>本月访问量：2,345</ProCard>
      <ProCard>本年访问量：12,345</ProCard>
    </ProCard>
  </div>
);
