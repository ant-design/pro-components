import { warning } from '@rc-component/util';
import { Checkbox, Radio } from 'antd';
import React from 'react';
import type { GetRowKey, TableRowSelection } from './antdTypes';

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

/**
 * #9779: rowSelection.getCheckboxProps 返回的行级属性。
 * 与 antd v6 一致，类型和调用都只传入 record。
 */
type GetCheckboxProps<RecordType> = (
  record: RecordType,
) => Record<string, any> | undefined;

/**
 * antd v6 的 Checkbox / Radio onChange 事件结构一致：target.checked 表示选中状态。
 */
type SelectionChangeEvent = {
  target: { checked: boolean };
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
  const { getRowKey, getRecordByKey } = config;

  const controlledKeys = rowSelection?.selectedRowKeys as
    React.Key[] | undefined;
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

  const warnedCheckedRef = React.useRef(false);

  /**
   * #9779: 读取 rowSelection.getCheckboxProps 为当前行返回的属性，
   * 用于透传 disabled / aria-label 等行级配置，行为与 antd Table 保持一致。
   */
  const getRecordCheckboxProps = React.useCallback(
    (record: RecordType): Record<string, any> => {
      const getCheckboxProps = rowSelection?.getCheckboxProps as
        GetCheckboxProps<RecordType> | undefined;
      if (!getCheckboxProps) return {};
      const props = getCheckboxProps(record) || {};
      // 与 antd Table 保持一致：checked / defaultChecked 由 selectedRowKeys 控制
      if (
        !warnedCheckedRef.current &&
        ('checked' in props || 'defaultChecked' in props)
      ) {
        warnedCheckedRef.current = true;
        warning(
          false,
          '[ProList] Do not set `checked` or `defaultChecked` in `rowSelection.getCheckboxProps`. ' +
            'Please use `rowSelection.selectedRowKeys` instead.',
        );
      }
      return props;
    },
    [rowSelection?.getCheckboxProps],
  );

  const toggleKey = React.useCallback(
    (key: React.Key, record: RecordType, checked: boolean) => {
      // #9779: getCheckboxProps 返回 disabled 的行不可选中，也不触发选择回调。
      // 卡片模式下整行点击会直接调用 checkbox 的 onChange，这里统一拦截。
      if (getRecordCheckboxProps(record)?.disabled) {
        return;
      }
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
        const selectedRows = nextKeys
          .map((selectedKey) => getRecordByKey(selectedKey))
          .filter((item): item is RecordType => item !== undefined);
        rowSelection?.onChange?.(nextKeys, selectedRows, {
          type: 'multiple',
          selectedRows,
          selectedRowKeys: nextKeys,
        } as any);
        rowSelection?.onSelect?.(record, checked, selectedRows, {} as any);

        if (!controlledKeys) {
          return nextKeys;
        }
        return prevKeys;
      });
    },
    [controlledKeys, getRecordByKey, getRecordCheckboxProps, rowSelection],
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
            // #9779: 透传 getCheckboxProps 返回的行级属性（disabled / aria-label 等）
            const checkboxProps = getRecordCheckboxProps(record);
            const onCheckboxClick = (e: React.MouseEvent<HTMLElement>) => {
              checkboxProps.onClick?.(e);
            };
            const onCheckboxChange = (e: SelectionChangeEvent) => {
              toggleKey(key, record, e.target.checked);
              checkboxProps.onChange?.(e);
            };
            if (rowSelection?.type === 'radio') {
              return (
                <Radio
                  {...checkboxProps}
                  checked={checked}
                  onClick={onCheckboxClick}
                  onChange={onCheckboxChange}
                />
              );
            }
            return (
              <Checkbox
                {...checkboxProps}
                checked={checked}
                onClick={onCheckboxClick}
                onChange={onCheckboxChange}
              />
            );
          },
        },
      ];
    },
    [
      getRowKey,
      getRecordCheckboxProps,
      selectedKeySet,
      toggleKey,
      rowSelection?.type,
    ],
  );

  return [selectItemRender, selectedKeySet] as const;
}

export default useSelection;
