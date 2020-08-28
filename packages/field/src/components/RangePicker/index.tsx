import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';

import { ProFieldFC } from '../../index';

/**
 * 日期范围选择组件
 * @param
 */
const FieldRangePicker: ProFieldFC<{
  text: string[] | number[];
  format: string;
  showTime?: boolean;
}> = (
  { text, mode, format = 'YYYY-MM-DD', render, renderFormItem, plain, showTime, fieldProps },
  ref,
) => {
  const intl = useIntl();
  let [startText, endText] = Array.isArray(text) ? text : [];
  if (mode === 'read') {
    if (typeof startText === 'number' && startText.toString().length === 10)
      startText = Number(startText) * 1000;
    if (typeof endText === 'number' && endText.toString().length === 10)
      endText = Number(endText) * 1000;
    const dom = (
      <div ref={ref}>
        <div>{startText ? moment(startText).format(format) : '-'}</div>
        <div>{endText ? moment(endText).format(format) : '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
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
