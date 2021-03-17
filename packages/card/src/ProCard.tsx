import React from 'react';
import type { PropsWithChildren } from 'react';
import Card from './components/Card';
import TabPane from './components/TabPane';
import Divider from './components/Divider';
import type { CardType, CardProps } from './type';

export type ProCardProps = CardProps;

export type ProCardType = CardType & {
  isProCard: boolean;
  Divider: typeof Divider;
  TabPane: typeof TabPane;
  Group: typeof Group;
};

const Group = (props: PropsWithChildren<CardProps>) => (
  <Card bodyStyle={{ padding: 0 }} {...props} />
);

// 当前不对底层 Card 做封装，仅挂载子组件，直接导出
// @ts-ignore
const ProCard: ProCardType = Card;

ProCard.isProCard = true;
ProCard.Divider = Divider;
ProCard.TabPane = TabPane;
ProCard.Group = Group;

export default ProCard;
