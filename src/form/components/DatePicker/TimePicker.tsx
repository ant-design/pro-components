import type { DatePickerProps } from 'antd';
import React, { useContext } from 'react';
import FieldTimePicker from '../../../field/components/TimePicker';
import { ProConfigProvider } from '../../../provider';
import type { ProRenderFieldPropsType } from '../../../provider/typing/config';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import { ProFormTimeRangePicker } from '../DateRangePicker/TimeRangePicker';
import ProField from '../Field';

const valueType = 'time' as const;
const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  [valueType]: {
    render: (text, props) => <FieldTimePicker {...props} text={text} />,
    formItemRender: (text, props) => (
      <FieldTimePicker {...props} text={text} />
    ),
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
