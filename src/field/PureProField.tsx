import React from 'react';
import type { ProRenderFieldPropsType } from '../provider';
import {
  type ProFieldTextType,
  type ProFieldValueType,
  type ProFieldValueTypeInput,
} from '../utils';
import type { FieldMoneyProps } from './components/Money';
import FieldText from './components/Text';
import { createProField, type ProFieldRenderText } from './ProFieldCore';
import type { ProFieldRenderProps } from './types';

export type {
  ProFieldEmptyText,
  ProFieldFC,
  ProFieldLightProps,
  ProFieldPropsType,
  ProFieldValueTypeFunction,
} from './types';
export type ProFieldMoneyProps = FieldMoneyProps;

/** 只读：空值占位、自定义 valueType 的 render、默认 FieldText */
export const pureRenderRead: ProFieldRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueTypeInput,
  props: ProFieldRenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): React.ReactNode => {
  const { mode = 'read', emptyText = '-' } = props;

  if (
    emptyText !== false &&
    mode === 'read' &&
    valueType !== 'option' &&
    valueType !== 'switch'
  ) {
    if (
      typeof dataValue !== 'boolean' &&
      typeof dataValue !== 'number' &&
      !dataValue
    ) {
      const { fieldProps, render } = props;
      if (render) {
        return render(dataValue, { mode, ...fieldProps }, <>{emptyText}</>);
      }
      return <>{emptyText}</>;
    }
  }

  delete props.emptyText;

  if (typeof valueType === 'object') {
    return pureRenderRead(
      dataValue,
      valueType.type,
      {
        ...valueType,
        ...props,
      } as ProFieldRenderProps,
      valueTypeMap,
    );
  }

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];

  if (customValueTypeConfig) {
    delete props.ref;
    const readDom = customValueTypeConfig.render?.(
      dataValue,
      {
        text: dataValue as React.ReactNode,
        ...props,
        mode: mode || 'read',
      },
      <>{dataValue}</>,
    );
    if (props?.render) {
      return props.render?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
        },
        readDom as React.JSX.Element,
      );
    }
    return readDom;
  }
  return <FieldText text={dataValue as string} {...props} />;
};

/** 编辑：自定义 valueType 的 formItemRender、默认 FieldText */
export const pureRenderEdit: ProFieldRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueTypeInput,
  props: ProFieldRenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): React.ReactNode => {
  delete props.emptyText;

  if (typeof valueType === 'object') {
    return pureRenderEdit(
      dataValue,
      valueType.type,
      {
        ...valueType,
        ...props,
      } as ProFieldRenderProps,
      valueTypeMap,
    );
  }

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];

  if (customValueTypeConfig) {
    delete props.ref;
    const dom = customValueTypeConfig.formItemRender?.(
      dataValue,
      {
        text: dataValue as React.ReactNode,
        ...props,
      },
      <>{dataValue}</>,
    );
    if (props?.formItemRender) {
      return props.formItemRender?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
        },
        dom as React.JSX.Element,
      );
    }
    return dom;
  }
  return <FieldText text={dataValue as string} {...props} />;
};

/** 按 props.mode 调度（单测或外部若直接调用时使用） */
export const pureRenderText: ProFieldRenderText = (
  dataValue,
  valueType,
  props,
  valueTypeMap,
) => {
  const m = props.mode ?? 'read';
  return m === 'edit' || m === 'update'
    ? pureRenderEdit(dataValue, valueType, props, valueTypeMap)
    : pureRenderRead(dataValue, valueType, props, valueTypeMap);
};

export const PureProField = createProField(
  { renderRead: pureRenderRead, renderEdit: pureRenderEdit },
  {
    pickProPropsWithValueTypeMap: false,
  },
);
