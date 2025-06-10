import { StatisticCard } from '../../../../components';

const { Operation } = StatisticCard;

export default () => {
  return (
    <StatisticCard.Group>
      <StatisticCard
        statistic={{
          title: 'Service Mesh Count',
          value: 500,
        }}
      />
      <Operation>=</Operation>
      <StatisticCard
        statistic={{
          title: 'Unpublished',
          value: 234,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: 'Publishing',
          value: 112,
        }}
      />
      <Operation>+</Operation>
      <StatisticCard
        statistic={{
          title: 'Published',
          value: 255,
        }}
      />
    </StatisticCard.Group>
  );
};
