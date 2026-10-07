import React, { useContext } from 'react';
import { FieldTimeRangePicker } from '../../../field/components/TimePicker';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import { dateArrayFormatter } from '../../../utils';
import type { RangePickerProps } from '../../../utils/antdTypes';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'timeRange' as const;
const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
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
