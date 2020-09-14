import { Input, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { useIntl } from '@ant-design/pro-provider';

import { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input.Password
 * @param
 */
const FieldPassword: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  const intl = useIntl();
  const inputRef = useRef();
  const [visbile, setVisbile] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [inputRef.current],
  );

  if (mode === 'read') {
    let dom = <>-</>;
    if (text) {
      dom = (
        <Space>
          <span>{visbile ? text : '＊ ＊ ＊ ＊ ＊'}</span>
          <a onClick={() => setVisbile(!visbile)}>
            {visbile ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </a>
        </Space>
      );
    }
    if (render) {
      return render(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Input.Password
        placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
        ref={inputRef}
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

export default React.forwardRef(FieldPassword);
