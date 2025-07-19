import { Variant } from 'antd/lib/config-provider';

/**
 * 将 bordered 属性转换为 variant 属性
 * @deprecated 请直接使用 variant 属性
 * @param bordered
 * @returns
 */
export const compatibleBorder = (bordered?: boolean) => {
  return {
    variant: bordered === false ? 'borderless' : 'outlined',
  } as {
    variant: Variant;
  };
};
