import type { MutableRefObject, ReactNode } from 'react';
import { omitUndefined, runFunction } from '../../../utils';
import type { ProFormInstance } from '../../BaseForm';
import type { ItemType, ProFormColumnsType } from './typing';

/**
 * 将列上的 `fieldProps` / `formItemProps`（对象或函数）转为 `warpField` 使用的
 * `getFieldProps` / `getFormItemProps`（无参函数，内部再 `runFunction`）。
 * 与 `BetaSchemaForm` 内原 `genItems` 逻辑一致，便于单测与文档引用。
 */
export function buildSchemaColumnGetters<T, ValueType>(options: {
  originItem: ProFormColumnsType<T, ValueType>;
  formRef: MutableRefObject<ProFormInstance<any> | undefined>;
}): Pick<ItemType<T, ValueType>, 'getFieldProps' | 'getFormItemProps'> {
  const { originItem, formRef } = options;
  return {
    getFieldProps: originItem.fieldProps
      ? () =>
          runFunction(
            originItem.fieldProps,
            formRef.current,
            originItem,
          )
      : undefined,
    getFormItemProps: originItem.formItemProps
      ? () =>
          runFunction(
            originItem.formItemProps,
            formRef.current,
            originItem,
          )
      : undefined,
  };
}

/**
 * 将 `ProFormColumnsType` 与已解析的 `title`/`label`、getter 合并为 `renderValueType` 使用的 `ItemType`。
 * 不含 `hideInForm` 过滤、`sort`、`renderValueType` 调用（仍在 `BetaSchemaForm` 内）。
 */
export function mergeOriginColumnToItemType<T, ValueType>(options: {
  originItem: ProFormColumnsType<T, ValueType>;
  index: number;
  title: ReactNode;
  label: ReactNode;
  getters: Pick<
    ItemType<T, ValueType>,
    'getFieldProps' | 'getFormItemProps'
  >;
}): ItemType<T, ValueType> {
  const { originItem, index, title, label, getters } = options;
  return omitUndefined({
    title,
    label,
    name: originItem.name,
    valueType: runFunction(originItem.valueType, {}),
    key: originItem.key || originItem.dataIndex || index,
    columns: originItem.columns,
    valueEnum: originItem.valueEnum,
    dataIndex: originItem.dataIndex || originItem.key,
    initialValue: originItem.initialValue,
    width: originItem.width,
    index: originItem.index,
    readonly: originItem.readonly,
    colSize: originItem.colSize,
    colProps: originItem.colProps,
    rowProps: originItem.rowProps,
    className: originItem.className,
    tooltip: originItem.tooltip,
    dependencies: originItem.dependencies,
    proFieldProps: originItem.proFieldProps,
    ignoreFormItem: originItem.ignoreFormItem,
    ...getters,
    render: originItem.render,
    formItemRender: originItem.formItemRender,
    renderText: originItem.renderText,
    request: originItem.request,
    params: originItem.params,
    transform: originItem.transform,
    convertValue: originItem.convertValue,
    debounceTime: originItem.debounceTime,
    defaultKeyWords: originItem.defaultKeyWords,
  }) as ItemType<T, ValueType>;
}
