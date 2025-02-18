import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <>
      <StatisticCard style={{ width: 160 }}>
        <Statistic title="Daily Comparison" value="7.60%" trend="up" />
        <Statistic title="Weekly Comparison" value="7.60%" trend="down" />
        <Statistic title="Weekly Comparison" value="0.00%" />
      </StatisticCard>
    </>
  );
};
