import React, { useContext } from 'react';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import { ConfigContext as AntdConfigContext } from 'antd/lib/config-provider';
import { CheckboxGroupProps, CheckboxProps } from 'antd/lib/checkbox';
import { createField } from '../../BaseForm';
import { ProFormItemProps } from '../../interface';

import './index.less';

export type ProFormCheckboxGroupProps = ProFormItemProps<CheckboxGroupProps> & {
  layout?: 'horizontal' | 'vertical';
  options: CheckboxGroupProps['options'];
};

const Group: React.FC<ProFormCheckboxGroupProps> = ({
  layout = 'horizontal',
  options,
  fieldProps,
}) => {
  const { getPrefixCls } = useContext(AntdConfigContext);
  const layoutClassName = getPrefixCls('pro-form-checkbox');
  return (
    <Checkbox.Group
      {...fieldProps}
      className={classNames(fieldProps?.className, `${layoutClassName}-${layout}`)}
      options={options?.map((option) => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          };
        }
        return option;
      })}
    />
  );
};

export type ProFormCheckboxProps = ProFormItemProps<CheckboxProps>;

/**
 * 多选框的
 * @param
 */
const ProFormCheckbox: React.FC<ProFormCheckboxProps> = ({ fieldProps }) => {
  return <Checkbox {...fieldProps} />;
};

const WrappedProFormCheckbox: React.ComponentType<ProFormCheckboxProps> & {
  Group: React.ComponentType<ProFormCheckboxGroupProps>;
} = createField<ProFormCheckboxProps>(ProFormCheckbox, {
  valuePropName: 'checked',
}) as any;

WrappedProFormCheckbox.Group = createField(Group);

export default WrappedProFormCheckbox;
