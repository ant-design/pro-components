import { Input } from 'antd';
import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';
import type { InputProps } from 'antd/lib/input';
import { useIntl } from '@ant-design/pro-provider';

import type { ProFieldFC } from '../../index';

const CompositionInput: React.FC<InputProps> = React.forwardRef<any, InputProps>((props, ref) => {
  const compositionRef = useRef<boolean>(true);
  const [innerValue, setInnerValue] = useState(props.value);
  useEffect(() => {
    setInnerValue(props.value);
  }, [props.value]);

  return (
    <Input
      ref={ref}
      {...props}
      value={innerValue}
      onCompositionStart={() => {
        compositionRef.current = false;
      }}
      onCompositionEnd={() => {
        compositionRef.current = true;
      }}
      onChange={(e) => {
        setInnerValue(e.target.value);
        if (compositionRef.current) {
          props?.onChange?.(e);
        }
      }}
    />
  );
});
/**
 * 最基本的组件，就是个普通的 Input
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  const intl = useIntl();
  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [inputRef.current],
  );

  if (mode === 'read') {
    const dom = text || '-';
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    const dom = (
      <CompositionInput placeholder={placeholder} ref={inputRef} allowClear {...fieldProps} />
    );

    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldText);
