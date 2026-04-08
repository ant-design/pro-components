import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import type { ProFieldFC } from '../../types';

type Props = Parameters<
  ProFieldFC<{
    text: string;
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
  }>
>[0];

export function FieldFromNowRead(props: Props) {
  const { text, mode, render, format, fieldProps } = props;
  const dom = (
    <Tooltip
      title={dayjs(text).format(
        fieldProps?.format || format || 'YYYY-MM-DD HH:mm:ss',
      )}
    >
      {dayjs(text).fromNow()}
    </Tooltip>
  );
  if (render) {
    return render(text, { mode, ...fieldProps }, <>{dom}</>);
  }
  return <>{dom}</>;
}
