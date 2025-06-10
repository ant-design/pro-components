import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <StatisticCard
      title="整体流量评分"
      extra={<EllipsisOutlined />}
      statistic={{
        value: 86.2,
        suffix: '分',
        description: <Statistic title="排名前" value="20%" />,
      }}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
          width="100%"
          alt="进度条"
        />
      }
      footer={
        <>
          <Statistic
            value={15.1}
            title="累计注册数"
            suffix="万"
            layout="horizontal"
          />
          <Statistic
            value={15.1}
            title="本月注册数"
            suffix="万"
            layout="horizontal"
          />
        </>
      }
      style={{ width: 250 }}
    />
  );
};
