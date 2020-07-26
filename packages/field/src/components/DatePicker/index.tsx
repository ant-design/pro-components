import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

import { FieldFC } from '../../index';

/**
 * 日期选择组件
 * @param
 */
const FieldDatePicker: FieldFC<{
  text: string | number;
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
  if (mode === 'read') {
    const dom = <span>{text ? moment(text).format(format) : '-'}</span>;
    if (render) {
      return render(text, { mode, ...formItemProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <DatePicker
        showTime={showTime}
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

export default React.forwardRef(FieldDatePicker);
