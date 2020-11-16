import { DatePicker, Tooltip } from 'antd';
import React, { useRef, useImperativeHandle } from 'react';
import { useIntl } from '@ant-design/pro-provider';
import moment from 'moment';

import { ProFieldFC } from '../../index';

/**
 * 与当前的时间进行比较
 * http://momentjs.cn/docs/displaying/fromnow.html
 * @param
 */
const FieldFromNow: ProFieldFC<{
  text: string;
}> = ({ text, mode, render, renderFormItem, fieldProps }, ref) => {
  const intl = useIntl();

  const inputRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
    }),
    [inputRef.current],
  );

  if (mode === 'read') {
    const dom = (
      <Tooltip title={moment(text).format('YYYY-MM-DD HH:mm:ss')}>{moment(text).fromNow()}</Tooltip>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    const placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择');
    const dom = <DatePicker placeholder={placeholder} ref={inputRef} {...fieldProps} />;
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldFromNow);
