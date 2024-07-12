import { version } from 'antd';
import { Variant } from 'antd/es/config-provider';
import { compareVersions } from '../compareVersions';

/**
 * 兼容 antd 5.13.0 以下版本的 bordered 属性
 * @param bordered
 * @returns
 */
export const compatibleBorder = (bordered?: boolean) => {
  if (bordered === undefined) {
    return {};
  }
  return compareVersions(version, '5.13.0') <= 0
    ? { bordered }
    : ({
        variant: bordered ? undefined : 'borderless',
      } as {
        variant?: Variant;
      });
};
