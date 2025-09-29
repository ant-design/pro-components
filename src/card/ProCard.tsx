import type { PropsWithChildren } from 'react';
import Card from './components/Card';
import Divider from './components/Divider';

import type { CardProps, CardType } from './typing';

export type ProCardProps = CardProps;

export type ProCardType = CardType & {
  isProCard: boolean;
  Divider: typeof Divider;
  Group: typeof Group;
};

const Group = (props: PropsWithChildren<CardProps>) => <Card bodyStyle={{ padding: 0 }} {...props} />;

// 当前不对底层 Card 做封装，仅挂载子组件，直接导出
const ProCard = Card as ProCardType;

ProCard.isProCard = true;
ProCard.Divider = Divider;

ProCard.Group = Group;

export default ProCard;
