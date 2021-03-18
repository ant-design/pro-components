import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import Card from '../Card';
import type { CardProps } from '../../type';
import classNames from 'classnames';
import Statistic from '../Statistic';
import type { StatisticProps } from '../Statistic';
import Divider from '../Divider';
import Operation from '../Operation';

import './index.less';

export type StatisticCardProps = {
  /** 图表配置 */
  chart?: React.ReactNode;
  /** 数值统计配置 */
  statistic?: StatisticProps;
  /** Chart 相对于 statistic 的位置 */
  chartPlacement?: 'right' | 'bottom' | 'left';
  /** 底部额外展示区域 */
  footer?: React.ReactNode;
} & CardProps;

/** @deprecated */
export type StatisticsCardProps = StatisticCardProps;

const StatisticCard: React.FC<StatisticCardProps> & {
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
    <Card className={classString} {...others}>
      {contentDom}
      {children}
      {footerDom}
    </Card>
  );
};

const Group: React.FC<StatisticCardProps> = (props) => (
  <StatisticCard bodyStyle={{ padding: 0 }} {...props} />
);

StatisticCard.Statistic = Statistic;
StatisticCard.Divider = Divider;
StatisticCard.Operation = Operation;
StatisticCard.isProCard = true;
StatisticCard.Group = Group;

export default StatisticCard;
