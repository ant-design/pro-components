import { LoadingOutlined } from '@ant-design/icons';
import { version } from 'antd';
import React from 'react';

/** antd 6.7 deprecated Cascader `suffixIcon` in favor of `suffix`. */
export const isAntdAtLeast = (
  current: string,
  major: number,
  minor: number,
): boolean => {
  const [curMajor = 0, curMinor = 0] = (current || '')
    .split('.')
    .map((part) => parseInt(part, 10) || 0);
  return curMajor > major || (curMajor === major && curMinor >= minor);
};

/**
 * Props that show the loading icon in the Cascader suffix slot.
 * Returns an empty object when idle so antd keeps its default arrow.
 */
export const getCascaderLoadingSuffixProps = (
  loading: boolean,
): Record<string, React.ReactNode> => {
  if (!loading) return {};
  return isAntdAtLeast(version, 6, 7)
    ? { suffix: <LoadingOutlined /> }
    : { suffixIcon: <LoadingOutlined /> };
};
