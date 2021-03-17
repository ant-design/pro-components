import React from 'react';
import type { PropsWithChildren } from 'react';
import Card from './components/Card';
import TabPane from './components/TabPane';
import Divider from './components/Divider';
import type { CardProps } from './type';

export type ProCardProps = React.ForwardRefExoticComponent<CardProps> & {
  isProCard: boolean;
  Divider: typeof Divider;
  TabPane: typeof TabPane;
  Group: typeof Group;
};

const Group = (props: PropsWithChildren<ProCardProps>) => (
  <Card bodyStyle={{ padding: 0 }} {...props} />
);

// @ts-ignore
const ProCard: ProCardProps = Card;

ProCard.isProCard = true;
ProCard.Divider = Divider;
ProCard.TabPane = TabPane;
ProCard.Group = Group;

export default ProCard as ProCardProps;
