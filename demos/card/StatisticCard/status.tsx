import { StatisticCard } from '@ant-design/pro-components';

const { Divider } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard.Group direction="column">
        <StatisticCard
          statistic={{
            title: 'All',
            tip: 'Help text',
            value: 10,
          }}
        />
        <Divider orientation="horizontal" />
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
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
