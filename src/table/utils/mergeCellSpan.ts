/**
 * 同值单元格纵向自动合并（autoMerge / mergeFields）的行合并数计算。
 *
 * 只针对当前渲染页的扁平数据计算，连续同值才合并，与 antd Table 原生
 * `onCell` 返回 `rowSpan` 的能力配套使用：组首行 rowSpan 为组长度，
 * 组内后续行 rowSpan 为 0（不渲染）。
 */

import type { TableColumnType } from 'antd';
import { Table } from 'antd';
import type { Key } from 'react';
import type { ProColumns } from '../typing';

/** 合并字段描述：key 为归一化后的字段标识，getValue 取记录中的对比值 */
export type MergeFieldDescriptor<T> = {
  key: string;
  getValue: (record: T) => unknown;
};

/** 字段标识 -> （记录 -> 该行 rowSpan） */
export type RowSpanMap<T> = Map<string, Map<T, number>>;

type DataIndex = Key | readonly Key[];

/**
 * 归一化 dataIndex 为合并字段标识：字符串原样返回，数组以点号连接。
 * 与 genColumnKey 类似，保证 mergeFields 字符串能匹配列上的 dataIndex。
 */
export function normalizeMergeFieldKey(
  dataIndex: DataIndex | undefined,
): string | undefined {
  if (dataIndex === undefined || dataIndex === null) return undefined;
  return Array.isArray(dataIndex) ? dataIndex.join('.') : String(dataIndex);
}

/** 按 dataIndex 取记录值；单段字符串未精确命中时回退点号路径取值 */
function getMergeFieldValue<T>(record: T, dataIndex: DataIndex): unknown {
  if (record === null || typeof record !== 'object') return undefined;
  const path: readonly PropertyKey[] = Array.isArray(dataIndex)
    ? (dataIndex as readonly PropertyKey[])
    : [dataIndex as PropertyKey];
  if (path.length === 1) {
    const key = path[0];
    const row = record as Record<PropertyKey, unknown>;
    if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
    if (typeof key === 'string' && key.includes('.')) {
      return getMergeFieldValue(record, key.split('.'));
    }
    return row[key];
  }
  let current: unknown = record;
  for (const segment of path) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<PropertyKey, unknown>)[segment];
  }
  return current;
}

function isMarkerColumn(column: unknown): boolean {
  return column === Table.EXPAND_COLUMN || column === Table.SELECTION_COLUMN;
}

/** 深度优先拍平列配置（含分组表头 children） */
function flattenProColumns<T>(
  columns: readonly unknown[] | undefined,
): ProColumns<T, any>[] {
  const result: ProColumns<T, any>[] = [];
  const walk = (cols: readonly unknown[] | undefined) => {
    cols?.forEach((column) => {
      if (!column || isMarkerColumn(column)) return;
      const proColumn = column as ProColumns<T, any>;
      result.push(proColumn);
      if (proColumn.children?.length) walk(proColumn.children);
    });
  };
  walk(columns);
  return result;
}

/**
 * 解析有序的合并字段描述符列表：
 * mergeFields 的字段顺序优先（多级合并顺序），autoMerge: true 的列按列顺序
 * 补充，同名字段去重。取值器优先使用列上真实的 dataIndex（支持数组路径），
 * mergeFields 指定但无对应列时回退为字段路径取值。
 */
export function resolveMergeFieldDescriptors<T>(
  columns: ProColumns<T, any>[] | undefined,
  mergeFields?: string[],
): MergeFieldDescriptor<T>[] {
  const flatColumns = flattenProColumns(columns);
  const columnDataIndexMap = new Map<string, DataIndex>();
  flatColumns.forEach((column) => {
    const key = normalizeMergeFieldKey(column.dataIndex as DataIndex);
    if (key !== undefined && !columnDataIndexMap.has(key)) {
      columnDataIndexMap.set(key, column.dataIndex as DataIndex);
    }
  });

  const seen = new Set<string>();
  const descriptors: MergeFieldDescriptor<T>[] = [];
  const pushField = (fieldKey: string | undefined) => {
    if (!fieldKey || seen.has(fieldKey)) return;
    seen.add(fieldKey);
    const dataIndex = columnDataIndexMap.get(fieldKey) ?? fieldKey;
    descriptors.push({
      key: fieldKey,
      getValue: (record: T) => getMergeFieldValue(record, dataIndex),
    });
  };

  mergeFields?.forEach(pushField);
  flatColumns.forEach((column) => {
    if (column.autoMerge) {
      pushField(normalizeMergeFieldKey(column.dataIndex as DataIndex));
    }
  });
  return descriptors;
}

