import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type {
  ProFieldValueType,
  ProSchemaComponentTypes,
  ProTableEditableFnType,
  UseEditableUtilType,
} from '@ant-design/pro-utils';
import { genCopyable, isNil, LabelIconTip } from '@ant-design/pro-utils';
import { Modal, Tooltip, Progress } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
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
};

/**
 * 增加了 icon 的功能 render title
 *
 * @param item
 */
const openStatisticsModal = (column: ProColumns<any>, counter: ReturnType<ContainerType> & { dataSource?: any[] }) => {
  if (!counter?.dataSource?.length) return;

  Modal.info({
    title: `Statistics for ${column.title || column.dataIndex}`,
    content: (
      <div style={{ padding: '16px 0' }}>
        {(() => {
          const values = counter.dataSource.map((row: any) => row[column.dataIndex as string]);
          const isNumeric = values.every((v: any) => !isNaN(Number(v)));
          
          if (isNumeric) {
            const numValues = values.map(Number);
            const min = Math.min(...numValues);
            const max = Math.max(...numValues);
            const avg = numValues.reduce((a: number, b: number) => a + b, 0) / numValues.length;
            
            // Create 10 buckets for distribution
            const buckets = Array(10).fill(0);
            const bucketSize = (max - min) / 10;
            
            numValues.forEach((val: number) => {
              const bucketIndex = Math.min(Math.floor((val - min) / bucketSize), 9);
              buckets[bucketIndex]++;
            });
            
            const maxCount = Math.max(...buckets);
            
            return (
              <>
                <div style={{ marginBottom: 16 }}>
                  <div>Average: {avg.toFixed(2)}</div>
                  <div>Range: {min.toFixed(2)} - {max.toFixed(2)}</div>
                </div>
                <h4>Distribution</h4>
                {buckets.map((count, i) => {
                  const start = min + (i * bucketSize);
                  const end = start + bucketSize;
                  const percentage = (count / maxCount) * 100;
                  return (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{start.toFixed(1)} - {end.toFixed(1)}</span>
                        <span>{count} ({((count/values.length)*100).toFixed(1)}%)</span>
                      </div>
                      <Progress percent={percentage} showInfo={false} />
                    </div>
                  );
                })}
              </>
            );
          } else {
            // Categorical data
            const frequencies: Record<string, number> = {};
            values.forEach((val: any) => {
              frequencies[String(val)] = (frequencies[String(val)] || 0) + 1;
            });
            
            const entries = Object.entries(frequencies);
            const maxCount = Math.max(...entries.map(([_, count]) => count));
            
            return (
              <>
                <div style={{ marginBottom: 16 }}>
                  <div>Total categories: {entries.length}</div>
                  <div>Most common: {entries.sort(([,a], [,b]) => b - a)[0][0]}</div>
                </div>
                <h4>Distribution</h4>
                {entries.map(([value, count]) => {
                  const percentage = (count / maxCount) * 100;
                  return (
                    <div key={value} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{value}</span>
                        <span>{count} ({((count/values.length)*100).toFixed(1)}%)</span>
                      </div>
                      <Progress percent={percentage} showInfo={false} />
                    </div>
                  );
                })}
              </>
            );
          }
        })()}
      </div>
    ),
    width: 600,
  });
};

export const renderColumnsTitle = (
  item: ProColumns<any>,
  counter?: ReturnType<ContainerType> & { dataSource?: any[] }
) => {
  const { title, statistics } = item;
  const ellipsis = typeof item?.ellipsis === 'boolean' ? item?.ellipsis : item?.ellipsis?.showTitle;
  
  const handleStatisticsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (counter) {
      openStatisticsModal(item, counter);
    }
  };
  if (title && typeof title === 'function') {
    return title(item, 'table', <LabelIconTip label={null} tooltip={item.tooltip || item.tip} />);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <LabelIconTip label={title} tooltip={item.tooltip || item.tip} ellipsis={ellipsis} />
      {statistics && !item.render && item.dataIndex && (
        <Tooltip title="Show column statistics">
          <BarChartOutlined
            style={{ cursor: 'pointer' }}
            onClick={handleStatisticsClick}
          />
        </Tooltip>
      )}
    </div>
  );
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
  subName,
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
    mode === 'edit' ? textDom : genCopyable(textDom, columnProps, renderTextStr);

  /** 如果是编辑模式，并且 renderFormItem 存在直接走 renderFormItem */
  if (mode === 'edit') {
    if (columnProps.valueType === 'option') {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
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

  if (renderDom && columnProps.valueType === 'option' && Array.isArray(renderDom)) {
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
