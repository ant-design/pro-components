import React, { useMemo } from 'react';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import Omit from 'omit.js';
import type { ProFieldFC } from '../../index';

/**
 * 评分组件
 *
 * @param
 */
const FieldSwitch: ProFieldFC<{ text: boolean; fieldProps?: SwitchProps }> = (
  { text, mode, render, renderFormItem, fieldProps },
  ref,
) => {
  const dom = useMemo(() => {
    if (text === undefined || text === null || `${text}`.length < 1) {
      return '-';
    }
    return text ? fieldProps?.checkedChildren ?? '打开' : fieldProps?.unCheckedChildren ?? '关闭';
  }, [fieldProps?.checkedChildren, fieldProps?.unCheckedChildren, text]);

  if (mode === 'read') {
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return dom ?? '-';
  }
  if (mode === 'edit' || mode === 'update') {
    const editDom = (
      <Switch
        ref={ref}
        {...Omit(fieldProps, ['value'])}
        checked={fieldProps?.checked || fieldProps?.value}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, editDom);
    }
    return editDom;
  }
  return null;
};

export default React.forwardRef(FieldSwitch);
