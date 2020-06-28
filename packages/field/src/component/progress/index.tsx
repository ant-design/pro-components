import { Progress, Input, InputNumber } from 'antd';
import { FieldFC } from '../../index';

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
  text: number;
}> = ({ text, type, render, renderFormItem, formItemProps }) => {
  if (type === 'read') {
    const dom = (
      <Progress
        size="small"
        percent={text}
        status={getProgressStatus(text as number)}
        {...formItemProps}
      />
    );
    if (render) {
      return render(text, { type, ...formItemProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = <InputNumber {...formItemProps} defaultValue={text} />;
    if (renderFormItem) {
      return renderFormItem(text, { type, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldProgress;
