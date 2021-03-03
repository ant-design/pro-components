import React from 'react';
import { Input, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { useIntl } from '@ant-design/pro-provider';

import type { ProFieldFC } from '../../index';

/**
 * 最基本的组件，就是个普通的 Input.Password
 *
 * @param
 */
const FieldPassword: ProFieldFC<{
  text: string;
  visible?: boolean;
  onVisible?: (visible: boolean) => void;
}> = ({ text, mode, render, renderFormItem, fieldProps, proFieldKey, ...rest }, ref) => {
  const intl = useIntl();
  const [visible, setVisible] = useMergedState<boolean>(() => rest.visible || false, {
    value: rest.visible,
    onChange: rest.onVisible,
  });

  if (mode === 'read') {
    let dom = <>-</>;
    if (text) {
      dom = (
        <Space>
          <span ref={ref}>{visible ? text : '＊ ＊ ＊ ＊ ＊'}</span>
          <a onClick={() => setVisible(!visible)}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
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
        ref={ref}
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
