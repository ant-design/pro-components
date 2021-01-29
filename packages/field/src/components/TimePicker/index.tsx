import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { FieldLabel, parseValueToMoment } from '@ant-design/pro-utils';
import type { ProFieldFC } from '../../index';

/**
 * 日期选择组件
 *
 * @param
 */
const FieldTimePicker: ProFieldFC<{
  text: string | number;
  format: string;
}> = ({ text, mode, light, label, format, render, renderFormItem, plain, fieldProps }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const size = useContext(ConfigProvider.SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');

  if (mode === 'read') {
    const dom = <span ref={ref}>{text ? moment(text).format(format || 'HH:mm:ss') : '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const { disabled, onChange, placeholder, allowClear, value } = fieldProps;
    const momentValue = parseValueToMoment(value) as moment.Moment;
    if (light) {
      const valueStr: string = (momentValue && momentValue.format(format || 'HH:mm:ss')) || '';
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker.TimePicker
            value={momentValue}
            format={format}
            ref={ref}
            {...fieldProps}
            onChange={(v) => {
              if (onChange) {
                onChange(v);
              }
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
            size={size}
            value={valueStr}
            allowClear={allowClear}
            onClear={() => {
              if (onChange) {
                onChange(null);
              }
            }}
            expanded={open}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker.TimePicker
          ref={ref}
          format={format}
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

export default React.forwardRef(FieldTimePicker);
