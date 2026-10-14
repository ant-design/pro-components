import { ProCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard title="左右切分" split="vertical" variant="outlined">
      <ProCard>昨日访问量：123</ProCard>
      <ProCard>今日访问量：234</ProCard>
    </ProCard>
  </div>
);
