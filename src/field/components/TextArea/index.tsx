import { omit } from '@rc-component/util';
import { Input } from 'antd';
import { useIntl } from '../../../provider';
import type { ProFieldFC } from '../../PureProField';
import FieldTextAreaReadonly from './readonly';

/**
 * 最基本的组件，就是个普通的 Input.TextArea
 *
 * @param
 */
const FieldTextArea: ProFieldFC<{
  text: string;
}> = ({ ref, ...props }) => {
  const { text, mode, render, formItemRender, fieldProps } = props;
  const intl = useIntl();

  if (mode === 'read') {
    const dom = <FieldTextAreaReadonly {...props} ref={ref} />;
    if (render) {
      return render(text, { mode, ...(omit(fieldProps, ['showCount']) as any) }, dom);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Input.TextArea
        ref={ref}
        placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
        rows={3}
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.stopPropagation();
        }}
        {...fieldProps}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldTextArea;
