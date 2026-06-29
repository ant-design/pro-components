import type { AutoCompleteProps } from 'antd';
import type { RefSelectProps } from 'antd/lib/select';
import React, { useContext } from 'react';
import { FieldAutoComplete } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import FieldContext from '../../FieldContext';
import type { ProFormFieldItemProps } from '../../typing';
import ProFormField from '../Field';

export type ProFormAutoCompleteProps = ProFormFieldItemProps<
  AutoCompleteProps,
  RefSelectProps
> & {
  options?: AutoCompleteProps['options'];
};

const valueType = 'autoComplete' as const;

/**
 * 自动完成
 * 基于 antd AutoComplete，候选项通过 `options` 或 `fieldProps.options` 传入。
 */
const ProFormAutoCompleteComponents: React.ForwardRefRenderFunction<
  any,
  ProFormAutoCompleteProps
> = ({ fieldProps, children, options, ...rest }, ref) => {
  const context = useContext(FieldContext);
  return (
    <ProConfigProvider
      valueTypeMap={{
        autoComplete: {
          render: (text, props) => (
            <FieldAutoComplete {...props} text={text as string} />
          ),
          formItemRender: (text, props) => (
            <FieldAutoComplete {...props} text={text as string} />
          ),
        },
      }}
    >
      <ProFormField
        valueType="autoComplete"
        fieldProps={{
          options,
          getPopupContainer: context.getPopupContainer,
          ...fieldProps,
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </ProFormField>
    </ProConfigProvider>
  );
};

const ProFormAutoComplete = React.forwardRef(ProFormAutoCompleteComponents);

ProFormAutoComplete.displayName = 'ProFormComponent';

export default ProFormAutoComplete;
