import type { TablePaginationConfig } from 'antd';
import { useMemo } from 'react';

const DEFAULT_PAGE_SIZE = 10;

/**
 * 分页配置 Hook
 * 合并用户配置和默认配置
 */
function usePagination(
  total: number,
  onChange: (current: number, pageSize: number) => void,
  pagination?: TablePaginationConfig | false,
): [TablePaginationConfig | false] {
  const mergedPagination = useMemo<TablePaginationConfig | false>(() => {
    if (pagination === false) {
      return false;
    }

    const {
      current,
      pageSize,
      total: paginationTotal,
      showSizeChanger = true,
      showQuickJumper = false,
      showTotal,
      pageSizeOptions = ['10', '20', '50', '100'],
      ...restPagination
    } = pagination || {};

    // 确保 total 不会被 restPagination 覆盖
    const finalTotal = paginationTotal !== undefined ? paginationTotal : total;

    return {
      ...restPagination,
      current: current ?? 1,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
      total: finalTotal,
      showSizeChanger,
      showQuickJumper,
      showTotal,
      pageSizeOptions,
      onChange,
      onShowSizeChange: onChange,
    };
  }, [total, onChange, pagination]);

  return [mergedPagination];
}

export default usePagination;
