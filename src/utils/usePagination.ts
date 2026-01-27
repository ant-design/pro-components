import { useState } from 'react';
import type { PaginationProps } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table/interface';

export const DEFAULT_PAGE_SIZE = 10;

function extendsObject<T extends object>(
  base: Partial<T>,
  override: Partial<T>,
  extra: Partial<T> = {},
): T {
  return { ...(base as object), ...(override as object), ...(extra as object) } as T;
}

export function getPaginationParam(
  mergedPagination: TablePaginationConfig,
  pagination?: TablePaginationConfig | boolean,
) {
  const param: any = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize,
  };

  const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

  Object.keys(paginationObj).forEach((pageProp) => {
    const value = (mergedPagination as any)[pageProp as keyof typeof paginationObj];

    if (typeof value !== 'function') {
      param[pageProp] = value;
    }
  });

  return param;
}

function usePagination(
  total: number,
  onChange: (current: number, pageSize: number) => void,
  pagination?: TablePaginationConfig | false,
): readonly [TablePaginationConfig, (current?: number, pageSize?: number) => void] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === 'object' ? pagination : ({} as TablePaginationConfig);

  const [innerPagination, setInnerPagination] = useState<{ current?: number; pageSize?: number }>(
    () => ({
      current: 'defaultCurrent' in paginationObj ? (paginationObj as any).defaultCurrent : 1,
      pageSize:
        'defaultPageSize' in paginationObj
          ? (paginationObj as any).defaultPageSize
          : DEFAULT_PAGE_SIZE,
    }),
  );

  // ============ Basic Pagination Config ============
  const mergedPagination = extendsObject<TablePaginationConfig>(innerPagination as any, paginationObj, {
    total: paginationTotal > 0 ? paginationTotal : total,
  });

  // Reset `current` if data length or pageSize changed
  const pageSize = mergedPagination.pageSize || DEFAULT_PAGE_SIZE;
  const maxPage = Math.ceil((paginationTotal || total) / pageSize);
  if ((mergedPagination.current || 1) > maxPage) {
    // Prevent a maximum page count of 0
    mergedPagination.current = maxPage || 1;
  }

  const refreshPagination = (current?: number, pageSizeArg?: number) => {
    setInnerPagination({
      current: current ?? 1,
      pageSize: pageSizeArg || mergedPagination.pageSize,
    });
  };

  const onInternalChange: PaginationProps['onChange'] = (current, pageSizeArg) => {
    if (pagination && typeof pagination === 'object') {
      (pagination as TablePaginationConfig).onChange?.(current, pageSizeArg!);
    }
    refreshPagination(current, pageSizeArg);
    onChange(current, pageSizeArg || mergedPagination.pageSize!);
  };

  if (pagination === false) {
    return [{}, () => {}] as const;
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
    refreshPagination,
  ] as const;
}

export default usePagination;
