import type { ReactNode } from 'react';

/** 用于配置 ValueEnum 的通用配置 */
export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: ReactNode;
  /** @name 预定的颜色 */
  status?: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

export type ProSchemaValueEnumMap = Map<
  string | number | boolean,
  ProSchemaValueEnumType | ReactNode
>;

export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType | ReactNode
>;
