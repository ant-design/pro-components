import { DatePicker } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel, parseValueToMoment } from '@ant-design/pro-utils';
import { ConfigContext } from 'antd/lib/config-provider';
import { ProFieldFC } from '../../index';
import './index.less';

/**
 * 日期选择组件
 * @param
 */
const FieldDatePicker: ProFieldFC<{
  text: string | number;
  format: string;
  showTime?: boolean;
}> = (
  {
    text,
    mode,
    format = 'YYYY-MM-DD',
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
  },
  ref,
) => {
  const intl = useIntl();
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [open, setOpen] = useState<boolean>(false);

  if (mode === 'read') {
    const dom = <span ref={ref}>{moment(text).format(format) || '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      style,
      disabled,
      value,
      onChange,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;
    const momentValue = parseValueToMoment(value, format) as moment.Moment;

    if (light) {
      const valueStr: string = (momentValue && momentValue.format(format)) || '';
      dom = (
        <div
          style={style}
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker
            {...fieldProps}
            value={momentValue}
            onChange={(v) => {
              onChange(v);
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            onOpenChange={setOpen}
            open={open}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size="middle" // TODO support size
            value={valueStr}
            onClear={() => {
              onChange(null);
            }}
            expanded={open}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          ref={ref}
          bordered={plain === undefined ? true : !plain}
          {...fieldProps}
          value={momentValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDatePicker);
