import React from 'react';
import Card from './components/Card';
import Divider from './components/Divider';

import type { CardProps, CardType } from './typing';

export type ProCardProps = CardProps;

export type ProCardType = CardType & {
  isProCard: boolean;
  Divider: typeof Divider;
  Group: typeof Group;
};

// 用 forwardRef 透传 ref，避免用户用 <ProCard.Group ref={...}> 时 ref 丢失。
// 底层 Card 本身就是 forwardRef，这里保持一致。
const Group = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { styles, ...rest } = props;
  return (
    <Card
      {...rest}
      ref={ref}
      styles={{
        ...styles,
        body: { ...styles?.body, padding: 0 },
      }}
    />
  );
});
Group.displayName = 'ProCard.Group';

// 当前不对底层 Card 做封装，仅挂载子组件，直接导出
const ProCard = Card as ProCardType;

ProCard.isProCard = true;
ProCard.Divider = Divider;

ProCard.Group = Group;

export default ProCard;
