import type { DatePickerProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldTimePicker } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import { ProFormTimeRangePicker } from '../DateRangePicker/TimeRangePicker';
import ProField from '../Field';

const valueType = 'time' as const;
const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  [valueType]: {
    render: (text, props) => <FieldTimePicker {...props} text={text} />,
    formItemRender: (text, props) => <FieldTimePicker {...props} text={text} />,
  },
};

/**
 * 时间选择组件
 *
 * @param
 */
const ProFormTimePicker: React.FC<ProFormFieldItemProps<DatePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}) => {
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
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        valueType={valueType}
        proFieldProps={proFieldProps}
        fieldConfig={
          {
            customLightMode: true,
            valueType,
          } as const
        }
        {...rest}
      />
    </ProConfigProvider>
  );
};

const WrappedProFormTimePicker: typeof ProFormTimePicker & {
  RangePicker: typeof ProFormTimeRangePicker;
} = ProFormTimePicker as any;

WrappedProFormTimePicker.RangePicker = ProFormTimeRangePicker;

export default WrappedProFormTimePicker;
