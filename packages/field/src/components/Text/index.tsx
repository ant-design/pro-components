import { Input } from 'antd';
import React, { useRef, useImperativeHandle } from 'react';

import { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, formItemProps }, ref) => {
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
      return render(text, { mode, ...formItemProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Input ref={inputRef} {...formItemProps} defaultValue={text} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldText);
