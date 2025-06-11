import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import omit from 'rc-util/lib/omit';
import React, { useMemo } from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';

/**
 * 评分组件
 *
 * @param
 */
const FieldSwitch: ProFieldFC<{
  text: boolean;
  fieldProps?: SwitchProps;
  variant?: 'outlined' | 'borderless' | 'filled';
}> = (
  { text, mode, render, light, label, formItemRender, fieldProps, variant },
  ref,
) => {
  const intl = useIntl();
  const dom = useMemo(() => {
    if (text === undefined || text === null || `${text}`.length < 1) return '-';
    return text
      ? (fieldProps?.checkedChildren ?? intl.getMessage('switch.open', '打开'))
      : (fieldProps?.unCheckedChildren ??
          intl.getMessage('switch.close', '关闭'));
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
        {...omit(fieldProps, ['value'])}
        checked={fieldProps?.checked ?? fieldProps?.value}
      />
    );
    if (light) {
      const { disabled } = fieldProps;
      return (
        <FieldLabel
          label={label}
          disabled={disabled}
          bordered={variant !== 'borderless'}
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

    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, editDom);
    }
    return editDom;
  }
  return null;
};

export default React.forwardRef(FieldSwitch);
