import { Checkbox, Radio } from 'antd';
import type { GetRowKey, TableRowSelection } from 'antd/lib/table/interface';
import React from 'react';

type UseSelectionConfig<RecordType> = {
  getRowKey: GetRowKey<RecordType>;
  getRecordByKey: (key: React.Key) => RecordType | undefined;
  prefixCls?: string;
  data: RecordType[];
  pageData: RecordType[];
  expandType?: 'row' | 'nest';
  childrenColumnName?: string;
  locale?: any;
};

function useSelection<RecordType>(
  config: UseSelectionConfig<RecordType>,
  rowSelection?: TableRowSelection<RecordType>,
): readonly [
  (columns?: any[]) => Array<{
    render: (
      text: any,
      record: RecordType,
      index: number,
    ) => React.ReactElement;
  }>,
  Set<React.Key>,
] {
  const { getRowKey, data } = config;

  const controlledKeys = rowSelection?.selectedRowKeys as
    | React.Key[]
    | undefined;
  const [innerKeys, setInnerKeys] = React.useState<React.Key[]>(
    controlledKeys || [],
  );

  // Keep in sync with controlled keys
  React.useEffect(() => {
    if (controlledKeys) {
      setInnerKeys(controlledKeys);
    }
  }, [controlledKeys && controlledKeys.join(';')]);

  const selectedKeySet = React.useMemo(() => new Set(innerKeys), [innerKeys]);

  const toggleKey = React.useCallback(
    (key: React.Key, record: RecordType, checked: boolean) => {
      setInnerKeys((prevKeys) => {
        if (rowSelection?.type === 'radio') {
          const nextKeys = [key];
          const selectedRows = [record];
          rowSelection?.onChange?.(nextKeys, selectedRows, {
            type: 'single',
            selectedRows,
            selectedRowKeys: nextKeys,
          } as any);
          rowSelection?.onSelect?.(record, checked, selectedRows, {} as any);
          if (!controlledKeys) {
            return nextKeys;
          }
          return prevKeys;
        }
        const prevSet = new Set(prevKeys);
        const next = new Set(prevSet);
        if (checked) {
          next.add(key);
        } else {
          next.delete(key);
        }

        const nextKeys = Array.from(next);

        // Fire callbacks similar to antd rowSelection
        const selectedRows = data.filter((item, idx) =>
          next.has(getRowKey(item, idx)),
        );
        rowSelection?.onChange?.(nextKeys, selectedRows, {
          type: 'multiple',
          selectedRows,
          selectedRowKeys: nextKeys,
        } as any);
        rowSelection?.onSelect?.(
          record,
          checked,
          data.filter((item, idx) => next.has(getRowKey(item, idx))),
          {} as any,
        );

        if (!controlledKeys) {
          return nextKeys;
        }
        return prevKeys;
      });
    },
    [data, getRowKey, rowSelection, controlledKeys],
  );

  const selectItemRender = React.useCallback(
    (columns?: any[]) => {
      void columns;
      if (!rowSelection) {
        return [];
      }
      return [
        {
          render: (_text: any, record: RecordType, index: number) => {
            const key = getRowKey(record, index);
            const checked = selectedKeySet.has(key);
            if (rowSelection?.type === 'radio') {
              return (
                <Radio
                  checked={checked}
                  onChange={(e) => {
                    toggleKey(key, record, e.target.checked);
                  }}
                />
              );
            }
            return (
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  toggleKey(key, record, e.target.checked);
                }}
              />
            );
          },
        },
      ];
    },
    [getRowKey, selectedKeySet, toggleKey, rowSelection?.type],
  );

  return [selectItemRender, selectedKeySet] as const;
}

export default useSelection;
