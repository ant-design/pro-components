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

export type {
  ProCardTabsProps,
  ProCardProps,
  StatisticCardProps,
  StatisticsCardProps,
  CheckCardGroupProps,
  CheckCardProps,
  StatisticProps,
};
export { StatisticCard, Statistic, CheckCard, ProCard };

export default ProCard;
