import type { TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import { SortOrder } from 'antd/lib/table/interface';
import type { ProFieldEmptyText } from '../../field';
import { proFieldParsingValueEnumToArray } from '../../field';
import type { ProSchemaComponentTypes, UseEditableUtilType } from '../../utils';
import {
  omitBoolean,
  omitUndefinedAndEmptyArr,
  runFunction,
} from '../../utils';
import type { ContainerType } from '../Store/Provide';
import type { FilterValue, ProColumns } from '../typing';
import {
  columnRender,
  defaultOnFilter,
  renderColumnsTitle,
} from './columnRender';
import {
  genColumnKey,
  parseProFilteredValue,
  parseProSortOrder,
} from './index';

type ColumnToColumnReturnType<T> = (TableColumnType<T> & {
  index?: number;
})[];

export type TableColumnContext<T> = {
  counter: ReturnType<ContainerType>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
  marginSM: number;
  rowKey: TableProps<T>['rowKey'];
  childrenColumnName: string;
  proFilter: Record<string, FilterValue>;
  proSort: Record<string, SortOrder>;
};

function resolveOnFilter<T>(columnProps: ProColumns<T, any>) {
  const { onFilter, dataIndex } = columnProps;
  if (onFilter === true) {
    return (value: string, row: T) =>
      defaultOnFilter(value, row, dataIndex as string[]);
  }
  return omitBoolean(onFilter);
}

function resolveFilters<T>(columnProps: ProColumns<T, any>) {
  const { filters = [], valueEnum } = columnProps;
  if (filters === true) {
    return proFieldParsingValueEnumToArray(
      runFunction<[undefined]>(valueEnum, undefined),
    ).filter((valueItem) => valueItem && valueItem.value !== 'all');
  }
  return filters;
}

function getColumnConfig<T>(
  columnsMap: Record<string, { fixed?: 'left' | 'right' }> | null | undefined,
  columnKey: string,
  columnProps: ProColumns<T, any>,
) {
  const config = columnsMap?.[columnKey] || { fixed: columnProps.fixed };
  return { fixed: config.fixed };
}

function parseColumnFilterSort<T>(
  proFilter: Record<string, FilterValue>,
  proSort: Record<string, SortOrder>,
  columnProps: ProColumns<T, any>,
) {
  return {
    filteredValue: parseProFilteredValue(proFilter, columnProps),
    sortOrder: parseProSortOrder(proSort, columnProps),
  };
}

function updateSubNameRecord<T>(
  rowData: T,
  index: number,
  keyName: string | number | symbol,
  childrenColumnName: string,
  subNameRecord: Map<unknown, unknown[]>,
): unknown {
  if (
    typeof rowData !== 'object' ||
    rowData === null ||
    !Reflect.has(rowData as object, keyName)
  ) {
    return undefined;
  }
  const record = rowData as Record<string, any>;
  const uniqueKey = record[keyName as string];
  const parentInfo = subNameRecord.get(uniqueKey) || [];
  record[childrenColumnName]?.forEach((item: any) => {
    const itemUniqueKey = item[keyName];
    if (!subNameRecord.has(itemUniqueKey)) {
      subNameRecord.set(
        itemUniqueKey,
        parentInfo.concat([index, childrenColumnName]),
      );
    }
  });
  return uniqueKey;
}

function createCellRender<T extends AnyObject>(
  columnProps: ProColumns<T, any>,
  context: TableColumnContext<T>,
  subNameRecord: Map<unknown, unknown[]>,
) {
  let keyName: string | number | symbol = (context.rowKey ?? 'id') as string;
  return function cellRender(text: any, rowData: T, index: number) {
    if (typeof context.rowKey === 'function') {
      keyName = context.rowKey(rowData, index) as string;
    }
    const uniqueKey = updateSubNameRecord(
      rowData,
      index,
      keyName,
      context.childrenColumnName,
      subNameRecord,
    );
    return columnRender<T>({
      columnProps,
      text,
      rowData,
      index,
      columnEmptyText: context.columnEmptyText,
      counter: context.counter,
      type: context.type,
      marginSM: context.marginSM,
      subName: (subNameRecord.get(uniqueKey) ?? []) as string[],
      editableUtils: context.editableUtils,
    });
  };
}

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param params.columns 列配置
 * @param params.context 列计算上下文（表级配置与状态）
 * @param params.parents 父列，递归子列时传入
 */
export function genProColumnToColumn<T extends AnyObject>(params: {
  columns: ProColumns<T, any>[];
  context: TableColumnContext<T>;
  parents?: ProColumns<T, any>;
}): ColumnToColumnReturnType<T> {
  const { columns, context, parents } = params;
  const subNameRecord = new Map<unknown, unknown[]>();

  return (
    columns
      ?.map((columnProps, columnsIndex) => {
        if (columnProps === Table.EXPAND_COLUMN) return columnProps;
        if (columnProps === Table.SELECTION_COLUMN) return columnProps;
        const {
          key,
          dataIndex,
          valueEnum,
          valueType = 'text',
          children,
        } = columnProps as ProColumns<T, any>;
        const columnKey = genColumnKey(
          key || dataIndex?.toString(),
          [parents?.key, columnsIndex].filter(Boolean).join('-'),
        );
        const noNeedPro = !valueEnum && !valueType && !children;
        if (noNeedPro) {
          return {
            index: columnsIndex,
            ...columnProps,
          };
        }

        const { filteredValue, sortOrder } = parseColumnFilterSort(
          context.proFilter,
          context.proSort,
          columnProps,
        );
        const { fixed } = getColumnConfig(
          context.counter.columnsMap,
          columnKey,
          columnProps,
        );

        const tempColumns = {
          index: columnsIndex,
          key: columnKey,
          ...columnProps,
          title: renderColumnsTitle(columnProps),
          valueEnum,
          filters: resolveFilters(columnProps),
          onFilter: resolveOnFilter(columnProps),
          filteredValue,
          sortOrder,
          fixed,
          width: columnProps.width || (columnProps.fixed ? 200 : undefined),
          children: (columnProps as ProColumns<T, any>).children
            ? genProColumnToColumn({
                columns: (columnProps as ProColumns<T, any>)?.children ?? [],
                context,
                parents: { ...columnProps, key: columnKey } as ProColumns<
                  T,
                  any
                >,
              })
            : undefined,
          render: createCellRender(columnProps, context, subNameRecord),
        };
        return omitUndefinedAndEmptyArr(tempColumns);
      })
      ?.filter((item) => !item.hideInTable) as unknown as ColumnToColumnReturnType<T>
  );
}
