import { Slider } from 'antd';
import React from 'react';
import type { ProFieldFC } from '../../index';

/**
 * 评分组件
 *
 * @param
 */
const FieldSlider: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  if (mode === 'read') {
    const dom = text;
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = <Slider ref={ref} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSlider);
