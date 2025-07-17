import type { ProFieldEmptyText } from '@ant-design/pro-field';
import { proFieldParsingValueEnumToArray } from '@ant-design/pro-field';
import type {
  ProSchemaComponentTypes,
  UseEditableUtilType,
} from '@ant-design/pro-utils';
import {
  omitBoolean,
  omitUndefinedAndEmptyArr,
  runFunction,
} from '@ant-design/pro-utils';
import type { TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SortOrder } from 'antd/lib/table/interface';
import type { ContainerType } from '../Store/Provide';
import type { ProColumns } from '../typing';
import {
  columnRender,
  defaultOnFilter,
  renderColumnsTitle,
} from './columnRender';
import { genColumnKey } from './index';

type ColumnToColumnReturnType<T> = (TableColumnType<T> & {
  index?: number;
})[];

type ColumnToColumnParams<T> = {
  columns: ProColumns<T, any>[];
  counter: ReturnType<ContainerType>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
  proFilter: Record<string, (string | number)[] | null>;
  proSort: Record<string, SortOrder>;
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>;

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genProColumnToColumn<T extends AnyObject>(
  params: ColumnToColumnParams<T> & { marginSM: number },
  parents?: ProColumns<T, any>,
): ColumnToColumnReturnType<T> {
  const {
    columns,
    counter,
    columnEmptyText,
    type,
    editableUtils,
    marginSM,
    rowKey = 'id',
    childrenColumnName = 'children',
    proFilter = {},
    proSort,
  } = params;

  const subNameRecord = new Map();

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
        onFilter,
        filters = [],
        sorter,
        filteredValue: columnFilteredValue,
      } = columnProps as ProColumns<T, any>;
      const columnKey = genColumnKey(
        key || dataIndex?.toString(),
        [parents?.key, columnsIndex].filter(Boolean).join('-'),
      );
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        };
      }
      const config = counter.columnsMap[columnKey] || {
        fixed: columnProps.fixed,
      };

      const genOnFilter = () => {
        if (onFilter === true) {
          return (value: string, row: T) =>
            defaultOnFilter(value, row, dataIndex as string[]);
        }
        return omitBoolean(onFilter);
      };

      // 对应筛选值，用作双向绑定
      const filteredValue =
        columnKey && proFilter?.[columnKey] !== undefined
          ? proFilter?.[columnKey]
          : null;
      // 对应排序值，用作双向绑定
      const sortOrder =
        columnKey && proSort[columnKey] !== undefined
          ? proSort[columnKey]
          : null;

      let keyName: string | number | symbol = rowKey as string;

      const tempColumns = {
        index: columnsIndex,
        key: columnKey,
        ...columnProps,
        title: renderColumnsTitle(columnProps),
        valueEnum,
        filters:
          filters === true
            ? proFieldParsingValueEnumToArray(
                runFunction<[undefined]>(valueEnum, undefined),
              ).filter((valueItem) => valueItem && valueItem.value !== 'all')
            : filters,
        onFilter: genOnFilter(),
        filteredValue:
          // 优先使用用户明确设置的 filteredValue
          columnFilteredValue !== undefined
            ? columnFilteredValue
            : // 否则，只有在服务端筛选时才使用计算的 filteredValue
              filters && genOnFilter() == null
              ? filteredValue
              : undefined,
        sortOrder: sorter === true ? sortOrder : undefined,
        fixed: config.fixed,
        width: columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: (columnProps as ProColumns<T, any>).children
          ? genProColumnToColumn(
              {
                ...params,
                columns: (columnProps as ProColumns<T, any>)?.children || [],
              },
              { ...columnProps, key: columnKey } as ProColumns<T, any>,
            )
          : undefined,
        render: (text: any, rowData: T, index: number) => {
          if (typeof rowKey === 'function') {
            keyName = rowKey(rowData, index) as string;
          }

          let uniqueKey: any;
          if (
            typeof rowData === 'object' &&
            rowData !== null &&
            Reflect.has(rowData as any, keyName)
          ) {
            uniqueKey = (rowData as Record<string, any>)[keyName as string];
            const parentInfo = subNameRecord.get(uniqueKey) || [];
            (rowData as Record<string, any>)[childrenColumnName]?.forEach(
              (item: any) => {
                const itemUniqueKey = item[keyName];
                if (!subNameRecord.has(itemUniqueKey)) {
                  subNameRecord.set(
                    itemUniqueKey,
                    parentInfo.concat([index, childrenColumnName]),
                  );
                }
              },
            );
          }

          const renderProps = {
            columnProps,
            text,
            rowData,
            index,
            columnEmptyText,
            counter,
            type,
            marginSM,
            subName: subNameRecord.get(uniqueKey),
            editableUtils,
          };
          return columnRender<T>(renderProps);
        },
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    ?.filter(
      (item) => !item.hideInTable,
    ) as unknown as ColumnToColumnReturnType<T>;
}
