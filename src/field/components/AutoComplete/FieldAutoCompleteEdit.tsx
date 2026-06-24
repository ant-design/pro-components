import { AutoComplete } from 'antd';
import React from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../types';

type FieldAutoCompleteEditProps = Parameters<
  ProFieldFC<{ text: string; emptyText?: React.ReactNode }>
>[0] & {
  inputRef?: React.RefObject<any>;
};

/**
 * 编辑态：渲染 antd AutoComplete，候选项由 fieldProps.options 直接传入。
 */
export function FieldAutoCompleteEdit(props: FieldAutoCompleteEditProps) {
  const { text, mode, formItemRender, fieldProps, inputRef } = props;
  const intl = useIntl();
  const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');

  const dom = (
    <AutoComplete ref={inputRef} placeholder={placeholder} {...fieldProps} />
  );

  if (formItemRender) {
    return formItemRender(text, { mode, ...fieldProps }, dom);
  }
  return dom;
}
