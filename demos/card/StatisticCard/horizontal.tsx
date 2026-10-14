import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard
        chartPlacement="right"
        statistic={{
          title: 'Frozen Amount',
          value: 112893,
          precision: 2,
          suffix: 'Yuan',
          description: (
            <>
              <Statistic title="Weekly Comparison" value="6.47%" trend="up" />
              <Statistic
                title="Monthly Comparison"
                value="6.47%"
                trend="down"
              />
            </>
          ),
        }}
        style={{ width: '100%', maxWidth: 584 }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
            alt="Line Chart"
            width="100%"
          />
        }
      />
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