/**
 * 为命中合并字段的列包装 onCell，注入计算出的 rowSpan。
 *
 * - 未命中的列保持原引用，不影响下游 memo
 * - 用户（或编辑态包装层）onCell 显式返回 rowSpan 时优先，支持自定义覆盖
 * - spanMap 之外的记录（如展开行等不在当前页数据中的记录）默认 rowSpan 为 1
 * - Table.EXPAND_COLUMN / Table.SELECTION_COLUMN 标记列直接透传
 */
export function wrapColumnsWithRowSpan<T>(
  columns: (TableColumnType<T> & { index?: number })[],
  spanMap: RowSpanMap<T>,
): (TableColumnType<T> & { index?: number })[] {
  return columns.map((column) => {
    if (isMarkerColumn(column)) return column;
    let nextColumn = column;
    // TableColumnType 为分组列与普通列的联合类型，children 仅存在于分组列
    const childColumns = (
      column as { children?: (TableColumnType<T> & { index?: number })[] }
    ).children;
    if (childColumns?.length) {
      nextColumn = {
        ...nextColumn,
        children: wrapColumnsWithRowSpan(childColumns, spanMap),
      } as typeof nextColumn;
    }
    const fieldKey = normalizeMergeFieldKey(
      nextColumn.dataIndex as DataIndex | undefined,
    );
    const spans = fieldKey ? spanMap.get(fieldKey) : undefined;
    if (!spans) return nextColumn;
    const prevOnCell = nextColumn.onCell;
    return {
      ...nextColumn,
      onCell: (record: T, index?: number) => {
        const cellProps = prevOnCell ? prevOnCell(record, index) : undefined;
        // 用户手动 onCell 显式返回 rowSpan 时优先于自动合并结果
        if (cellProps && cellProps.rowSpan !== undefined) return cellProps;
        return { ...cellProps, rowSpan: spans.get(record) ?? 1 };
      },
    };
  });
}

/**
 * 计算每个合并字段在当前页数据上的 rowSpan 分布。
 *
 * 多级合并为链式语义：第 N 个字段的合并延续条件是前 N-1 个字段全部延续
 * 且本字段与上一行同值（如先按城市合并、再按区域合并时，区域不会跨城市
 * 组错误合并）。值对比使用严格相等（===），null/undefined 等空值同值时也
 * 参与合并。
 *
 * isRowMergeBoundary 标记的断开行（如编辑中的行）不并入任何组，且会打断
 * 前后行的合并——否则该行的合并字段单元格会被隐藏，编辑输入框不可见。
 */
export function calcRowSpanMap<T>(
  pageData: readonly T[],
  fields: MergeFieldDescriptor<T>[],
  isRowMergeBoundary?: (record: T, index: number) => boolean,
): RowSpanMap<T> {
  const spanMap: RowSpanMap<T> = new Map(
    fields.map((field) => [field.key, new Map<T, number>()]),
  );
  const rowCount = pageData.length;
  if (rowCount === 0 || fields.length === 0) return spanMap;

  // 预取每行每字段的对比值，避免扫描过程中重复调用 getter
  const values = pageData.map((record) =>
    fields.map((field) => field.getValue(record)),
  );
  /** 断开行标记：自身不并入任何组，且下一行不得延续跨断点合并 */
  const rowBreaks = pageData.map((record, index) =>
    isRowMergeBoundary ? isRowMergeBoundary(record, index) : false,
  );
  /** 每个字段当前未闭合合并组的起始行下标 */
  const groupStart = fields.map(() => 0);

  /** 闭合字段 fieldIndex 上 [起始行, endExclusive) 的合并组并写入 span */
  const closeGroup = (fieldIndex: number, endExclusive: number) => {
    const spans = spanMap.get(fields[fieldIndex].key)!;
    const start = groupStart[fieldIndex];
    spans.set(pageData[start], endExclusive - start);
    for (let i = start + 1; i < endExclusive; i += 1) {
      spans.set(pageData[i], 0);
    }
  };

  // i === rowCount 为哨兵：强制闭合所有未闭合的组
  for (let i = 1; i <= rowCount; i += 1) {
    /** 当前行是否仍处在父级字段的合并组内（父组断开则子组必须断开） */
    let parentContinues = true;
    for (let f = 0; f < fields.length; f += 1) {
      const continues: boolean =
        i < rowCount &&
        parentContinues &&
        !rowBreaks[i] &&
        !rowBreaks[i - 1] &&
        values[i][f] === values[i - 1][f];
      if (!continues) {
        closeGroup(f, i);
        groupStart[f] = i;
      }
      parentContinues = continues;
    }
  }
  return spanMap;
}
