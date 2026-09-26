import type { TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import type { SortOrder } from 'antd/lib/table/interface';
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
  /** 表格是否开启行编辑（editable 配置存在），用于跳过非编辑表格的 onCell 包装 */
  editableConfig: boolean;
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

const EMPTY_SUB_NAME: string[] = [];

function updateSubNameRecord<T>(
  rowData: T,
  index: number,
  keyName: string | number | symbol,
  childrenColumnName: string,
  subNameRecord: Map<unknown, unknown[]>,
): unknown {
  if (typeof rowData !== 'object' || rowData === null) {
    return undefined;
  }
  const record = rowData as Record<string, any>;
  // 快路径：绝大多数行没有子行，直接属性读取即可，避免 Reflect.has 开销
  if (!(keyName in record)) {
    return undefined;
  }
  const uniqueKey = record[keyName as string];
  const children = record[childrenColumnName];
  // 无子行时不注册索引，查询侧统一回退共享空数组（避免每格分配）
  if (!children?.length) {
    return uniqueKey;
  }
  const parentInfo = subNameRecord.get(uniqueKey) || [];
  children.forEach((item: any) => {
    const itemUniqueKey = item?.[keyName];
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
      subName: (uniqueKey === undefined
        ? EMPTY_SUB_NAME
        : (subNameRecord.get(uniqueKey) ?? EMPTY_SUB_NAME)) as string[],
      editableUtils: context.editableUtils,
    });
  };
}

/**
 * 包装用户的 onCell，向返回的 td props 注入当前行的编辑状态（#9643 方案 C）：
 * - data-editing: 该行是否处于编辑（行级或 cell 级）
 * - data-cell-editing: 该行激活的 cell 级复合键列表
 * 仅在表格开启编辑（editable 配置存在）时才包装，非编辑表格零开销
 */
function createOnCell<T extends AnyObject>(
  columnProps: ProColumns<T, any>,
  context: TableColumnContext<T>,
) {
  const userOnCell = columnProps.onCell;
  // 未开启编辑且用户没有 onCell 时直接透传，避免所有表格每个 td 都包一层
  if (!userOnCell && !context.editableConfig) return undefined;
  return function wrappedOnCell(record: T, rowIndex?: number) {
    const userProps = userOnCell ? userOnCell(record, rowIndex!) : {};
    if (!context.editableConfig) return userProps;
    const { isEditable, cellEditableKeys = [] } =
      context.editableUtils.isEditable(record, rowIndex!);
    return {
      'data-editing': isEditable ? 'true' : undefined,
      'data-cell-editing':
        cellEditableKeys.length > 0 ? cellEditableKeys.join(',') : undefined,
      ...userProps,
    };
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

  return columns
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
        key || (dataIndex as React.Key),
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

      // 纯 ellipsis: true 时 antd 走原生 CSS 省略（性能优化，#9664），
      // 有 tooltip/copyable 等定制时仍由 Typography.Text 渲染，无需特殊处理
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
        width:
          context.type === 'list'
            ? columnProps.width
            : columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: children
          ? genProColumnToColumn({
              columns: children ?? [],
              context,
              parents: { ...columnProps, key: columnKey } as ProColumns<T, any>,
            })
          : undefined,
        onCell: createOnCell(columnProps, context),
        render: createCellRender(columnProps, context, subNameRecord),
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    ?.filter(
      (item) => !item.hideInTable,
    ) as unknown as ColumnToColumnReturnType<T>;
}
