import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

import { ProFieldFC } from '../../index';

/**
 * 日期选择组件
 * @param
 */
const FieldTimePicker: ProFieldFC<{
  text: string | number;
  format: string;
}> = ({ text, mode, format = 'HH:mm:ss', render, renderFormItem, plain, fieldProps }, ref) => {
  if (mode === 'read') {
    const dom = <span ref={ref}>{text ? moment(text).format(format) : '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <DatePicker.TimePicker
        ref={ref}
        format={format}
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

export default React.forwardRef(FieldTimePicker);
