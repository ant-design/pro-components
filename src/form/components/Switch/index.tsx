import type { SwitchProps } from 'antd';
import React from 'react';
import { FieldSwitch } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

export type ProFormSwitchProps = Omit<ProFormFieldItemProps<SwitchProps, HTMLElement>, 'emptyText'> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

/**
 * @zh-cn 单选 Switch
 * @en-us Single Choice Switch
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = ({
  fieldProps,
  unCheckedChildren,
  checkedChildren,
  proFieldProps,
  ref,
  ...rest
}) => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        switch: {
          render: (text, props) => <FieldSwitch {...props} text={text} />,
          formItemRender: (text, props) => <FieldSwitch {...props} text={text} />,
        },
      }}
    >
      <ProField
        ref={ref}
        fieldConfig={{
          valuePropName: 'checked',
          ignoreWidth: true,
          customLightMode: true,
        }}
        fieldProps={{
          unCheckedChildren,
          checkedChildren,
          ...fieldProps,
        }}
        proFieldProps={proFieldProps}
        valuePropName="checked"
        valueType="switch"
        {...rest}
      />
    </ProConfigProvider>
  );
};

export default ProFormSwitch;
