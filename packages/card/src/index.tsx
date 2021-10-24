import ProCard from './ProCard';
import type { ProCardProps } from './ProCard';
import StatisticCard from './components/StatisticCard';
import CheckCard from './components/CheckCard';
import Statistic from './components/Statistic';

import type { ProCardTabsProps } from './type';
import type { StatisticCardProps, StatisticsCardProps } from './components/StatisticCard';
import type { CheckCardGroupProps, CheckCardProps } from './components/CheckCard';
import type { StatisticProps } from './components/Statistic';

export type {
  ProCardTabsProps,
  ProCardProps,
  StatisticCardProps,
  StatisticsCardProps,
  CheckCardGroupProps,
  CheckCardProps,
  StatisticProps,
};

export { StatisticCard, Statistic, CheckCard };

export default ProCard;
