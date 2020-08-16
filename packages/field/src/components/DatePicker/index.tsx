import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';

import { ProFieldFC } from '../../index';

/**
 * 日期选择组件
 * @param
 */
const FieldDatePicker: ProFieldFC<{
  text: string | number;
  format: string;
  showTime?: boolean;
}> = (
  { text, mode, format = 'YYYY-MM-DD', render, renderFormItem, plain, showTime, formItemProps },
  ref,
) => {
  const intl = useIntl();
  if (mode === 'read') {
    const dom = <span ref={ref}>{text ? moment(text).format(format) : '-'}</span>;
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
        ref={ref}
        placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
        bordered={plain === undefined ? true : !plain}
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
