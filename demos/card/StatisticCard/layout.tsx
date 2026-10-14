import { ProCard, StatisticCard } from '@ant-design/pro-components';

export default () => (
  <div style={{ padding: 16 }}>
    <ProCard
      title="访问量概览"
      direction="column"
      split="horizontal"
      variant="outlined"
    >
      <StatisticCard statistic={{ title: '昨日访问量', value: 234 }} />
      <StatisticCard statistic={{ title: '本月访问量', value: 5678 }} />
    </ProCard>
  </div>
);
