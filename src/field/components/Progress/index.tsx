import { InputNumber, Progress } from 'antd';
import { useMemo } from 'react';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';
import { toNumber } from '../Percent/util';

function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active' {
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
}> = ({ text, mode, render, plain, formItemRender, fieldProps, placeholder, ref }) => {
  const intl = useIntl();
  const placeholderValue = placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
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
        percent={realValue}
        size="small"
        status={getProgressStatus(realValue as number)}
        steps={plain ? 10 : undefined}
        style={{ minWidth: 100, maxWidth: 320 }}
        {...fieldProps}
      />
    );
    if (render) {
      return render(realValue, { mode, ...fieldProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const dom = <InputNumber ref={ref} placeholder={placeholderValue} {...fieldProps} />;
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldProgress;
