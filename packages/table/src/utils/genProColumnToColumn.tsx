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
import type { ContainerType } from '../Store/Provide';
import type { ProColumnGroupType, ProColumns } from '../typing';
import {
  columnRender,
  defaultOnFilter,
  renderColumnsTitle,
} from './columnRender';
import { genColumnKey } from './index';

type ColumnToColumnReturnType<T> = (TableColumnType<T> & {
  index?: number;
  isExtraColumns?: boolean;
  extraColumn?: typeof Table.EXPAND_COLUMN | typeof Table.SELECTION_COLUMN;
})[];

type ColumnToColumnParams<T> = {
  columns: ProColumns<T, any>[];
  counter: ReturnType<ContainerType>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
} & Pick<TableProps<T>, 'rowKey' | 'childrenColumnName'>;

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genProColumnToColumn<T>(
  params: ColumnToColumnParams<T>,
  parents?: ProColumnGroupType<T, any>,
): ColumnToColumnReturnType<T> {
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
    ?.map((columnProps, columnsIndex) => {
      const {
        key,
        dataIndex,
        valueEnum,
        valueType = 'text',
        children,
        onFilter,
        filters = [],
      } = columnProps as ProColumnGroupType<T, any>;
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

      /**
       * 是不是展开行和多选按钮
       */
      const isExtraColumns =
        columnProps === Table.EXPAND_COLUMN ||
        columnProps === Table.SELECTION_COLUMN;

      if (isExtraColumns) {
        return {
          index: columnsIndex,
          isExtraColumns: true,
          hideInSearch: true,
          hideInTable: false,
          hideInForm: true,
          hideInSetting: true,
          extraColumn: columnProps,
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
          ? genProColumnToColumn(
              {
                ...params,
                columns: (columnProps as ProColumnGroupType<T, any>)?.children,
              },
              { ...columnProps, key: columnKey } as ProColumnGroupType<T, any>,
            )
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
                subNameRecord.set(
                  itemUniqueKey,
                  parentInfo.concat([index, childrenColumnName]),
                );
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
    ?.filter((item) => !item.hideInTable) as unknown as (TableColumnType<T> & {
    index?: number;
    isExtraColumns?: boolean;
    extraColumn?: typeof Table.EXPAND_COLUMN | typeof Table.SELECTION_COLUMN;
  })[];
}
