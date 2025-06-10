import { StatisticCard } from '../../../../components';

const { Divider } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: 'All',
          tip: 'Help text',
          value: 10,
        }}
      />
      <Divider />
      <StatisticCard
        statistic={{
          title: 'Unpublished',
          value: 5,
          status: 'default',
        }}
      />
      <StatisticCard
        statistic={{
          title: 'Publishing',
          value: 3,
          status: 'processing',
        }}
      />
      <StatisticCard
        statistic={{
          title: 'Publishing Error',
          value: 2,
          status: 'error',
        }}
      />
      <StatisticCard
        statistic={{
          title: 'Published Successfully',
          value: '-',
          status: 'success',
        }}
      />
    </StatisticCard.Group>
  );
};
