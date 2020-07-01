import { Progress, InputNumber } from 'antd';
import { FieldFC } from '../../index';
import toNumber from 'lodash.tonumber';
import { useMemo } from 'react';

export function getProgressStatus(
  text: number,
): 'success' | 'exception' | 'normal' | 'active' {
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

const FieldProgress: FieldFC<{
  text: number | string;
}> = ({ text, type, render, renderFormItem, formItemProps }) => {
  const realValue = useMemo(
    () =>
      typeof text === 'string' && (text as string).includes('%')
        ? toNumber((text as string).replace('%', ''))
        : toNumber(text),
    [text],
  );
  if (type === 'read') {
    const dom = (
      <Progress
        size="small"
        style={{ minWidth: 100 }}
        percent={30}
        status={getProgressStatus(realValue as number)}
        {...formItemProps}
      />
    );
    if (render) {
      return render(realValue, { type, ...formItemProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <InputNumber {...formItemProps} defaultValue={realValue} />;
    if (renderFormItem) {
      return renderFormItem(text, { type, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldProgress;
