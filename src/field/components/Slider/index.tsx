import { Slider } from 'antd';
import type { ProFieldFC } from '../../PureProField';

/**
 * 评分组件
 *
 * @param
 */
const FieldSlider: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, formItemRender, fieldProps, ref }) => {
  if (mode === 'read') {
    const dom = text;
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Slider
        ref={ref}
        {...fieldProps}
        style={{
          minWidth: 120,
          ...fieldProps?.style,
        }}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldSlider;
