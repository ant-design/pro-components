import React from 'react';
import ProCard, { ProCardProps } from '@ant-design/pro-card';
import classNames from 'classnames';
import getPrefixCls from '../_util/getPrefixCls';
import TechStatistic, { TechStatisticProps } from './Statistic';
import Divider from './Divider';
import Operation from './Operation';

import './style/index.less';

export type StatisticsCardProps = {
  /**
   * @description 图表配置
   */
  chart?: React.ReactNode;
  /**
   * @description 数值统计配置
   */
  statistic?: TechStatisticProps;
  /**
   * @description chart 相对于 statistic 的位置
   */
  chartPlacement?: 'right' | 'bottom' | 'left';
  /**
   * @description 底部额外展示区域
   */
  footer?: React.ReactNode;
} & ProCardProps;

export type StatisticProps = TechStatisticProps;

const StatisticsCard: React.FC<StatisticsCardProps> & {
  Statistic: typeof TechStatistic;
  Divider: typeof Divider;
  Operation: typeof Operation;
  isProCard: boolean;
  Group: typeof Group;
} = (props) => {
  const { children, statistic, className, chart, chartPlacement, footer, ...others } = props;
  const prefixCls = getPrefixCls('statistic-card');
  const classString = classNames(prefixCls, className);

  // 在 StatisticCard 中时默认为 vertical。
  const statisticDom = statistic && <TechStatistic layout="vertical" {...statistic} />;

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

StatisticsCard.Statistic = TechStatistic;
StatisticsCard.Divider = Divider;
StatisticsCard.Operation = Operation;
StatisticsCard.isProCard = true;
StatisticsCard.Group = Group;

export default StatisticsCard;
