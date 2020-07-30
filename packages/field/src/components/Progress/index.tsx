import { Progress, InputNumber } from 'antd';
import toNumber from 'lodash.tonumber';
import React, { useMemo } from 'react';

import { ProFieldFC } from '../../index';

export function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active' {
  if (typeof text !== 'number') {
    return 'exception';
  }
  if (text === 100) {
    return 'success';
  }
  if (text < 100) {
    return 'active';
  }

  // magic
  if (text < 0) {
    return 'exception';
  }
  return 'normal';
}

/**
 * 进度条组件
 * @param
 */
const FieldProgress: ProFieldFC<{
  text: number | string;
}> = ({ text, mode, render, plain, renderFormItem, formItemProps }, ref) => {
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
        style={{ minWidth: 100 }}
        percent={realValue}
        steps={plain ? 10 : undefined}
        status={getProgressStatus(realValue as number)}
        {...formItemProps}
      />
    );
    if (render) {
      return render(realValue, { mode, ...formItemProps }, dom);
    }
    return dom;
  }

  if (mode === 'edit' || mode === 'update') {
    const dom = <InputNumber ref={ref} {...formItemProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldProgress);
