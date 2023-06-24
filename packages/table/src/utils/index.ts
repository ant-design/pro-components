import type { IntlType } from '@ant-design/pro-provider';
import type { UseEditableUtilType } from '@ant-design/pro-utils';
import type { TablePaginationConfig } from 'antd';
import type { SortOrder } from 'antd/lib/table/interface';
import type React from 'react';
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
export const checkUndefinedOrNull = (value: any) =>
  value !== undefined && value !== null;

/**
 * 合并用户 props 和 预设的 props
 *
 * @param pagination
 * @param action
 * @param intl
 */
export function mergePagination<T>(
  pagination: TablePaginationConfig | boolean | undefined,
  pageInfo: UseFetchDataAction<T>['pageInfo'] & {
    setPageInfo: any;
  },
  intl: IntlType,
): TablePaginationConfig | false | undefined {
  if (pagination === false) {
    return false;
  }
  const { total, current, pageSize, setPageInfo } = pageInfo;
  const defaultPagination: TablePaginationConfig =
    typeof pagination === 'object' ? pagination : {};

  return {
    showTotal: (all, range) =>
      `${intl.getMessage('pagination.total.range', '第')} ${range[0]}-${
        range[1]
      } ${intl.getMessage(
        'pagination.total.total',
        '条/总共',
      )} ${all} ${intl.getMessage('pagination.total.item', '条')}`,
    total,
    ...(defaultPagination as TablePaginationConfig),
    current:
      pagination !== true && pagination
        ? pagination.current ?? current
        : current,
    pageSize:
      pagination !== true && pagination
        ? pagination.pageSize ?? pageSize
        : pageSize,
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
        await action.setPageInfo({
          current: 1,
        });
      }
      await action?.reload();
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
export const genColumnKey = (
  key?: string | number,
  index?: number | string,
): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};

/**
 * 将 ProTable - column - dataIndex 转为字符串形式
 *
 * @param dataIndex Column 中的 dataIndex
 */
function parseDataIndex(
  dataIndex: ProColumnType['dataIndex'],
): string | undefined {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex?.toString();
}

/**
 * 从 ProColumns 数组中取出默认的排序和筛选数据
 *
 * @param columns ProColumns
 */
export function parseDefaultColumnConfig<T, Value>(
  columns: ProColumns<T, Value>[],
) {
  const filter: Record<string, (string | number)[] | null> = {};
  const sort: Record<string, SortOrder> = {};
  columns.forEach((column) => {
    // 转换 dataIndex
    const dataIndex = parseDataIndex(column.dataIndex);
    if (!dataIndex) {
      return;
    }
    // 当 column 启用 filters 功能时，取出默认的筛选值
    if (column.filters) {
      const defaultFilteredValue = column.defaultFilteredValue as (
        | string
        | number
      )[];
      if (defaultFilteredValue === undefined) {
        filter[dataIndex] = null;
      } else {
        filter[dataIndex] = column.defaultFilteredValue as (string | number)[];
      }
    }
    // 当 column 启用 sorter 功能时，取出默认的排序值
    if (column.sorter && column.defaultSortOrder) {
      sort[dataIndex] = column.defaultSortOrder!;
    }
  });
  return { sort, filter };
}
