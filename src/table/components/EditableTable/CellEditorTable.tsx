import { useControlledState } from '@rc-component/util';
import React, { useCallback, useMemo, useRef } from 'react';
import { ParamsType } from '../../../provider';
import { useRefFunction } from '../../../utils';
import { ProColumns } from '../../typing';
import {
  buildEditableTableRowKey,
  resolveEditingPayloadForRowEditableOnChange,
} from '../../utils';
import EditableProTable, { EditableProTableProps } from './index';

/**
 * 生成列的唯一标识，用于精确匹配当前正在编辑的单元格所属列。
 * 同时使用 columnsIndex 避免 dataIndex/key 缺失或碰撞的问题。
 */
function buildColumnIdentifier(
  columnPath: React.Key[],
  dataIndex: string | string[] | number | undefined,
  key: React.Key | undefined,
): string {
  const base = dataIndex ?? key;
  const path = columnPath.map(String).join('/');
  if (base === undefined) return `__col_${path}`;
  return `${path}:${[base].flat(1).join('.')}`;
}

export function CellEditorTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const [editableKeys, setEditableRowKeys] = useControlledState<React.Key[]>(
    () => props.editable?.editableKeys ?? [],
    props.editable?.editableKeys,
  );
  const [activeColumnId, setActiveColumnId] = React.useState<string>('');

  // 用于延迟退出编辑的定时器，避免点击下拉面板等场景误关编辑态
  const blurTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const rowKey = props.rowKey || 'id';

  // ============================ RowKey ============================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRowKey = useMemo(
    () => buildEditableTableRowKey<DataType>(rowKey, props.name),
    [props.name, rowKey],
  );

  const handleEditableKeysChange = useRefFunction((keys: React.Key[]) => {
    const cleanKeys = keys.filter((key) => key !== undefined);
    setEditableRowKeys(cleanKeys);
    const editingPayload = resolveEditingPayloadForRowEditableOnChange(
      cleanKeys,
      props.value as readonly DataType[] | undefined,
      getRowKey,
      props.editable?.type,
    );
    props.editable?.onChange?.(cleanKeys, editingPayload);
  });

  const handleValuesChange = useRefFunction(
    (record: DataType, dataSource: DataType[]) => {
      props.editable?.onValuesChange?.(record, dataSource);
      if (!props.controlled) props.onChange?.(dataSource);
    },
  );

  const scheduleExitEditing = useCallback(() => {
    blurTimerRef.current = setTimeout(() => {
      handleEditableKeysChange([]);
      setActiveColumnId('');
    }, 150);
  }, [handleEditableKeysChange]);

  const cancelExitEditing = useCallback(() => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = undefined;
    }
  }, []);

  // 缓存 columns 避免每次 render 生成全新数组触发 antd Table 大面积 diff
  // #8880: 递归为分组表头的叶子列同样注入 onCell（双击进入编辑），
  // 旧实现只 map 顶层列，分组 children 的叶子列没有 onDoubleClick。
  const columns = useMemo(() => {
    const wrapColumn = (
      item: ProColumns<any, ValueType>,
      columnIndex: number,
      parentPath: React.Key[] = [],
    ): ProColumns<any, ValueType> => {
      const currentPath = [
        ...parentPath,
        item.key ?? item.dataIndex?.toString() ?? columnIndex,
      ];
      const columnId = buildColumnIdentifier(
        currentPath,
        item.dataIndex as string | string[] | undefined,
        item.key,
      );
      return {
        ...item,
        editable:
          item.editable === false || activeColumnId !== columnId
            ? false
            : undefined,
        children: item.children
          ? (item.children.map((child, childIndex) =>
              wrapColumn(
                child as ProColumns<any, ValueType>,
                childIndex,
                currentPath,
              ),
            ) as ProColumns<any, ValueType>['children'])
          : undefined,
        onCell: (record: any, rowIndex: any) => {
          const originCell = item.onCell?.(record, rowIndex) ?? {};
          const {
            onDoubleClick: originOnDoubleClick,
            onBlur: originOnBlur,
            onFocus: originOnFocus,
            ...originCellProps
          } = originCell;
          return {
            ...originCellProps,
            onDoubleClick: (event: React.MouseEvent<HTMLElement>) => {
              originOnDoubleClick?.(event);
              if (event.defaultPrevented || item.editable === false) return;
              cancelExitEditing();
              handleEditableKeysChange([getRowKey(record, rowIndex)]);
              setActiveColumnId(columnId);
            },
            onBlur: (event: React.FocusEvent<HTMLElement>) => {
              originOnBlur?.(event);
              scheduleExitEditing();
            },
            onFocus: (event: React.FocusEvent<HTMLElement>) => {
              originOnFocus?.(event);
              cancelExitEditing();
            },
          };
        },
      };
    };

    return (
      (props?.columns?.map((item, columnIndex) =>
        wrapColumn(item, columnIndex),
      ) as ProColumns<any, ValueType>[] | undefined) ?? []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.columns,
    activeColumnId,
    getRowKey,
    scheduleExitEditing,
    cancelExitEditing,
    handleEditableKeysChange,
  ]);

  return (
    <EditableProTable
      bordered
      pagination={false}
      {...props}
      editable={{
        ...props.editable,
        editableKeys,
        onValuesChange: handleValuesChange,
      }}
      columns={columns}
    />
  );
}
