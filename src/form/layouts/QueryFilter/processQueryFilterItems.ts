import type { FormProps } from 'antd';
import type { ReactElement } from 'react';
import React from 'react';

export type ProcessedQueryFilterItem = {
  /** 渲染节点（preserve=false 时隐藏项为 null） */
  itemDom: React.ReactNode;
  /** 是否被折叠隐藏 */
  hidden: boolean;
  /** 该项占用的 Col span（hidden 时为 0） */
  colSpan: number;
};

export type ProcessQueryFilterItemsOptions = {
  items: React.ReactNode[];
  spanSize: { span: number; layout: FormProps['layout'] };
  /** 当前是否处于折叠状态 */
  collapsed: boolean;
  /** 折叠时最多展示几个表单项 */
  showLength: number;
  /** 是否保留隐藏项的 DOM（hidden=true 的 clone 而非 null） */
  preserve?: boolean;
  /** 是否忽略表单校验规则 */
  ignoreRules?: boolean;
};

export type ProcessQueryFilterItemsResult = {
  /** 经过处理的表单项列表 */
  processedList: ProcessedQueryFilterItem[];
  /**
   * 提交按钮列的 offset（用于对齐到最右列）
   *
   * 计算规则：当前行已占用的 span + 提交按钮自身 span，若超过 24 则折行到下一行。
   */
  submitterOffset: number;
  /**
   * 统计当前所有项（含换行填充）占用的总 span，用于判断是否需要展示 collapseRender。
   * 若 totalSpan < 24 且 totalSize <= showLength，则不需要折叠按钮。
   */
  totalSpan: number;
  /** 所有 colSize 之和（用于判断是否超出 showLength） */
  totalSize: number;
  /** currentSpan 对 24 取模后的余数，即最后一行已占用的 span */
  lastRowUsedSpan: number;
};

/**
 * 展开无 title 的 ProForm.Group，可选去除所有 rules
 */
export const flatMapQueryFilterItems = (
  items: React.ReactNode[],
  ignoreRules?: boolean,
): React.ReactNode[] => {
  return items?.flatMap((item: any) => {
    if (item?.type?.displayName === 'ProForm-Group' && !item.props?.title) {
      return item.props.children;
    }
    if (ignoreRules && React.isValidElement(item)) {
      return React.cloneElement(item, {
        ...(item.props as any),
        formItemProps: {
          ...(item.props as any)?.formItemProps,
          rules: [],
        },
      });
    }
    return item;
  });
};

/**
 * 纯函数：计算 QueryFilter 的表单项布局信息。
 *
 * 将原本散落在 QueryFilterContent 渲染阶段的命令式 `let` 变量计算
 * 提取为独立的纯函数，便于单独测试和阅读。
 *
 * **返回值说明：**
 * - `processedList`：每个表单项是否隐藏、colSpan 是多少
 * - `submitterOffset`：提交按钮的 Col offset，使按钮对齐到末尾
 * - `totalSpan`：所有项累计占用的 span（含换行填充），用于判断是否显示折叠按钮
 * - `totalSize`：所有项的 colSize 之和，用于判断是否超出 showLength
 * - `lastRowUsedSpan`：最后一行已占用的 span，用于外部计算 offset
 */
export function processQueryFilterItems({
  items,
  spanSize,
  collapsed,
  showLength,
  preserve,
  ignoreRules,
}: ProcessQueryFilterItemsOptions): ProcessQueryFilterItemsResult {
  const flatItems = flatMapQueryFilterItems(items, ignoreRules);

  let totalSpan = 0;
  let itemLength = 0;
  let firstRowFull = false;
  let totalSize = 0;
  let currentSpan = 0;

  const processedList: ProcessedQueryFilterItem[] = flatItems.map(
    (item, index) => {
      const colSize = React.isValidElement<any>(item)
        ? (item?.props?.colSize ?? 1)
        : 1;
      const colSpan = Math.min(spanSize.span * (colSize || 1), 24);

      totalSpan += colSpan;
      totalSize += colSize;

      if (index === 0) {
        firstRowFull =
          colSpan === 24 &&
          !(item as ReactElement<{ hidden: boolean }>)?.props?.hidden;
      }

      const hidden: boolean =
        (item as ReactElement<{ hidden: boolean }>)?.props?.hidden ||
        // 折叠时，超出 showLength 的项隐藏（第一项始终展示）
        (collapsed &&
          (firstRowFull || totalSize > showLength) &&
          !!index);

      itemLength += 1;

      const itemKey =
        (React.isValidElement(item) &&
          (item.key || `${(item.props as Record<string, any>)?.name}`)) ||
        index;

      if (React.isValidElement(item) && hidden) {
        if (!preserve) {
          return { itemDom: null, colSpan: 0, hidden: true };
        }
        return {
          itemDom: React.cloneElement(item, {
            hidden: true,
            key: itemKey || index,
          } as Record<string, any>),
          hidden: true,
          colSpan,
        };
      }

      return { itemDom: item, colSpan, hidden: false };
    },
  );

  // 第二遍：计算 currentSpan（需要知道换行填充），用于 offset 计算
  // 这里复用 processedList 的信息，不再需要 doms 阶段的 currentSpan
  let runningSpan = 0;
  for (const { itemDom, colSpan } of processedList) {
    const isHidden = (itemDom as ReactElement<{ hidden: boolean }>)?.props
      ?.hidden;
    if (isHidden) continue;
    if (24 - (runningSpan % 24) < colSpan) {
      // 当前行剩余位置不够，折行：填充剩余 span
      runningSpan += 24 - (runningSpan % 24);
    }
    runningSpan += colSpan;
  }

  const lastRowUsedSpan = runningSpan % 24;

  return {
    processedList,
    totalSpan,
    totalSize,
    lastRowUsedSpan,
    // submitterOffset 由调用方根据 lastRowUsedSpan + submitterColSpan 决定，
    // 这里返回一个语义化的中间值给调用方使用
    submitterOffset: lastRowUsedSpan,
  };
}
