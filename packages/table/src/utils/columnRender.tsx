import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type {
  ProFieldValueType,
  ProSchemaComponentTypes,
  ProTableEditableFnType,
  UseEditableUtilType,
} from '@ant-design/pro-utils';
import { LabelIconTip, genCopyable, isNil } from '@ant-design/pro-utils';
import { AnyObject } from 'antd/es/_util/type';
import get from 'rc-util/lib/utils/get';
import React from 'react';
import { isMergeCell } from '.';
import type { ContainerType } from '../Store/Provide';
import type { ActionType, ProColumns } from '../typing';
import cellRenderToFromItem from './cellRenderToFromItem';

/** 转化列的定义 */
type ColumnRenderInterface<T> = {
  columnProps: ProColumns<T>;
  text: any;
  rowData: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  counter: ReturnType<ContainerType>;
  editableUtils: UseEditableUtilType;
  subName: string[];
  marginSM?: number;
};

/**
 * 增加了 icon 的功能 render title
 *
 * @param item
 */
export const renderColumnsTitle = (item: ProColumns<any>) => {
  const { title } = item;
  const ellipsis =
    typeof item?.ellipsis === 'boolean'
      ? item?.ellipsis
      : item?.ellipsis?.showTitle;
  if (title && typeof title === 'function') {
    return title(
      item,
      'table',
      //@ts-expect-error
      <LabelIconTip label={null} tooltip={item.tooltip || item.tip} />,
    );
  }
  return (
    <LabelIconTip
      label={title}
      //@ts-expect-error
      tooltip={item.tooltip || item.tip}
      ellipsis={ellipsis}
    />
  );
};

/** 判断是否为不可编辑的单元格 */
function isNotEditableCell<T>(
  text: any,
  rowData: T,
  index: number,
  editable?: ProTableEditableFnType<T> | boolean,
) {
  if (typeof editable === 'boolean') {
    return editable === false;
  }
  return editable?.(text, rowData, index) === false;
}

/**
 * 默认的 filter 方法
 *
 * @param value
 * @param record
 * @param dataIndex
 * @returns
 */
export const defaultOnFilter = (
  value: string,
  record: any,
  dataIndex: string | string[],
) => {
  const recordElement = Array.isArray(dataIndex)
    ? get(record, dataIndex as string[])
    : record[dataIndex];
  const itemValue = String(recordElement) as string;

  return String(itemValue) === String(value);
};

/**
 * 这个组件负责单元格的具体渲染
 *
 * @param param0
 */
export function columnRender<T extends AnyObject>({
  columnProps,
  text,
  rowData,
  index,
  columnEmptyText,
  counter,
  type,
  subName,
  marginSM,
  editableUtils,
}: ColumnRenderInterface<T>): any {
  const { action, prefixName } = counter;
  const { isEditable, recordKey } = editableUtils.isEditable({
    ...rowData,
    index,
  });
  const { renderText = (val: any) => val } = columnProps;

  const renderTextStr = renderText(text, rowData, index, action as ActionType);
  const mode =
    isEditable &&
    !isNotEditableCell(text, rowData, index, columnProps?.editable)
      ? 'edit'
      : 'read';

  const textDom = cellRenderToFromItem<T>({
    text: renderTextStr,
    valueType: (columnProps.valueType as ProFieldValueType) || 'text',
    index,
    rowData,
    subName,
    columnProps: {
      ...columnProps,
      // 为了兼容性，原来写了个错别字
      // @ts-ignore
      entry: rowData,
      entity: rowData,
    },
    counter,
    columnEmptyText,
    type,
    recordKey,
    mode,
    prefixName,
    editableUtils,
  });

  const dom: React.ReactNode =
    mode === 'edit'
      ? textDom
      : genCopyable(textDom, columnProps, renderTextStr);

  /** 如果是编辑模式，并且 renderFormItem 存在直接走 renderFormItem */
  if (mode === 'edit') {
    if (columnProps.valueType === 'option') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: marginSM,
            justifyContent:
              columnProps.align === 'center' ? 'center' : 'flex-start',
          }}
        >
          {editableUtils.actionRender({
            ...rowData,
            index: columnProps.index || index,
          })}
        </div>
      );
    }
    return dom;
  }

  if (!columnProps.render) {
    const isReactRenderNode =
      React.isValidElement(dom) || ['string', 'number'].includes(typeof dom);
    return !isNil(dom) && isReactRenderNode ? dom : null;
  }

  const renderDom = columnProps.render(
    dom,
    rowData,
    index,
    {
      ...(action as ActionType),
      ...editableUtils,
    },
    {
      ...columnProps,
      isEditable,
      type: 'table',
    },
  );

  // 如果是合并单元格的，直接返回对象
  if (isMergeCell(renderDom)) {
    return renderDom;
  }

  if (
    renderDom &&
    columnProps.valueType === 'option' &&
    Array.isArray(renderDom)
  ) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 8,
        }}
      >
        {renderDom}
      </div>
    );
  }
  return renderDom as React.ReactNode;
}
