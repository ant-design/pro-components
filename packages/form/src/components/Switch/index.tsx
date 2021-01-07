import React from 'react';
import ProField from '@ant-design/pro-field';
import type { SwitchProps } from 'antd/lib/switch';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormSwitchProps = ProFormItemProps<SwitchProps> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

/**
 * 单选 Switch
 *
 * @param
 */
const ProFormSwitch: React.FC<ProFormSwitchProps> = React.forwardRef(
  ({ fieldProps, unCheckedChildren, checkedChildren, proFieldProps }, ref: any) => {
    return (
      <ProField
        valueType="switch"
        mode="edit"
        fieldProps={{
          ...fieldProps,
          unCheckedChildren,
          checkedChildren,
        }}
        text={fieldProps?.checked}
        ref={ref}
        {...proFieldProps}
      />
    );
  },
);

export default createField<ProFormSwitchProps>(ProFormSwitch, {
  valuePropName: 'checked',
});
