import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import type { CardProps } from '../../typing';
import Card from '../Card';
import Divider from '../Divider';
import Operation from '../Operation';
import type { StatisticProps } from '../Statistic';
import Statistic from '../Statistic';
import { useStyle } from './style';

import 'antd/lib/divider/style';
import 'antd/lib/statistic/style';

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
  const {
    children,
    statistic,
    className,
    chart,
    chartPlacement,
    footer,
    ...others
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-statistic-card');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const classString = classNames(prefixCls, className, hashId);

  // 在 StatisticCard 中时默认为 vertical。
  const statisticDom = statistic && (
    <Statistic layout="vertical" {...statistic} />
  );

  const chartCls = classNames(`${prefixCls}-chart`, hashId, {
    [`${prefixCls}-chart-left`]:
      chartPlacement === 'left' && chart && statistic,
    [`${prefixCls}-chart-right`]:
      chartPlacement === 'right' && chart && statistic,
  });

  const chartDom = chart && <div className={chartCls}>{chart}</div>;

  const contentCls = classNames(`${prefixCls}-content `, hashId, {
    [`${prefixCls}-content-horizontal`]:
      chartPlacement === 'left' || chartPlacement === 'right',
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

  const footerDom = footer && (
    <div className={`${prefixCls}-footer ${hashId}`.trim()}>{footer}</div>
  );

  return wrapSSR(
    <Card className={classString} {...others}>
      {contentDom}
      {children}
      {footerDom}
    </Card>,
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
