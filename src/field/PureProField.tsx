import type {
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '../provider';
import ProConfigContext from '../provider';
import {
  omitUndefined,
  pickProProps,
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueObjectType,
  ProFieldValueType,
  useDeepCompareMemo,
  useRefFunction,
} from '../utils';
import React, { useContext } from 'react';
import type { FieldMoneyProps } from './components/Money';
import FieldText from './components/Text';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import dayjs from 'dayjs';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

export type ProFieldMoneyProps = FieldMoneyProps;

export type ProFieldEmptyText = string | false;

/** 默认的 Field 需要实现的功能 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ProFieldFC<T = {}> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldPropsType & T
>;

/** 轻量筛选的field属性 */
export type ProFieldLightProps = {
  // label和clear图标的ref
  lightLabel?: React.RefObject<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>;

  // 是否点击了label
  labelTrigger?: boolean;
};

/** Value type by function */
export type ProFieldValueTypeFunction<T> = (
  item: T,
) => ProFieldValueType | ProFieldValueObjectType;

type RenderProps = Omit<ProFieldFCRenderProps, 'text' | 'placeholder'> &
  ProRenderFieldPropsType & {
    /** 从服务器读取选项 */
    request?: ProFieldRequestData;
    emptyText?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    /**
     * @deprecated use onOpenChange replace
     */
    onVisible?: (visible: boolean) => void;
    /**
     * @deprecated use open replace
     */
    visible?: boolean;
    [key: string]: any;
  };

/**
 * 根据不同的类型来转化数值
 *
 * @param dataValue
 * @param valueType
 */
export const pureRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
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

  // eslint-disable-next-line no-param-reassign
  delete props.emptyText;

  if (typeof valueType === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return pureRenderText(
      dataValue,
      valueType.type,
      {
        ...valueType,
        ...props,
      } as RenderProps,
      valueTypeMap,
    );
  }

  const customValueTypeConfig =
    valueTypeMap && valueTypeMap[valueType as string];

  if (customValueTypeConfig) {
    // eslint-disable-next-line no-param-reassign
    delete props.ref;
    if (mode === 'read') {
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
          readDom as JSX.Element,
        );
      }
      return readDom;
    }
    if (mode === 'update' || mode === 'edit') {
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
          dom as JSX.Element,
        );
      }
      return dom;
    }
  }
  return <FieldText text={dataValue as string} {...props} />;
};

/** ProField 的类型 */
export type ProFieldPropsType = {
  text?: ProFieldTextType;
  valueType?: ProFieldValueType | ProFieldValueObjectType;
} & RenderProps;

const ProFieldComponent: React.ForwardRefRenderFunction<
  any,
  ProFieldPropsType
> = (
  {
    text,
    valueType = 'text',
    mode = 'read',
    onChange,
    formItemRender,
    value,
    readonly,
    fieldProps: restFieldProps,
    ...rest
  },
  ref: any,
) => {
  const context = useContext(ProConfigContext);

  const onChangeCallBack = useRefFunction((...restParams: any[]) => {
    restFieldProps?.onChange?.(...restParams);
    onChange?.(...restParams);
  });

  const fieldProps: any = useDeepCompareMemo(() => {
    return (
      (value !== undefined || restFieldProps) && {
        value,
        // fieldProps 优先级更高，在类似 LightFilter 场景下需要覆盖默认的 value 和 onChange
        ...omitUndefined(restFieldProps),
        onChange: onChangeCallBack,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, restFieldProps, onChangeCallBack]);

  const renderedDom = pureRenderText(
    mode === 'edit'
      ? (fieldProps?.value ?? text ?? '')
      : (text ?? fieldProps?.value ?? ''),
    valueType || 'text',
    omitUndefined({
      ref,
      ...rest,
      mode: readonly ? 'read' : mode,
      formItemRender: formItemRender
        ? (curText: any, props: ProFieldFCRenderProps, dom: JSX.Element) => {
            const { placeholder: _placeholder, ...restProps } = props;
            const newDom = formItemRender(curText, restProps, dom);
            // formItemRender 之后的dom可能没有props，这里会帮忙注入一下
            if (React.isValidElement(newDom))
              return React.cloneElement(newDom, {
                ...fieldProps,
                ...((newDom.props as any) || {}),
              });
            return newDom;
          }
        : undefined,
      placeholder: formItemRender
        ? undefined
        : (rest?.placeholder ?? fieldProps?.placeholder),
      fieldProps: pickProProps(
        omitUndefined({
          ...fieldProps,
          placeholder: formItemRender
            ? undefined
            : (rest?.placeholder ?? fieldProps?.placeholder),
        }),
      ),
    }),
    context.valueTypeMap || {},
  );

  return <React.Fragment>{renderedDom}</React.Fragment>;
};

export const PureProField = React.forwardRef(
  ProFieldComponent,
) as typeof ProFieldComponent;
