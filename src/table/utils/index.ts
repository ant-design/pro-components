import type { TablePaginationConfig } from 'antd';
import type { FilterValue as AntFilterValue, SorterResult, SortOrder } from 'antd/lib/table/interface';
import type React from 'react';
import { Key } from 'react';
import type { IntlType } from '../../provider';
import type { UseEditableUtilType } from '../../utils';
import type {
  ActionType,
  Bordered,
  BorderedType,
  FilterValue,
  ProColumns,
  ProColumnType,
  ProSorter,
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
        ? (pagination.current ?? current)
        : current,
    pageSize:
      pagination !== true && pagination
        ? (pagination.pageSize ?? pageSize)
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
  key?: string | number | Key,
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
export const parseDataIndex = (
  dataIndex: ProColumnType['dataIndex'],
): string | undefined => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join(',');
  }
  return dataIndex?.toString();
}

/**
 * 平铺所有columns, 用于判断是用的是本地筛选/排序
 * @param data 列配置
 * @returns 平铺后的列配置
 */
export const flattenColumns = (data: any[]) => {
  const _columns: any[] = [];

  for (let i = 0; i < data.length; i++) {
    const _curItem = data[i];
    if (_curItem.children) {
      flattenColumns(_curItem.children);
    } else {
      _columns.push(_curItem);
    }
  }

  return _columns
};

/**
 * 判断是否为本地筛选
 * @param filters 筛选配置
 * @param onFilter 筛选函数
 * @returns 是否为本地筛选
 */
export const isLocaleFilter = <T>(filters: ProColumnType<T>['filters'], onFilter: ProColumnType<T>['onFilter']) => {
  return !!filters && !!onFilter;
}

/**
 * 判断是否为本地排序
 * @param sorter 排序配置
 * @returns 是否为本地排序
 */
export const isLocaleSorter = <T>(sorter: ProSorter<T>) => {
  return typeof sorter === 'function' || (typeof sorter === 'object' && typeof sorter.compare === 'function');
}

/**
 * 获取服务端筛选数据
 * @param filters 筛选数据
 * @param columns 列配置
 * @returns 服务端筛选数据
 */
export const getServerFilterResult = <T>(filters: Record<string, AntFilterValue | null>, columns: ProColumnType<T>[]) => {
  // 过滤掉本地筛选的列
  return Object.entries(filters).reduce<Record<string, FilterValue>>((acc, [key, value]) => {
    const column = columns.find((column) => parseDataIndex(column.dataIndex) === key);
    if(column != null && !isLocaleFilter(column.filters, column.onFilter)) acc[key] = value as FilterValue;

    return acc;
  }, {});
}

/**
 * 获取服务端排序数据
 * @param sorterResult 排序数据
 * @returns 服务端排序数据
 */
export const getServerSorterResult = <T>(sorterResult: SorterResult<T> | SorterResult<T>[]) => {
  const result = Array.isArray(sorterResult) ? sorterResult : [sorterResult];

  const serverSorter = result.reduce<Record<string, SortOrder | undefined>>((acc, item) => {
    const sorter = item.column?.sorter;
    if(sorter != null && isLocaleSorter<T>(sorter)) return acc;

    const sortKey = typeof sorter === 'string' ? sorter : parseDataIndex(item.column?.dataIndex);
    if(sortKey != null) acc[sortKey] = item.order;

    return acc;
  }, {});
  return serverSorter;
}

/**
 * 从 ProColumns 数组中取出默认的服务端排序和筛选数据
 * @param columns ProColumns
 */
export const parseServerDefaultColumnConfig = <T, Value>(
  columns: ProColumns<T, Value>[],
) => {
  const filter: Record<string, FilterValue> = {};
  const sort: Record<string, SortOrder> = {};
  columns.forEach((column) => {
    // 转换 dataIndex
    const dataIndex = parseDataIndex(column.dataIndex);
    if (!dataIndex) return; // 没有 dataIndex 的列不参与服务端排序/筛选

    // 当 column 启用服务端 filters 功能时，取出默认的筛选值
    if (column.filters && !isLocaleFilter(column.filters, column.onFilter)) {
      filter[dataIndex] = (column.defaultFilteredValue as FilterValue) ?? null;
    }

    // 当 column 启用服务端 sorter 功能时，取出默认的排序值
    if (column.sorter && !isLocaleSorter(column.sorter)) {
      if(typeof column.sorter === 'string') {
        sort[column.sorter] = column.defaultSortOrder ?? null;
      } else {
        sort[dataIndex] = column.defaultSortOrder ?? null;
      }
    }
  });
  return { sort, filter };
}

/**
 * 解析对应排序值，用作双向绑定
 * @param proSort 排序配置
 * @param columnProps 列配置
 * @returns 排序值
 */
export const parseProSortOrder = <T>(
  proSort: Record<string, SortOrder>, 
  columnProps: ProColumnType<T>
): SortOrder | undefined => {
  const { sorter, sortOrder: columnSortOrder, dataIndex } = columnProps;
  
  // 优先使用用户明确设置的 sortOrder
  if (columnSortOrder !== undefined) return columnSortOrder;
  
  // 如果没有排序器配置，直接返回 undefined
  if (sorter == null) return undefined;
  
  // 如果是本地排序，不使用 proSort 中的值
  if (isLocaleSorter(sorter)) return undefined;
  
  // 服务端排序：确定排序键
  const sortKey = typeof sorter === 'string' ? sorter : parseDataIndex(dataIndex);

  // 返回对应的排序值
  return sortKey ? proSort[sortKey] : undefined;
}

/**
 * 解析对应筛选值，用作双向绑定
 * @param proFilter 筛选配置
 * @param columnProps 列配置
 * @returns 筛选值
 */
export const parseProFilter = <T>(
  proFilter: Record<string, FilterValue>,
  columnProps: ProColumnType<T>,
): FilterValue | undefined => {
  const { filters, onFilter, filteredValue: columnFilteredValue, dataIndex } = columnProps;
  
  // 优先使用用户设置的 filteredValue
  if(columnFilteredValue !== undefined) return columnFilteredValue as FilterValue;

  // 如果没有筛选配置，直接返回 undefined
  if(filters == null) return undefined;
  
  // 如果是本地筛选，不使用 proFilter 中的值
  if(isLocaleFilter(filters, onFilter)) return undefined;

  // 服务端排序：获取筛选键
  const filterKey = parseDataIndex(dataIndex);

  // 返回对应的筛选值
  return filterKey ? proFilter[filterKey] : undefined;
}