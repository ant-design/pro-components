import { Image, Input } from 'antd';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';

export type FieldImageProps = {
  text: string;
  width?: number;
  placeholder?: string | string[];
};

/**
 * 数字组件
 *
 */
const FieldImage: ProFieldFC<FieldImageProps> = ({
  text,
  mode: type,
  render,
  formItemRender,
  fieldProps,
  placeholder,
  width,
  ref,
}) => {
  const intl = useIntl();
  const placeholderValue = placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');

  if (type === 'read') {
    const dom = <Image ref={ref} src={text} width={width || 32} {...fieldProps} />;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    const dom = <Input ref={ref} placeholder={placeholderValue} {...fieldProps} />;
    if (formItemRender) {
      return formItemRender(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  return null;
};

export default FieldImage;
