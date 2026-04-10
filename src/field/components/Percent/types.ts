import type { ReactNode } from 'react';

export type PercentPropInt = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  text?: number | string;
  precision?: number;
  showColor?: boolean;
  showSymbol?: boolean | ((value: any) => boolean);
  placeholder?: string;
};
