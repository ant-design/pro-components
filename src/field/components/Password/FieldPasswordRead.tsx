import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>
>[0] & {
  open: boolean;
  setOpen: (updater: boolean | ((prev: boolean) => boolean)) => void;
};

export function FieldPasswordRead(props: Props, ref: React.Ref<unknown>) {
  const { text, mode, render, fieldProps, open, setOpen } = props;
  let dom: React.ReactNode = <>-</>;
  if (text) {
    dom = (
      <Space>
        <span ref={ref as React.Ref<HTMLSpanElement>}>
          {open ? text : '********'}
        </span>
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
