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

// Group：显式布局容器（body padding: 0）；嵌套逻辑仍由 Card 处理。
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
