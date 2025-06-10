import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components";
import { Space, theme } from 'antd';

const { Statistic } = StatisticCard;

export default () => {
  const { token } = theme.useToken();
  return (
    <StatisticCard
      title={
        <Space>
          <span>Department One</span>
          <RightOutlined style={{ color: token.colorTextHeading }} />
        </Space>
      }
      extra={<EllipsisOutlined />}
      statistic={{
        value: 1102893,
        prefix: '¥',
        description: (
          <Space>
            <Statistic title="Actual Completion" value="82.3%" />
            <Statistic title="Current Target" value="¥6000" />
          </Space>
        ),
      }}
      chart={
        <>
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg"
            alt="chart"
            width="100%"
          />
        </>
      }
      style={{ width: 268 }}
    />
  );
};
