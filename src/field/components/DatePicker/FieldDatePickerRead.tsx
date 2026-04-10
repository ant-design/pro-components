import type { ProFieldFC, ProFieldLightProps } from '../../types';
import { formatDate } from './datePickerUtils';

type Props = Parameters<
  ProFieldFC<
    {
      text: string | number;
      format?: string;
      showTime?: boolean;
      variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
      picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
    } & ProFieldLightProps
  >
>[0] & {
  format: string;
};

export function FieldDatePickerRead(props: Props) {
  const { text, mode, render, fieldProps, format } = props;
  const dom = formatDate(text, fieldProps.format || format);
  if (render) {
    return render(text, { mode, ...fieldProps }, <>{dom}</>);
  }
  return <>{dom}</>;
}
