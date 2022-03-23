import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design/pro-utils';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { TableColumnType, TableProps } from 'antd';
import { Table } from 'antd';
import { runFunction } from '@ant-design/pro-utils';
import { omitBoolean, omitUndefinedAndEmptyArr } from '@ant-design/pro-utils';
import { proFieldParsingValueEnumToArray } from '@ant-design/pro-field';

import type { ProColumns, ProColumnGroupType } from '../typing';
import type { useContainer } from '../container';
import { genColumnKey } from './index';
import { defaultOnFilter, renderColumnsTitle, columnRender } from './columnRender';

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genProColumnToColumn<T>(
  params: {
    columns: ProColumns<T, any>[];
    counter: ReturnType<typeof useContainer>;
    columnEmptyText: ProFieldEmptyText;
    type: ProSchemaComponentTypes;
    editableUtils: UseEditableUtilType;
  } & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>,
): (TableColumnType<T> & {
  index?: number;
  isExtraColumns?: boolean;
  extraColumn?: typeof Table.EXPAND_COLUMN | typeof Table.SELECTION_COLUMN;
})[] {
  const {
    columns,
    counter,
    columnEmptyText,
    type,
    editableUtils,
    rowKey = 'id',
    childrenColumnName = 'children',
  } = params;

  const subNameRecord = new Map();

  return columns
    .map((columnProps, columnsIndex) => {
      const {
        key,
        dataIndex,
        valueEnum,
        valueType = 'text',
        children,
        onFilter,
        filters = [],
      } = columnProps as ProColumnGroupType<T, any>;
      const columnKey = genColumnKey(key || dataIndex?.toString(), columnsIndex);
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        };
      }
      const isExtraColumns =
        columnProps === Table.EXPAND_COLUMN || columnProps === Table.SELECTION_COLUMN;
      if (isExtraColumns) {
        return {
          index: columnsIndex,
          isExtraColumns: true,
          hideInTable: false,
          hideInSetting: true,
          extraColumn: columnProps,
        };
      }
      const config = counter.columnsMap[columnKey] || { fixed: columnProps.fixed };

      const genOnFilter = () => {
        if (onFilter === true) {
          return (value: string, row: T) => defaultOnFilter(value, row, dataIndex as string[]);
        }
        return omitBoolean(onFilter);
      };

      let keyName: React.Key = rowKey as string;

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
        fixed: config.fixed,
        width: columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: (columnProps as ProColumnGroupType<T, any>).children
          ? genProColumnToColumn({
              ...params,
              columns: (columnProps as ProColumnGroupType<T, any>)?.children,
            })
          : undefined,
        render: (text: any, rowData: T, index: number) => {
          if (typeof rowKey === 'function') {
            keyName = rowKey(rowData, index);
          }

          let uniqueKey: any;
          if (Reflect.has(rowData as any, keyName)) {
            uniqueKey = rowData[keyName];
            const parentInfo = subNameRecord.get(uniqueKey) || [];
            rowData[childrenColumnName]?.forEach((item: any) => {
              const itemUniqueKey = item[keyName];
              if (!subNameRecord.has(itemUniqueKey)) {
                subNameRecord.set(itemUniqueKey, parentInfo.concat([index, childrenColumnName]));
              }
            });
          }

          const renderProps = {
            columnProps,
            text,
            rowData,
            index,
            columnEmptyText,
            counter,
            type,
            subName: subNameRecord.get(uniqueKey),
            editableUtils,
          };

          return columnRender<T>(renderProps);
        },
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    .filter((item) => !item.hideInTable) as unknown as (TableColumnType<T> & {
    index?: number;
    isExtraColumns?: boolean;
    extraColumn?: typeof Table.EXPAND_COLUMN | typeof Table.SELECTION_COLUMN;
  })[];
}
