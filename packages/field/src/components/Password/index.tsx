import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { Input, Space } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/input/style';
import 'antd/lib/space/style';
//----------------------

/**
 * 最基本的组件，就是个普通的 Input.Password
 *
 * @param
 */
const FieldPassword: ProFieldFC<{
  text: string;
  visible?: boolean;
  onVisible?: (visible: boolean) => void;
  open?: boolean;
  onOpenChange?: (visible: boolean) => void;
}> = (
  { text, mode, render, renderFormItem, fieldProps, proFieldKey, ...rest },
  ref,
) => {
  const intl = useIntl();

  const [open, setOpen] = useMergedState<boolean>(
    () => rest.open || rest.visible || false,
    {
      value: rest.open || rest.visible,
      onChange: rest.onOpenChange || rest.onVisible,
    },
  );

  if (mode === 'read') {
    let dom = <>-</>;
    if (text) {
      dom = (
        <Space>
          <span ref={ref}>{open ? text : '********'}</span>
          <a onClick={() => setOpen(!open)}>
            {open ? <EyeOutlined /> : <EyeInvisibleOutlined />}
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
