import type {
  CheckCardGroupProps,
  CheckCardProps,
} from './components/CheckCard';
import CheckCard from './components/CheckCard';
import type { StatisticProps } from './components/Statistic';
import Statistic from './components/Statistic';
import type {
  StatisticCardProps,
  StatisticsCardProps,
} from './components/StatisticCard';
import StatisticCard from './components/StatisticCard';
import type { ProCardProps } from './ProCard';
import ProCard from './ProCard';
import type { ProCardTabsProps } from './typing';

import 'antd/lib/card/style';

export { CheckCard, ProCard, Statistic, StatisticCard };
export type {
  CheckCardGroupProps,
  CheckCardProps,
  ProCardProps,
  ProCardTabsProps,
  StatisticCardProps,
  StatisticProps,
  StatisticsCardProps,
};

export default ProCard;
