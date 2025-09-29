import type { RangePickerProps } from 'antd/es/date-picker';
import React, { useContext } from 'react';
import { FieldTimeRangePicker } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { dateArrayFormatter } from '../../../utils';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'timeRange' as const;

/** 时间区间选择器 */
export const ProFormTimeRangePicker: React.FC<ProFormFieldItemProps<RangePickerProps>> = ({
  fieldProps,
  proFieldProps,
  ref,
  ...rest
}) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        [valueType]: {
          render: (text, props) => <FieldTimeRangePicker {...props} text={text} />,
          formItemRender: (text, props) => <FieldTimeRangePicker {...props} text={text} />,
        },
      }}
    >
      <ProField
        ref={ref}
        fieldConfig={
          {
            valueType,
            customLightMode: true,
            lightFilterLabelFormatter: (value) => dateArrayFormatter(value, 'HH:mm:ss'),
          } as const
        }
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valueType={valueType}
        {...rest}
      />
    </ProConfigProvider>
  );
};
