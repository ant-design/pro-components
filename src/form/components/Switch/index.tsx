import type { SwitchProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import { FieldSwitch } from '../../../field/FieldLoaders';
import {
  mergeFormValueTypeMap,
  type ValueTypeRenderFallback,
} from '../../../field/ValueTypeToComponent';
import { ProConfigProvider, ProProvider } from '../../../provider';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const FALLBACK_VALUE_TYPE_MAP: Record<string, ValueTypeRenderFallback> = {
  switch: {
    render: (text, props) => <FieldSwitch {...props} text={text} />,
    formItemRender: (text, props) => <FieldSwitch {...props} text={text} />,
  },
};

export type ProFormSwitchProps = Omit<
  ProFormFieldItemProps<SwitchProps, HTMLElement>,
  'emptyText'
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
    const proContext = useContext(ProProvider);
    const valueTypeMap = useMemo(
      () =>
        mergeFormValueTypeMap(proContext.valueTypeMap, FALLBACK_VALUE_TYPE_MAP),
      [proContext.valueTypeMap],
    );
    return (
      <ProConfigProvider valueTypeMap={valueTypeMap}>
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
          fieldConfig={{
            valuePropName: 'checked',
            ignoreWidth: true,
            customLightMode: true,
          }}
          {...rest}
        />
      </ProConfigProvider>
    );
  },
);

export default ProFormSwitch;
