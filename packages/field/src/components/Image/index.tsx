import { useIntl } from '@ant-design/pro-provider';
import { Image, Input } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/image/style';
//----------------------

export type FieldImageProps = {
  text: string;
  width?: number;
  placeholder?: string | string[];
};

/**
 * 数字组件
 *
 * @param FieldImageProps {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldImage = React.forwardRef<FieldImageProps, any>(
  (
    {
      text,
      mode: type,
      render,
      renderFormItem,
      fieldProps,
      placeholder,
      width,
    },
    ref,
  ) => {
    const intl = useIntl();
    const placeholderValue =
      placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
    if (type === 'read') {
      const dom = (
        <Image ref={ref} width={width || 32} src={text} {...fieldProps} />
      );
      if (render) {
        return render(text, { mode: type, ...fieldProps }, dom);
      }
      return dom;
    }
    if (type === 'edit' || type === 'update') {
      const dom = (
        <Input ref={ref} placeholder={placeholderValue} {...fieldProps} />
      );
      if (renderFormItem) {
        return renderFormItem(text, { mode: type, ...fieldProps }, dom);
      }
      return dom;
    }
    return null;
  },
);

export default FieldImage as ProFieldFC<FieldImageProps>;
