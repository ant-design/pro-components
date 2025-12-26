import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { Key } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GetRowKey, TableRowSelection } from './types';

interface UseSelectionConfig<RecordType> {
  getRowKey: GetRowKey<RecordType>;
  getRecordByKey: (key: Key) => RecordType;
  prefixCls: string;
  data: RecordType[];
  pageData: RecordType[];
  expandType?: 'row' | 'radio';
  childrenColumnName?: string;
  locale?: Record<string, any>;
}

/**
 * 行选择 Hook
 * 提供与 antd Table 一致的行选择功能
 */
function useSelection<RecordType>(
  config: UseSelectionConfig<RecordType>,
  rowSelection?: TableRowSelection<RecordType>,
): [
  (data: RecordType[]) => Array<{
    render: (
      record: RecordType,
      record2: RecordType,
      index: number,
    ) => React.ReactNode | any;
  }>,
  Set<Key>,
] {
  const { getRowKey, getRecordByKey, pageData } = config;

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>(() => {
    return rowSelection?.selectedRowKeys || [];
  });

  const selectedKeySet = useMemo(() => {
    return new Set(selectedRowKeys);
  }, [selectedRowKeys]);

  // 同步外部 selectedRowKeys
  useEffect(() => {
    if (rowSelection?.selectedRowKeys !== undefined) {
      setSelectedRowKeys(rowSelection.selectedRowKeys);
    }
  }, [rowSelection?.selectedRowKeys]);

  const onSelect = useCallback(
    (record: RecordType, selected: boolean) => {
      const key = getRowKey(record);
      const newSelectedRowKeys = selected
        ? [...selectedRowKeys, key]
        : selectedRowKeys.filter((k) => k !== key);

      setSelectedRowKeys(newSelectedRowKeys);

      if (rowSelection?.onSelect) {
        rowSelection.onSelect(record, selected, pageData, {
          type: 'single',
        } as any);
      }

      if (rowSelection?.onChange) {
        const selectedRecords = newSelectedRowKeys
          .map((k) => {
            try {
              return getRecordByKey(k);
            } catch {
              return null;
            }
          })
          .filter(Boolean) as RecordType[];

        rowSelection.onChange(newSelectedRowKeys, selectedRecords, {
          type: 'single',
        } as any);
      }
    },
    [selectedRowKeys, getRowKey, getRecordByKey, pageData, rowSelection],
  );

  // onSelectAll 暂时未使用，但保留以备将来扩展
  // const onSelectAll = useCallback(
  //   (selected: boolean, selectedRows: RecordType[], changeRows: RecordType[]) => {
  //     const changeRowKeys = changeRows.map((row) => getRowKey(row));
  //     const newSelectedRowKeys = selected
  //       ? [...new Set([...selectedRowKeys, ...changeRowKeys])]
  //       : selectedRowKeys.filter((key) => !changeRowKeys.includes(key));

  //     setSelectedRowKeys(newSelectedRowKeys);

  //     if (rowSelection?.onSelectAll) {
  //       rowSelection.onSelectAll(selected, selectedRows, changeRows);
  //     }

  //     if (rowSelection?.onChange) {
  //       const selectedRecords = newSelectedRowKeys.map((k) => {
  //         try {
  //           return getRecordByKey(k);
  //         } catch {
  //           return null;
  //         }
  //       }).filter(Boolean) as RecordType[];

  //       rowSelection.onChange(newSelectedRowKeys, selectedRecords, {
  //         type: 'single',
  //       } as any);
  //     }
  //   },
  //   [selectedRowKeys, getRowKey, getRecordByKey, rowSelection],
  // );

  const selectItemRender = useCallback(
    (_data: RecordType[]) => {
      return [
        {
          render: (record: RecordType, _record2: RecordType, index: number) => {
            const key = getRowKey(record, index);
            const checked = selectedKeySet.has(key);

            if (!rowSelection) {
              return null;
            }

            const handleChange = (
              e: CheckboxChangeEvent | { changeChecked?: boolean },
            ) => {
              const newChecked =
                (e as CheckboxChangeEvent)?.target?.checked ??
                (e as { changeChecked?: boolean })?.changeChecked ??
                !checked;
              onSelect(record, newChecked);
            };

            // 如果 rowSelection 有自定义的 renderCell，使用它
            if (rowSelection.renderCell) {
              const originNode = (
                <Checkbox checked={checked} onChange={handleChange} />
              );
              return rowSelection.renderCell(checked, record, index, {
                originNode,
              } as any);
            }

            // 默认返回一个 Checkbox 组件
            return <Checkbox checked={checked} onChange={handleChange} />;
          },
        },
      ];
    },
    [getRowKey, selectedKeySet, rowSelection, onSelect],
  );

  return [selectItemRender, selectedKeySet];
}

export default useSelection;
