import type { CascaderProps } from 'antd';
import { Space } from 'antd';
import React from 'react';
import { objectToMap, proFieldParsingText } from '../../../utils/proFieldParsingText';
import type { ProFieldFC } from '../../types';
import type { GroupProps } from './types';

type OptionsValueEnum = Map<any, any> | undefined;

/**
 * #9023 按层级路径取每层的完整 option 对象，
 * 避免不同层级 value 重复时扁平 Map 相互覆盖
 */
function getOptionsByPath(
  text: unknown[],
  options: CascaderProps['options'],
  fieldNames: { value: string; children: string },
): Record<string, any>[] {
  const matchedOptions: Record<string, any>[] = [];
  let currentLevel: CascaderProps['options'] = options;

  for (const value of text) {
    if (!Array.isArray(currentLevel)) break;
    const matched = currentLevel.find(
      (option) => (option as any)?.[fieldNames.value] === value,
    );
    if (!matched) break;
    matchedOptions.push(matched as Record<string, any>);
    currentLevel = (matched as any)[fieldNames.children];
  }
  return matchedOptions;
}

export function FieldCascaderRead(
  props: Omit<Parameters<ProFieldFC<GroupProps>>[0], 'options'> & {
    optionsValueEnum: OptionsValueEnum;
    /** #9023/#9001 request 拉取的级联选项（read 模式按路径解析的兜底数据源） */
    fetchOptions?: CascaderProps['options'] | any[];
  },
) {
  const { mode, render, optionsValueEnum, fetchOptions, ...rest } = props;

  // options 优先级：静态 fieldProps.options > request 拉取的 fetchOptions
  const options = (rest.fieldProps?.options ??
    fetchOptions) as CascaderProps['options'];

  const fieldNames = {
    value: 'value',
    label: 'label',
    children: 'children',
    ...(rest.fieldProps?.fieldNames as any),
  };
  // 兼容 fieldNames.options 作为 children 键名（与 antd Cascader 历史行为一致）
  const resolvedFieldNames = {
    ...fieldNames,
    children: fieldNames.children ?? (fieldNames as any).options,
  };

  const valueEnum = objectToMap(rest.valueEnum || optionsValueEnum);

  const renderPath = (path: unknown[]): React.ReactNode => {
    // #9023 按层级路径取每层的 option（不受跨层同 value 覆盖影响）
    const pathOptions = getOptionsByPath(path, options, resolvedFieldNames);
    if (pathOptions.length === 0) return null;

    // #9001 readonly 支持 displayRender 自定义展示
    if (typeof rest.fieldProps?.displayRender === 'function') {
      const labels = pathOptions.map(
        (option) => option[fieldNames.label] ?? option[fieldNames.value],
      );
      return rest.fieldProps.displayRender(labels, path);
    }

    return pathOptions.map((option, index) => (
      <React.Fragment key={index}>
        {index > 0 && ','}
        {/*
         * #9023/#9001 渲染策略：
         * - 用户显式传入 valueEnum（含 status/Badge 需求）→ 逐层 value 走
         *   proFieldParsingText，保留状态徽标语义
         * - 仅 options（valueEnum 是 options 扁平化而来、无 status）→ 直接按
         *   路径解析的 label 文本展示，跨层同 value 不再相互覆盖
         */}
        {rest.valueEnum
          ? proFieldParsingText(option[fieldNames.value], valueEnum)
          : (option[fieldNames.label] ?? option[fieldNames.value])}
      </React.Fragment>
    ));
  };

  let dom: React.ReactNode;

  if (rest.fieldProps?.multiple && Array.isArray(rest.text)) {
    // 多选：每个选中项是路径数组
    const paths = rest.text as unknown as unknown[][];
    const hasPathOptions = Array.isArray(options) && options.length > 0;
    dom = hasPathOptions ? (
      <Space size={2} wrap separator="，">
        {paths.map((path, index) => (
          <span key={index}>{renderPath(path)}</span>
        ))}
      </Space>
    ) : (
      // 无 options 时保持原有 valueEnum 映射行为
      proFieldParsingText(rest.text, valueEnum)
    );
  } else if (Array.isArray(rest.text)) {
    // 单选：值是路径数组（或退化的一维值数组）
    dom = renderPath(rest.text as unknown[]) ?? proFieldParsingText(
      rest.text,
      valueEnum,
    );
  } else if (rest.text !== undefined && rest.text !== null) {
    // 单值
    dom =
      renderPath([rest.text] as unknown[]) ??
      proFieldParsingText(rest.text, valueEnum);
  } else {
    dom = proFieldParsingText(rest.text, valueEnum);
  }

  if (render) {
    return render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>) ?? null;
  }
  return <>{dom}</>;
}
