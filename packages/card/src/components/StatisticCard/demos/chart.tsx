import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

export default () => {
  return (
    <StatisticCard
      title="大盘趋势"
      tooltip="大盘说明"
      style={{ maxWidth: 480 }}
      extra={<EllipsisOutlined />}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
          alt="柱状图"
          width="100%"
        />
      }
    />
  );
};
