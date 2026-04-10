import type { TreeSelectProps } from 'antd';

export type TreeSelectFieldProps = TreeSelectProps & {
  /**
   * 当搜索关键词发生变化时是否请求远程数据
   *
   * @default true
   */
  fetchDataOnSearch?: boolean;
};
