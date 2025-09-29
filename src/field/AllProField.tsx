import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import type { JSX } from 'react';
import React, { useContext } from 'react';
import type { ProFieldFCRenderProps } from '../provider';
import ProConfigContext from '../provider';
import { omitUndefined, pickProProps, useDeepCompareMemo, useRefFunction } from '../utils';
import { defaultRenderText } from './defaultRenderText';
import type { ProFieldPropsType } from './PureProField';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(weekday);

const ProFieldComponent: React.FC<ProFieldPropsType> = ({
  text,
  valueType = 'text',
  mode = 'read',
  onChange,
  formItemRender,
  value,
  readonly,
  fieldProps: restFieldProps,
  ref,
  ...rest
}) => {
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
  }, [value, restFieldProps, onChangeCallBack]);

  const renderedDom = defaultRenderText(
    mode === 'edit' ? (fieldProps?.value ?? text ?? '') : (text ?? fieldProps?.value ?? ''),
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
      placeholder: formItemRender ? undefined : (rest?.placeholder ?? fieldProps?.placeholder),
      fieldProps: pickProProps(
        omitUndefined({
          ...fieldProps,
          placeholder: formItemRender ? undefined : (rest?.placeholder ?? fieldProps?.placeholder),
        }),
        Object.keys(context.valueTypeMap || {})?.includes(valueType as string),
      ),
    }),
    context.valueTypeMap || {},
  );

  return <React.Fragment>{renderedDom}</React.Fragment>;
};

export const ProField = ProFieldComponent;
