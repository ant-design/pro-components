import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useMergedState } from '@rc-component/util';
import { Input, Space } from 'antd';
import React from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';

/**
 * 最基本的组件，就是个普通的 Input.Password
 *
 * @param
 */
const FieldPassword: ProFieldFC<{
  text: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = (
  { text, mode, render, formItemRender, fieldProps, proFieldKey, ...rest },
  ref,
) => {
  const intl = useIntl();

  const [open, setOpen] = useMergedState<boolean>(() => rest.open || false, {
    value: rest.open,
    onChange: rest.onOpenChange,
  });

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
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldPassword);
