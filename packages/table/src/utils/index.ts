import React from 'react';
import type { TablePaginationConfig } from 'antd';
import { SortOrder } from 'antd/es/table/interface';

import type { UseEditableUtilType } from '@ant-design/pro-utils';
import type { IntlType } from '@ant-design/pro-provider';

import type {
  ActionType,
  Bordered,
  BorderedType,
  ProColumns,
  ProColumnType,
  UseFetchDataAction,
} from '../typing';

/**
 * 检查值是否存在 为了 避开 0 和 false
 *
 * @param value
 */
export const checkUndefinedOrNull = (value: any) => value !== undefined && value !== null;

/**
 * 合并用户 props 和 预设的 props
 *
 * @param pagination
 * @param action
 * @param intl
 */
export function mergePagination<T>(
  pagination: TablePaginationConfig | boolean | undefined = {},
  pageInfo: UseFetchDataAction<T>['pageInfo'] & {
    setPageInfo: any;
  },
  intl: IntlType,
): TablePaginationConfig | false | undefined {
  if (pagination === false) {
    return false;
  }
  const { total, current, pageSize, setPageInfo } = pageInfo;
  const defaultPagination: TablePaginationConfig = typeof pagination === 'object' ? pagination : {};

  return {
    showTotal: (all, range) =>
      `${intl.getMessage('pagination.total.range', '第')} ${range[0]}-${range[1]} ${intl.getMessage(
        'pagination.total.total',
        '条/总共',
      )} ${all} ${intl.getMessage('pagination.total.item', '条')}`,
    showSizeChanger: true,
    total,
    ...(defaultPagination as TablePaginationConfig),
    current,
    pageSize,
    onChange: (page: number, newPageSize?: number) => {
      const { onChange } = pagination as TablePaginationConfig;
      onChange?.(page, newPageSize || 20);
      // pageSize 改变之后就没必要切换页码
      if (newPageSize !== pageSize || current !== page) {
        setPageInfo({ pageSize: newPageSize, current: page });
      }
    },
  };
}

/**
 * 获取用户的 action 信息
 *
 * @param actionRef
 * @param counter
 * @param onCleanSelected
 */
export function useActionType<T>(
  ref: React.MutableRefObject<ActionType | undefined>,
  action: UseFetchDataAction<T>,
  props: {
    fullScreen: () => void;
    onCleanSelected: () => void;
    resetAll: () => void;
    editableUtils: UseEditableUtilType;
  },
) {
  /** 这里生成action的映射，保证 action 总是使用的最新 只需要渲染一次即可 */
  const userAction: ActionType = {
    ...props.editableUtils,
    pageInfo: action.pageInfo,
    reload: async (resetPageIndex?: boolean) => {
      // 如果为 true，回到第一页
      if (resetPageIndex) {
        await props.onCleanSelected();
      }
      action?.reload();
    },
    reloadAndRest: async () => {
      // reload 之后大概率会切换数据，清空一下选择。
      props.onCleanSelected();
      await action.setPageInfo({
        current: 1,
      });
      await action?.reload();
    },
    reset: async () => {
      await props.resetAll();
      await action?.reset?.();
      await action?.reload();
    },
    fullScreen: () => props.fullScreen(),
    clearSelected: () => props.onCleanSelected(),
    setPageInfo: (rest) => action.setPageInfo(rest),
  };
  // eslint-disable-next-line no-param-reassign
  ref.current = userAction;
}

type PostDataType<T> = (data: T) => T;

/**
 * 一个转化的 pipeline 列表
 *
 * @param data
 * @param pipeline
 */
export function postDataPipeline<T>(data: T, pipeline: PostDataType<T>[]) {
  if (pipeline.filter((item) => item).length < 1) {
    return data;
  }
  return pipeline.reduce((pre, postData) => {
    return postData(pre);
  }, data);
}

export const isBordered = (borderType: BorderedType, border?: Bordered) => {
  if (border === undefined) {
    return false;
  }
  // debugger
  if (typeof border === 'boolean') {
    return border;
  }
  return border[borderType];
};

export const isMergeCell = (
  dom: any, // 如果是合并单元格的，直接返回对象
) => dom && typeof dom === 'object' && dom?.props?.colSpan;

/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: React.ReactText | undefined, index?: number): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};

function parseDataIndex(dataIndex: ProColumnType['dataIndex']): string | undefined {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex?.toString();
}

export function parseDefaultSort<T, Value>(
  columns: ProColumns<T, Value>[],
): Record<string, SortOrder> {
  const defaultSort: Record<string, SortOrder> = {};
  columns
    .filter((column) => !!column.sorter && !!column.defaultSortOrder)
    .forEach((column) => {
      const dataIndex = parseDataIndex(column.dataIndex);
      if (dataIndex) {
        defaultSort[dataIndex] = column.defaultSortOrder!;
      }
    });
  return defaultSort;
}

export function parseDefaultFilter<T, Value>(
  columns: ProColumns<T, Value>[],
): Record<string, React.ReactText[]> {
  const defaultFilter: Record<string, React.ReactText[]> = {};
  columns
    .filter((column) => !!column.filters && !!column.defaultFilteredValue)
    .forEach((column) => {
      const dataIndex = parseDataIndex(column.dataIndex);
      if (dataIndex) {
        defaultFilter[dataIndex] = column.defaultFilteredValue as React.ReactText[];
      }
    });
  return defaultFilter;
}
