import type { InputNumberProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import FieldMoney, {
  type FieldMoneyProps,
} from '../../../field/components/Money';
import {
  mergeFormValueTypeMap,
  withFieldCallbackProps,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  money: {
    render: (text, props) => (
      <FieldMoney
        {...props}
        placeholder={props.placeholder as string}
        text={text}
      />
    ),
    formItemRender: (text, props) => (
      <FieldMoney
        {...props}
        placeholder={props.placeholder as string}
        text={text}
      />
    ),
  },
};

export type ProFormMoneyProps = ProFormFieldItemProps<
  Omit<FieldMoneyProps, 'valueType' | 'text'> & InputNumberProps<number>
> & {
  customSymbol?: string; // 自定义货币符号
  locale?: string; // 单独设置国际化，设置之后优先级高于全局国际化
  min?: InputNumberProps<number>['min'];
  max?: InputNumberProps<number>['min'];
  placeholder?: string;
};
/**
 * 金额输入框
 *
 * @param
 */
type MoneyFieldRenderer = (
  text: any,
  props: any,
  dom: React.JSX.Element,
) => React.ReactNode;
type ProFormMoneyRenderProps = ProFormMoneyProps & {
  render?: MoneyFieldRenderer;
  formItemRender?: MoneyFieldRenderer;
};
type MoneyProFieldCallbacks = {
  render?: MoneyFieldRenderer;
  formItemRender?: MoneyFieldRenderer;
};

const ProFormMoney: React.ForwardRefRenderFunction<
  any,
  ProFormMoneyRenderProps
> = (
  {
    fieldProps,
    proFieldProps,
    locale,
    min,
    max,
    render,
    formItemRender,
    ...rest
  },
  ref,
) => {
  const proContext = useContext(ProProvider);
  const valueTypeMap = useMemo(
    () =>
      mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
    [proContext.valueTypeMap],
  );
  const fieldRender = useMemo(() => withFieldCallbackProps(render), [render]);
  const fieldFormItemRender = useMemo(
    () => withFieldCallbackProps(formItemRender),
    [formItemRender],
  );
  const wrappedProFieldProps = useMemo(() => {
    const { render: proRender, formItemRender: proFormItemRender } =
      (proFieldProps || {}) as MoneyProFieldCallbacks;
    const next: Record<string, any> = { ...proFieldProps, locale };
    if (proRender) next.render = withFieldCallbackProps(proRender);
    if (proFormItemRender) {
      next.formItemRender = withFieldCallbackProps(proFormItemRender);
    }
    return next;
  }, [proFieldProps, locale]);
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
      <ProFormField
        valueType="money"
        fieldProps={{
          min,
          max,
          ...fieldProps,
        }}
        ref={ref}
        fieldConfig={{
          defaultProps: {
            width: '100%',
          },
        }}
        // locale 以顶层 props 透传给 FieldMoney，使 valueType 保持字符串形式，
        // 从而让全局 valueTypeMap 的自定义 render / formItemRender 能命中。
        proFieldProps={wrappedProFieldProps as typeof proFieldProps}
        render={fieldRender as any}
        formItemRender={fieldFormItemRender as any}
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default React.forwardRef(ProFormMoney);
