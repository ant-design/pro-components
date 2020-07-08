import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

import { FieldFC } from '../../index';

/**
 * 日期范围选择组件
 * @param
 */
const FieldRangePicker: FieldFC<{
  text: string[];
  format: string;
  showTime?: boolean;
}> = ({
  text,
  mode,
  format = 'YYYY-MM-DD',
  render,
  renderFormItem,
  plain,
  showTime,
  formItemProps,
}) => {
  const [startText, endText] = Array.isArray(text) ? text : [];
  if (mode === 'read') {
    const dom = (
      <div>
        <div>{startText ? moment(startText).format(format) : '-'}</div>
        <div>{endText ? moment(endText).format(format) : '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...formItemProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <DatePicker.RangePicker
        format={format}
        showTime={showTime}
        bordered={plain === undefined ? true : !plain}
        defaultValue={[moment(startText), moment(endText)]}
        {...formItemProps}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...formItemProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldRangePicker;
