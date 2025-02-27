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
  } = params;

  const subNameRecord = new Map();

  // 需要配合 valueEnum 使用的 valueType 类型
  const needValueEnumTypes = [
    'select',
    'radio',
    'radioButton',
    'checkbox',
    'treeSelect',
  ];

  // 基础的 valueType，不需要 valueEnum
  const basicValueTypes = [
    'text',
    'password',
    'money',
    'textarea',
    'date',
    'dateTime',
    'dateWeek',
    'dateMonth',
    'dateQuarter',
    'dateYear',
    'dateRange',
    'dateTimeRange',
    'time',
    'timeRange',
    'digit',
    'progress',
    'percent',
    'second',
    'avatar',
    'code',
    'switch',
    'fromNow',
    'image',
    'jsonCode',
    'color',
    'cascader',
  ];

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
      } = columnProps as ProColumns<T, any>;
      const columnKey = genColumnKey(
        key || dataIndex?.toString(),
        [parents?.key, columnsIndex].filter(Boolean).join('-'),
      );
      // 修改判断逻辑：
      // 1. 如果是基础类型，不需要 Pro 处理
      // 2. 如果有 valueEnum 但 valueType 不是需要 valueEnum 的类型，也不需要特殊处理
      const noNeedPro = 
        (basicValueTypes.includes(valueType) || !needValueEnumTypes.includes(valueType)) && 
        !children;
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
