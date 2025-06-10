import { FieldTimeRangePicker } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import { dateArrayFormatter } from '@ant-design/pro-utils';
import type { RangePickerProps } from 'antd/lib/date-picker';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'timeRange' as const;

/** 时间区间选择器 */
export const ProFormTimeRangePicker: React.FC<
  ProFormFieldItemProps<RangePickerProps>
> = React.forwardRef(({ fieldProps, proFieldProps, ...rest }, ref: any) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        [valueType]: {
          render: (text, props) => (
            <FieldTimeRangePicker {...props} text={text} />
          ),
          formItemRender: (text, props) => (
            <FieldTimeRangePicker {...props} text={text} />
          ),
        },
      }}
    >
      <ProField
        ref={ref}
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        valueType={valueType}
        proFieldProps={proFieldProps}
        filedConfig={
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
