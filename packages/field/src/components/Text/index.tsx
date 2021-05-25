import { Input } from 'antd';
import React from 'react';
import { useIntl } from '@ant-design/pro-provider';

import type { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input
 *
 * @param
 */
const FieldText: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }) => {
  const intl = useIntl();

  if (mode === 'read') {
    const dom = text ?? '-';

    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.inputPlaceholder', '请输入');
    const dom = <Input placeholder={placeholder} allowClear {...fieldProps} />;

    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldText;
