import { useIntl } from '@ant-design/pro-provider';
import { Input } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/input/style';
//------------
/**
 * 最基本的组件，就是个普通的 Input.TextArea
 *
 * @param
 */
const FieldTextArea: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  const intl = useIntl();

  if (mode === 'read') {
    const dom = (
      <span
        ref={ref}
        style={{
          display: 'inline-block',
          padding: '4px 11px',
          lineHeight: '1.5715',
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
        }}
      >
        {text ?? '-'}
      </span>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Input.TextArea
        ref={ref}
        rows={3}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.stopPropagation();
        }}
        placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
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

export default React.forwardRef(FieldTextArea);
