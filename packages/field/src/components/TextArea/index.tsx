import { Input } from 'antd';
import React from 'react';

import { FieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input.TextArea
 * @param
 */
const FieldText: FieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, formItemProps }) => {
  if (mode === 'read') {
    const dom = <span>{text || '-'}</span>;
    if (render) {
      return render(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Input.TextArea {...formItemProps} defaultValue={text} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldText;
