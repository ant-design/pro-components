import { Rate } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/lib/rate/style';
//------------

/**
 * 评分组件
 *
 * @param
 */
const FieldRate: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  if (mode === 'read') {
    const dom = (
      <Rate allowHalf disabled ref={ref} {...fieldProps} value={text} />
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Rate allowHalf ref={ref} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldRate);
