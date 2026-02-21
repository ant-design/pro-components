import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { omit, useControlledState } from '@rc-component/util';
import { Input, Space } from 'antd';
import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';

/**
 * 最基本的组件，就是个普通的 Input.Password
 *
 * @param props
 * @param ref
 */
const FieldPassword: ProFieldFC<{
  text: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}> = (props, ref) => {
  const intl = useIntl();
  const { text, mode, render, formItemRender, fieldProps, ...rest } = omit(
    props,
    ['proFieldKey'],
  );
  const [open, setOpenInner] = useControlledState<boolean>(
    () => rest.open || false,
    rest.open,
  );
  const setOpen = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setOpenInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        rest.onOpenChange?.(next);
        return next;
      });
    },
    [rest.onOpenChange],
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
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldPassword);
