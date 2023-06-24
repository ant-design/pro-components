import type { SwitchProps } from 'antd';
import React from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

export type ProFormSwitchProps = ProFormFieldItemProps<
  SwitchProps,
  HTMLElement
> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

/**
 * @zh-cn 单选 Switch
 * @en-us Single Choice Switch
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = React.forwardRef(
  (
    { fieldProps, unCheckedChildren, checkedChildren, proFieldProps, ...rest },
    ref: any,
  ) => {
    return (
      <ProField
        valueType="switch"
        fieldProps={{
          unCheckedChildren,
          checkedChildren,
          ...fieldProps,
        }}
        ref={ref}
        valuePropName="checked"
        proFieldProps={proFieldProps}
        filedConfig={{
          valuePropName: 'checked',
          ignoreWidth: true,
        }}
        {...rest}
      />
    );
  },
);

export default ProFormSwitch;
