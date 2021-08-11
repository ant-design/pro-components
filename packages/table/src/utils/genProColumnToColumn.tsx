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
import { SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import React from 'react';

// 用于创建可拖拽把手组件的工厂
const handleCreator = (handle: React.ReactNode) => SortableHandle(() => <>{handle}</>);
// 默认拖拽把手
const DragHandle = handleCreator(
  <MenuOutlined className="dragSortDefaultHandle" style={{ cursor: 'grab', color: '#999' }} />,
);

export type GenProColumnToColumnProps<T> = {
  columns: ProColumns<T, any>[];
  counter: ReturnType<typeof useContainer>;
  columnEmptyText: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  editableUtils: UseEditableUtilType;
  dragSortKey?: string;
  dragSortHandlerRender?: (rowData: T, idx: number) => React.ReactNode;
};

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param props
 */
export function genProColumnToColumn<T>(
  props: GenProColumnToColumnProps<T>,
): (TableColumnType<T> & { index?: number })[] {
  const {
    columns,
    counter,
    columnEmptyText,
    type,
    editableUtils,
    dragSortKey,
    dragSortHandlerRender,
  } = props;
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
      const columnKey = genColumnKey(key, columnsIndex);
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueEnum && !valueType && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...columnProps,
        };
      }
      const config = counter.columnsMap[columnKey] || { fixed: columnProps.fixed };

      const genOnFilter = () => {
        if (onFilter === true) {
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
          // 当用户配置了dragSortKey并且dragSortKey可以跟列数据的dataIndex，key匹配时启动拖拽排序功能
          if (
            dragSortKey &&
            (dragSortKey === columnProps.dataIndex || dragSortKey === columnProps.key)
          ) {
            // 为不影响用户的其他配置，copy一份原始配置和原始渲染方法
            const oriColumnProps = { ...columnProps };
            const oriColumnRender = columnProps.render;
            // 重写原始渲染方法，增加拖拽排序把手组件渲染逻辑
            oriColumnProps.render = (...args: any[]) => {
              const RealHandle = dragSortHandlerRender
                ? handleCreator(dragSortHandlerRender(rowData, index))
                : DragHandle;
              return (
                <>
                  <RealHandle />
                  {/* @ts-ignore */}
                  {oriColumnRender && oriColumnRender(...args)}
                </>
              );
            };
            const renderProps = {
              columnProps: oriColumnProps,
              text,
              rowData,
              index,
              columnEmptyText,
              counter,
              type,
              editableUtils,
            };

            return columnRender<T>(renderProps);
          }
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
    .filter((item) => !item.hideInTable) as unknown as (TableColumnType<T> & {
    index?: number;
  })[];
}
