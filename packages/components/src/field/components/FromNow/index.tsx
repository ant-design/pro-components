import { useIntl } from '@ant-design/pro-provider';
import { compatibleBorder, parseValueToDay } from '@ant-design/pro-utils';
import { DatePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import type { ProFieldFC } from '../../PureProField';

dayjs.extend(relativeTime);
/**
 * 与当前的时间进行比较 http://momentjs.cn/docs/displaying/fromnow.html
 *
 * @param
 */
const FieldFromNow: ProFieldFC<{
  text: string;
  format?: string;
}> = (
  { text, mode, plain, render, formItemRender, format, fieldProps },
  ref,
) => {
  const intl = useIntl();

  if (mode === 'read') {
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
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage(
      'tableForm.selectPlaceholder',
      '请选择',
    );
    const momentValue = parseValueToDay(fieldProps.value) as dayjs.Dayjs;
    const dom = (
      <DatePicker
        ref={ref}
        placeholder={placeholder}
        showTime
        {...compatibleBorder(plain === undefined ? true : !plain)}
        {...fieldProps}
        value={momentValue}
      />
    );
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldFromNow);
