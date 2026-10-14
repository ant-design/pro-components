import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => (
  <StatisticCard
    statistic={{ title: '累计收入', value: 620, suffix: '万元' }}
    footer={
      <Statistic
        title="本月收入"
        value={58}
        suffix="万元"
        layout="horizontal"
      />
    }
  />
);
