import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <StatisticCard
        title="Market Trend"
        tooltip="Market Description"
        style={{ maxWidth: 480 }}
        extra={<EllipsisOutlined />}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
            alt="Bar Chart"
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
