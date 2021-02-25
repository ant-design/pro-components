import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import ProCard from '@ant-design/pro-card';
import type { ProCardProps } from '@ant-design/pro-card';
import classNames from 'classnames';
import Statistic from '../Statistic';
import type { StatisticProps } from '../Statistic';
import Divider from '../Divider';
import Operation from '../Operation';

import './index.less';

export type StatisticsCardProps = {
  /** 图表配置 */
  chart?: React.ReactNode;
  /** 数值统计配置 */
  statistic?: StatisticProps;
  /** Chart 相对于 statistic 的位置 */
  chartPlacement?: 'right' | 'bottom' | 'left';
  /** 底部额外展示区域 */
  footer?: React.ReactNode;
} & ProCardProps;

const StatisticsCard: React.FC<StatisticsCardProps> & {
  Statistic: typeof Statistic;
  Divider: typeof Divider;
  Operation: typeof Operation;
  isProCard: boolean;
  Group: typeof Group;
} = (props) => {
  const { children, statistic, className, chart, chartPlacement, footer, ...others } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-statistic-card');
  const classString = classNames(prefixCls, className);

  // 在 StatisticCard 中时默认为 vertical。
  const statisticDom = statistic && <Statistic layout="vertical" {...statistic} />;

  const chartCls = classNames(`${prefixCls}-chart`, {
    [`${prefixCls}-chart-left`]: chartPlacement === 'left' && chart && statistic,
    [`${prefixCls}-chart-right`]: chartPlacement === 'right' && chart && statistic,
  });

  const chartDom = chart && <div className={chartCls}>{chart}</div>;

  const contentCls = classNames(`${prefixCls}-content`, {
    [`${prefixCls}-content-horizontal`]: chartPlacement === 'left' || chartPlacement === 'right',
  });

  // 默认上下结构
  const contentDom =
    (chartDom || statisticDom) &&
    (chartPlacement === 'left' ? (
      <div className={contentCls}>
        {chartDom}
        {statisticDom}
      </div>
    ) : (
      <div className={contentCls}>
        {statisticDom}
        {chartDom}
      </div>
    ));

  const footerDom = footer && <div className={`${prefixCls}-footer`}>{footer}</div>;

  return (
    <ProCard className={classString} {...others}>
      {contentDom}
      {children}
      {footerDom}
    </ProCard>
  );
};

const Group: React.FC<StatisticsCardProps> = (props) => (
  <StatisticsCard bodyStyle={{ padding: 0 }} {...props} />
);

StatisticsCard.Statistic = Statistic;
StatisticsCard.Divider = Divider;
StatisticsCard.Operation = Operation;
StatisticsCard.isProCard = true;
StatisticsCard.Group = Group;

export default StatisticsCard;
