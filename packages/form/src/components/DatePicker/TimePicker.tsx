import { FieldTimePicker } from '@ant-design/pro-field';
import { ProConfigProvider } from '@ant-design/pro-provider';
import type { DatePickerProps } from 'antd/lib/date-picker';
import React, { useContext } from 'react';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'time' as const;

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
    <ProConfigProvider
      valueTypeMap={{
        [valueType]: {
          render: (text, props) => <FieldTimePicker {...props} text={text} />,
          formItemRender: (text, props) => (
            <FieldTimePicker {...props} text={text} />
          ),
        },
      }}
    >
      <ProField
        fieldProps={{
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        valueType={valueType}
        proFieldProps={proFieldProps}
        filedConfig={
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

const WrappedProFormTimePicker: typeof ProFormTimePicker & {} =
  ProFormTimePicker as any;

export default WrappedProFormTimePicker;
