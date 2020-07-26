import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

import { FieldFC } from '../../index';

/**
 * 日期选择组件
 * @param
 */
const FieldTimePicker: FieldFC<{
  text: string | number;
  format: string;
}> = ({ text, mode, format = 'HH:mm:ss', render, renderFormItem, plain, formItemProps }) => {
  if (mode === 'read') {
    const dom = <span>{text ? moment(text).format(format) : '-'}</span>;
    if (render) {
      return render(text, { mode, ...formItemProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <DatePicker.TimePicker
        format={format}
        bordered={plain === undefined ? true : !plain}
        defaultValue={text ? moment(text) : undefined}
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

export default FieldTimePicker;
