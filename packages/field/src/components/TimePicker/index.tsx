import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { FieldLabel } from '@ant-design/pro-utils';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import { ProFieldFC } from '../../index';

/**
 * 日期选择组件
 * @param
 */
const FieldTimePicker: ProFieldFC<{
  text: string | number;
  format: string;
}> = (
  { text, mode, light, label, format = 'HH:mm:ss', render, renderFormItem, plain, fieldProps },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const size = useContext(SizeContext);
  const valueStr: string = text ? moment(text).format(format) : '';
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');

  if (mode === 'read') {
    const dom = <span ref={ref}>{valueStr || '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const { disabled, onChange, placeholder, allowClear } = fieldProps;

    if (light) {
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker.TimePicker
            {...fieldProps}
            format={format}
            ref={ref}
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
