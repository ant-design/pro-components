import { useIntl } from '@ant-design/pro-provider';
import { Input } from 'antd';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/input/style';
//------------

/**
 * 最基本的组件，就是个普通的 Input
 *
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
  emptyText?: React.ReactNode;
}> = (
  { text, mode, render, renderFormItem, fieldProps, emptyText = '-' },
  ref,
) => {
  const { autoFocus, prefix = '', suffix = '' } = fieldProps || {};

  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>();
  useImperativeHandle(ref, () => inputRef.current);
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  if (mode === 'read') {
    const dom = (
      <>
        {prefix}
        {text ?? emptyText}
        {suffix}
      </>
    );

    if (render) {
      return render(text, { mode, ...fieldProps }, dom) ?? emptyText;
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    const dom = (
      <Input
        ref={inputRef}
        placeholder={placeholder}
        allowClear
        {...fieldProps}
      />
    );

    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldText);
