import React from 'react';
import type { FormInstance, FormItemProps } from 'antd';
import { Form } from 'antd';
import type { ProFieldEmptyText, ProFieldPropsType } from '@ant-design/pro-field';
import ProField from '@ant-design/pro-field';
import type { ProFieldValueType, ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import { getFieldPropsOrFormItemProps, InlineErrorFormItem } from '@ant-design/pro-utils';

import type { ProColumnType } from '../index';
import get from 'rc-util/lib/utils/get';

const SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

/**
 * 拼接用于编辑的 key
 *
 * @param base 基本的 key
 * @param dataIndex 需要拼接的key
 */
export const spellNamePath = (base: React.Key, dataIndex: React.Key | React.Key[]): React.Key[] => {
  return [base, dataIndex].flat(1);
};

/**
 * 根据不同的类型来转化数值
 *
 * @param text
 * @param valueType
 */
function cellRenderToFromItem<T>(config: {
  text: string | number | React.ReactText[];
  valueType: ProColumnType['valueType'];
  index: number;
  rowData?: T;
  columnEmptyText?: ProFieldEmptyText;
  columnProps?: ProColumnType<T>;
  type?: ProSchemaComponentTypes;
  // 行的唯一 key
  recordKey?: React.Key;
  mode: 'edit' | 'read';
}): React.ReactNode {
  const { text, valueType, rowData, columnProps } = config;
  // 如果 valueType === text ，没必要多走一次 render
  if (
    (!valueType || ['textarea', 'text'].includes(valueType.toString())) &&
    // valueEnum 存在说明是个select
    !columnProps?.valueEnum &&
    config.mode === 'read'
  ) {
    // 如果是''、null、undefined 显示columnEmptyText
    return SHOW_EMPTY_TEXT_LIST.includes(text as any) ? config.columnEmptyText : text;
  }

  if (typeof valueType === 'function' && rowData) {
    // 防止valueType是函数,并且text是''、null、undefined跳过显式设置的columnEmptyText
    return cellRenderToFromItem({
      ...config,
      valueType: valueType(rowData, config.type) || 'text',
    });
  }

  /** 生成公用的 proField dom 配置 */
  const proFieldProps: ProFieldPropsType = {
    valueEnum: runFunction<[T | undefined]>(columnProps?.valueEnum, rowData),
    request: columnProps?.request,
    params: columnProps?.params,
    proFieldKey: `table-field-${columnProps?.dataIndex?.toString() || columnProps?.key}`,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
    mode: config.mode,
    emptyText: config.columnEmptyText,
    renderFormItem: undefined,
    valueType: valueType as ProFieldValueType,
  };

  /** 只读模式直接返回就好了，不需要处理 formItem */
  if (config.mode !== 'edit') {
    return (
      <ProField
        fieldProps={getFieldPropsOrFormItemProps(columnProps?.fieldProps, null, columnProps)}
        {...proFieldProps}
      />
    );
  }

  // 如果是编辑模式，需要用 Form.Item 包一下
  return (
    <Form.Item
      // 一般而言是没有跨行依赖的，所以这里比较行来判断是否应该刷新
      // 对多行编辑有巨大的性能提升
      shouldUpdate={(pre, next) => {
        const name = [config.recordKey].flat(1) as string[];
        return get(pre, name) !== get(next, name);
      }}
      noStyle
    >
      {(form) => {
        const name = spellNamePath(
          config.recordKey || config.index,
          columnProps?.key || columnProps?.dataIndex || config.index,
        );

        /** 获取 formItemProps Props */
        const formItemProps = getFieldPropsOrFormItemProps(
          columnProps?.formItemProps,
          form as FormInstance,
          {
            rowKey: config.recordKey || config.index,
            rowIndex: config.index,
            ...columnProps,
            isEditable: true,
          },
        ) as FormItemProps;

        const messageVariables = {
          label: (columnProps?.title as string) || '此项',
          type: (columnProps?.valueType as string) || '文本',
          ...formItemProps?.messageVariables,
        };

        const inputDom = (
          <ProField
            fieldProps={getFieldPropsOrFormItemProps(
              columnProps?.fieldProps,
              form as FormInstance,
              {
                ...columnProps,
                rowKey: config.recordKey || config.index,
                rowIndex: config.index,
                isEditable: true,
              },
            )}
            {...proFieldProps}
          />
        );

        /** 如果没有自定义直接返回 */
        if (!columnProps?.renderFormItem) {
          return (
            <InlineErrorFormItem
              errorType="popover"
              name={name}
              {...formItemProps}
              messageVariables={messageVariables}
              initialValue={text ?? formItemProps?.initialValue}
            >
              {inputDom}
            </InlineErrorFormItem>
          );
        }
        /** RenderFormItem 需要被自定义的时候执行，defaultRender 比较麻烦所以这里多包一点 */
        const renderDom = columnProps.renderFormItem?.(
          {
            ...columnProps,
            index: config.index,
            isEditable: true,
            type: 'table',
          },
          {
            defaultRender: () => (
              <InlineErrorFormItem
                errorType="popover"
                name={name}
                {...formItemProps}
                messageVariables={messageVariables}
                initialValue={text ?? formItemProps?.initialValue}
              >
                {inputDom}
              </InlineErrorFormItem>
            ),
            type: 'form',
            recordKey: config.recordKey,
            record: form.getFieldValue([config.recordKey || config.index]),
            isEditable: true,
          },
          form as any,
        );
        return (
          <InlineErrorFormItem
            errorType="popover"
            name={spellNamePath(
              config.recordKey || config.index,
              columnProps?.key || columnProps?.dataIndex || config.index,
            )}
            {...formItemProps}
            initialValue={text ?? formItemProps?.initialValue}
            messageVariables={messageVariables}
          >
            {renderDom}
          </InlineErrorFormItem>
        );
      }}
    </Form.Item>
  );
}

export default cellRenderToFromItem;
