import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import { parseValueToMoment } from '@ant-design/pro-utils';
import { useIntl } from '@ant-design/pro-provider';
import type { ProFieldFC } from '../../index';

/**
 * 日期范围选择组件
 *
 * @param
 */
const FieldRangePicker: ProFieldFC<{
  text: string[];
  format: string;
  showTime?: boolean;
}> = ({ text, mode, format, render, renderFormItem, plain, showTime, fieldProps }, ref) => {
  const intl = useIntl();
  const [startText, endText] = Array.isArray(text) ? text : [];
  // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
  const parsedStartText: string = startText
    ? moment(startText).format(fieldProps?.format || format || 'YYYY-MM-DD')
    : '';
  const parsedEndText: string = endText
    ? moment(endText).format(fieldProps?.format || format || 'YYYY-MM-DD')
    : '';

  if (mode === 'read') {
    const dom = (
      <div ref={ref}>
        <div>{parsedStartText || '-'}</div>
        <div>{parsedEndText || '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const momentValue = parseValueToMoment(fieldProps.value) as moment.Moment;
    const dom = (
      <DatePicker.RangePicker
        ref={ref}
        format={format}
        showTime={showTime}
        placeholder={[
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          intl.getMessage('tableForm.selectPlaceholder', '请选择'),
        ]}
        bordered={plain === undefined ? true : !plain}
        {...fieldProps}
        value={momentValue}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldRangePicker);
