import React from 'react';
import ProField from '@ant-design/pro-field';
import type { SwitchProps } from 'antd';
import createField from '../../BaseForm/createField';
import type { ProFormItemProps } from '../../interface';

export type ProFormSwitchProps = ProFormItemProps<SwitchProps> & {
  checkedChildren?: SwitchProps['checkedChildren'];
  unCheckedChildren?: SwitchProps['unCheckedChildren'];
};

/**
 * @zh-cn 单选 Switch
 * @en-us Single Choice Switch
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
