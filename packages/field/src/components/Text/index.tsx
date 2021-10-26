import { Input } from 'antd';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { useIntl } from '@ant-design/pro-provider';

import type { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input
 *
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
  emptyText?: React.ReactNode;
}> = ({ text, mode, render, renderFormItem, fieldProps, emptyText = '-' }, ref) => {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>();
  useImperativeHandle(ref, () => inputRef.current);
  useEffect(() => {
    if (fieldProps.autoFocus) {
      inputRef?.current?.focus();
    }
  }, [fieldProps.autoFocus]);

  if (mode === 'read') {
    const dom = text ?? emptyText;

    if (render) {
      return (
        render(
          text,
          { mode, ...fieldProps },
          <>
            {fieldProps?.prefix || ''}
            {dom}
            {fieldProps?.suffix || ''}
          </>,
        ) ?? emptyText
      );
    }
    return (
      <>
        {fieldProps?.prefix || ''}
        {dom}
        {fieldProps?.suffix || ''}
      </>
    );
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    const dom = <Input ref={inputRef} placeholder={placeholder} allowClear {...fieldProps} />;

    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldText);
