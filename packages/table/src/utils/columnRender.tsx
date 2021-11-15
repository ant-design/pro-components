import React from 'react';
import { Space, Form, Typography } from 'antd';
import type {
  ProFieldValueType,
  ProSchemaComponentTypes,
  ProTableEditableFnType,
  UseEditableUtilType,
} from '@ant-design/pro-utils';
import { isNil, isDeepEqualReact } from '@ant-design/pro-utils';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import cellRenderToFromItem from './cellRenderToFromItem';
import { LabelIconTip } from '@ant-design/pro-utils';
import get from 'rc-util/lib/utils/get';

import type { ActionType, ProColumns } from '../typing';
import type { useContainer } from '../container';
import { isMergeCell } from '.';

/** 转化列的定义 */
type ColumnRenderInterface<T> = {
  columnProps: ProColumns<T>;
  text: any;
  rowData: T;
  index: number;
  columnEmptyText?: ProFieldEmptyText;
  type: ProSchemaComponentTypes;
  counter: ReturnType<typeof useContainer>;
  editableUtils: UseEditableUtilType;
};

/**
 * 增加了 icon 的功能 render title
 *
 * @param item
 */
export const renderColumnsTitle = (item: ProColumns<any>) => {
  const { title } = item;
  if (title && typeof title === 'function') {
    return title(item, 'table', <LabelIconTip label={title} tooltip={item.tooltip || item.tip} />);
  }
  return <LabelIconTip label={title} tooltip={item.tooltip || item.tip} ellipsis={item.ellipsis} />;
};

/** 判断可不可编辑 */
function isEditableCell<T>(
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

const isNeedTranText = (item: ProColumns<any>): boolean => {
  if (item?.valueType?.toString().startsWith('date')) {
    return true;
  }
  if (item?.valueType === 'select' || item?.valueEnum) {
    return true;
  }
  return false;
};

/**
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom
 * @param item
 * @param text
 */
export const genCopyable = (dom: React.ReactNode, item: ProColumns<any>, text: string) => {
  if (item.copyable || item.ellipsis) {
    const copyable =
      item.copyable && text
        ? {
            text,
            tooltips: ['', ''],
          }
        : undefined;

    /** 有些 valueType 需要设置copy的为string */
    const needTranText = isNeedTranText(item);
    const ellipsis =
      item.ellipsis && text
        ? {
            tooltip: needTranText ? <div className="pro-table-tooltip-text">{dom}</div> : text,
          }
        : false;
    return (
      <Typography.Text
        style={{
          width: '100%',
          margin: 0,
          padding: 0,
        }}
        title=""
        copyable={copyable}
        ellipsis={ellipsis}
      >
        {dom}
      </Typography.Text>
    );
  }
  return dom;
};

/**
 * 默认的 filter 方法
 *
 * @param value
 * @param record
 * @param dataIndex
 * @returns
 */
export const defaultOnFilter = (value: string, record: any, dataIndex: string | string[]) => {
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
export function columnRender<T>({
  columnProps,
  text,
  rowData,
  index,
  columnEmptyText,
  counter,
  type,
  editableUtils,
}: ColumnRenderInterface<T>): any {
  const { action, prefixName } = counter;
  const { isEditable, recordKey } = editableUtils.isEditable({ ...rowData, index });
  const { renderText = (val: any) => val } = columnProps;

  const renderTextStr = renderText(text, rowData, index, action as ActionType);
  const mode =
    isEditable && !isEditableCell(text, rowData, index, columnProps?.editable) ? 'edit' : 'read';

  const textDom = cellRenderToFromItem<T>({
    text: renderTextStr,
    valueType: (columnProps.valueType as ProFieldValueType) || 'text',
    index,
    rowData,
    columnProps: {
      ...columnProps,
      // 为了兼容性，原来写了个错别字
      // @ts-ignore
      entry: rowData,
      entity: rowData,
    },
    columnEmptyText,
    type,
    recordKey,
    mode,
    prefixName,
  });

  const dom: React.ReactNode =
    mode === 'edit' ? textDom : genCopyable(textDom, columnProps, renderTextStr);

  /** 如果是编辑模式，并且 renderFormItem 存在直接走 renderFormItem */
  if (mode === 'edit') {
    if (columnProps.valueType === 'option') {
      return (
        <Form.Item
          shouldUpdate={(prevValues, nextValues) => {
            return !isDeepEqualReact(get(prevValues, [recordKey]), get(nextValues, [recordKey]));
          }}
          noStyle
        >
          {(form: any) => (
            <Space size={16}>
              {editableUtils.actionRender(
                {
                  ...rowData,
                  index: columnProps.index || index,
                },
                form,
              )}
            </Space>
          )}
        </Form.Item>
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

  if (renderDom && columnProps.valueType === 'option' && Array.isArray(renderDom)) {
    return <Space size={16}>{renderDom}</Space>;
  }
  return renderDom as React.ReactNode;
}
