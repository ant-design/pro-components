import type { ProFieldFC } from '../../types';

export function FieldSliderRead(
  props: Parameters<ProFieldFC<{ text: string }>>[0],
) {
  const { text, mode, render, fieldProps } = props;
  const dom = text;
  if (render) {
    return render(text, { mode, ...fieldProps }, <>{dom}</>);
  }
  return <>{dom}</>;
}
