import classnames from 'classnames';
import type { CSSProperties } from 'react';
import { omitUndefined } from '../../../utils';

/** 与 ProForm 字段预设宽度 token 一致（px） */
export const WARP_FIELD_WIDTH_SIZE_ENUM = {
  xs: 104,
  s: 216,
  sm: 216,
  m: 328,
  md: 328,
  l: 440,
  lg: 440,
  xl: 552,
} as const;

export type WarpFieldWidthToken = keyof typeof WARP_FIELD_WIDTH_SIZE_ENUM;

/** 不参与自动宽度的 valueType */
export const WARP_FIELD_IGNORE_WIDTH_VALUE_TYPES = [
  'switch',
  'radioButton',
  'radio',
  'rate',
] as const;

export function isWarpFieldIgnoreWidth(
  valueType: unknown,
  ignoreWidth?: boolean,
): boolean {
  return (
    !!ignoreWidth ||
    WARP_FIELD_IGNORE_WIDTH_VALUE_TYPES.includes(valueType as any)
  );
}

export function resolveWarpFieldStyle(options: {
  width: unknown;
  grid?: boolean;
  isIgnoreWidth: boolean;
  fieldStyle?: CSSProperties & Record<string, any>;
}): Record<string, any> {
  const { width, grid, isIgnoreWidth, fieldStyle } = options;
  const newStyle: Record<string, any> = {
    width:
      width && !WARP_FIELD_WIDTH_SIZE_ENUM[width as WarpFieldWidthToken]
        ? width
        : grid
          ? '100%'
          : undefined,
    ...fieldStyle,
  };

  if (isIgnoreWidth) Reflect.deleteProperty(newStyle, 'width');

  return omitUndefined(newStyle);
}

export function resolveWarpFieldClassName(options: {
  width: unknown;
  fieldClassName?: string;
  isIgnoreWidth: boolean;
}): string | undefined {
  const { width, fieldClassName, isIgnoreWidth } = options;
  const isSizeEnum =
    width && WARP_FIELD_WIDTH_SIZE_ENUM[width as WarpFieldWidthToken];
  return (
    classnames(fieldClassName, {
      'pro-field': isSizeEnum,
      [`pro-field-${width}`]: isSizeEnum && !isIgnoreWidth,
    }) || undefined
  );
}
