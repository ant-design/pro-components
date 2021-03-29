import type { ProSchemaComponentTypes, UseEditableUtilType } from '@ant-design/pro-utils';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { TableColumnType } from 'antd';
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
export function genProColumnToColumn<T>(props: {
  columns: ProColumns<T, any>[];
  counter: ReturnType<typeof useContainer>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
}): (TableColumnType<T> & { index?: number })[] {
  const { columns, counter, columnEmptyText, type, editableUtils } = props;
  return (columns
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
      const columnKey = genColumnKey(key, columnsIndex);
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        };
      }
      const { propsRef } = counter;
      const config = counter.columnsMap[columnKey] || { fixed: columnProps.fixed };

      const genOnFilter = () => {
        if (!propsRef.current?.request || onFilter === true) {
          return (value: string, row: T) => defaultOnFilter(value, row, dataIndex as string[]);
        }
        return omitBoolean(onFilter);
      };
      const tempColumns = {
        index: columnsIndex,
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
        ellipsis: false,
        fixed: config.fixed,
        width: columnProps.width || (columnProps.fixed ? 200 : undefined),
        children: (columnProps as ProColumnGroupType<T, any>).children
          ? genProColumnToColumn({
              ...props,
              columns: (columnProps as ProColumnGroupType<T, any>)?.children,
            })
          : undefined,
        render: (text: any, rowData: T, index: number) => {
          const renderProps = {
            columnProps,
            text,
            rowData,
            index,
            columnEmptyText,
            counter,
            type,
            editableUtils,
          };
          return columnRender<T>(renderProps);
        },
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    .filter((item) => !item.hideInTable) as unknown) as (TableColumnType<T> & {
    index?: number;
  })[];
}
