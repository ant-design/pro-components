import { InputNumber, Progress } from 'antd';
import React, { useMemo } from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';
import { toNumber } from '../Percent/util';

export function getProgressStatus(
  text: number,
): 'success' | 'exception' | 'normal' | 'active' {
  if (text === 100) {
    return 'success';
  }
  if (text < 0) {
    return 'exception';
  }
  if (text < 100) {
    return 'active';
  }

  return 'normal';
}

/**
 * 进度条组件
 *
 * @param
 */
const FieldProgress: ProFieldFC<{
  text: number | string;
  placeholder?: string;
}> = ({ text, mode, render, formItemRender, fieldProps, placeholder }, ref) => {
  const intl = useIntl();
  const placeholderValue =
    placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const realValue = useMemo(
    () =>
      typeof text === 'string' && (text as string).includes('%')
        ? toNumber((text as string).replace('%', ''))
        : toNumber(text),
    [text],
  );
  if (mode === 'read') {
    const dom = (
      <Progress
        ref={ref}
        size="small"
        style={{ minWidth: 100, maxWidth: 320 }}
        percent={realValue}
        steps={fieldProps?.steps}
        status={getProgressStatus(realValue as number)}
        {...fieldProps}
      />
    );
    if (render) {
      return render(realValue, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <InputNumber ref={ref} placeholder={placeholderValue} {...fieldProps} />
    );
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldProgress);
