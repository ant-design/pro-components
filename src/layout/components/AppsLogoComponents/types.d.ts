import type React from 'react';

export type AppItemProps = {
  title: React.ReactNode;
  desc?: React.ReactNode;
  icon?: React.ReactNode | (() => React.ReactNode);
  url?: string;
  target?: string;
  children?: Omit<AppItemProps, 'children'>[];
};

export type AppListProps = AppItemProps[];
