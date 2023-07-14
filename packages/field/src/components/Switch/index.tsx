import { useIntl } from '@ant-design/pro-provider';
import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import Omit from 'omit.js';
import React, { useMemo } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import { FieldLabel } from '@ant-design/pro-utils';
import 'antd/lib/switch/style';
//------------

/**
 * 评分组件
 *
 * @param
 */
const FieldSwitch: ProFieldFC<{ text: boolean; fieldProps?: SwitchProps }> = (
  { text, mode, render, light, label, renderFormItem, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const dom = useMemo(() => {
    if (text === undefined || text === null || `${text}`.length < 1) return '-';
    return text
      ? fieldProps?.checkedChildren ?? intl.getMessage('switch.open', '打开')
      : fieldProps?.unCheckedChildren ??
          intl.getMessage('switch.close', '关闭');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        size={light ? 'small' : undefined}
        {...Omit(fieldProps, ['value'])}
        checked={fieldProps?.checked ?? fieldProps?.value}
      />
    );
    if (light) {
      const { disabled, bordered } = fieldProps;
      return (
        <FieldLabel
          label={label}
          disabled={disabled}
          bordered={bordered}
          downIcon={false}
          value={
            <div
              style={{
                paddingLeft: 8,
              }}
            >
              {editDom}
            </div>
          }
          allowClear={false}
        />
      );
    }

    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, editDom);
    }
    return editDom;
  }
  return null;
};

export default React.forwardRef(FieldSwitch);
