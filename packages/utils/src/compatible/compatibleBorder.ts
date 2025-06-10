import { Variant } from 'antd/lib/config-provider';

/**
 * 兼容 antd 5.13.0 以下版本的 bordered 属性
 * @param bordered
 * @returns
 */
export const compatibleBorder = (bordered?: boolean) => {
  if (bordered === undefined) {
    return {};
  }
  return {
    variant: bordered ? undefined : 'borderless',
  } as {
    variant?: Variant;
  };
};
