import { Input } from 'antd';
import React, { useRef, useImperativeHandle } from 'react';
import { useIntl } from '@ant-design/pro-provider';
import DropdownInput from './DropdownInput';

import { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
}> = ({ label, text, mode, light, render, renderFormItem, formItemProps }, ref) => {
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
      return render(text, { mode, ...formItemProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    let dom;
    if (light) {
      dom = (
        <DropdownInput label={label} placeholder={placeholder} ref={inputRef} {...formItemProps} />
      );
    } else {
      dom = <Input placeholder={placeholder} ref={inputRef} {...formItemProps} />;
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldText);
