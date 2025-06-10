import { Input } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../PureProField';

import { proTheme } from '@ant-design/pro-provider';

const languageFormat = (text: string, language: string) => {
  if (typeof text !== 'string') {
    return text;
  }
  try {
    if (language === 'json') {
      return JSON.stringify(JSON.parse(text), null, 2);
    }
  } catch (error) {
    // console.log(error)
  }
  return text;
};

/**
 * 代码片段组件 这个组件为了显示简单的配置，复杂的请使用更加重型的组件
 *
 * @param
 */
const FieldCode: ProFieldFC<{
  text: string;
  language?: 'json' | 'text';
}> = (
  { text, mode, render, language = 'text', formItemRender, plain, fieldProps },
  ref,
) => {
  const code = languageFormat(text, language);
  const { token } = proTheme.useToken();
  if (mode === 'read') {
    const dom = (
      <pre
        ref={ref}
        {...fieldProps}
        style={{
          padding: 16,
          overflow: 'auto',
          fontSize: '85%',
          lineHeight: 1.45,
          color: token.colorTextSecondary,
          fontFamily: token.fontFamilyCode,
          backgroundColor: 'rgba(150, 150, 150, 0.1)',
          borderRadius: 3,
          width: 'min-content',
          ...fieldProps.style,
        }}
      >
        <code>{code}</code>
      </pre>
    );
    if (render) {
      return render(code, { mode, ...fieldProps, ref }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    fieldProps.value = code;
    let dom = <Input.TextArea rows={5} {...fieldProps} ref={ref} />;
    if (plain) {
      dom = <Input {...fieldProps} ref={ref} />;
    }
    if (formItemRender) {
      return formItemRender(code, { mode, ...fieldProps, ref }, dom) ?? null;
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldCode);
