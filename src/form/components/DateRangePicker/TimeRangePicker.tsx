import React, { useContext, useMemo } from 'react';
import { FieldTimeRangePicker } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import { dateArrayFormatter } from '../../../utils';
import type { RangePickerProps } from '../../../utils/antdTypes';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'timeRange' as const;
const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  [valueType]: {
    render: (text, props) => <FieldTimeRangePicker {...props} text={text} />,
    formItemRender: (text, props) => (
      <FieldTimeRangePicker {...props} text={text} />
    ),
  },
};

/** 时间区间选择器 */
export const ProFormTimeRangePicker: React.FC<
  ProFormFieldItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref: any) => {
  const context = useContext(FieldContext);
  const proContext = useContext(ProProvider);
  const valueTypeMap = useMemo(
    () =>
      mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
    [proContext.valueTypeMap],
  );
  return (
    <ProConfigProvider valueTypeMap={valueTypeMap}>
      <ProField
        ref={ref}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        valueType={valueType}
        proFieldProps={proFieldProps}
        fieldConfig={
          {
            valueType,
            customLightMode: true,
            lightFilterLabelFormatter: (value) =>
              dateArrayFormatter(value, 'HH:mm:ss'),
          } as const
        }
        {...rest}
      />
    </ProConfigProvider>
  );
});
