import type { DatePickerProps } from 'antd';
import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext, useRef } from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel, parseValueToMoment } from '@ant-design/pro-utils';
import type { ProFieldFC } from '../../index';
import './index.less';

/**
 * 日期选择组件
 *
 * @param
 */
const FieldDatePicker: ProFieldFC<{
  text: string | number;
  format: string;
  showTime?: boolean;
  bordered?: boolean;
  picker?: DatePickerProps['picker'];
}> = (
  {
    text,
    mode,
    format,
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
  },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(ConfigProvider.SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [open, setOpen] = useState<boolean>(false);
  const lightLabel = useRef<HTMLElement>(null);

  if (mode === 'read') {
    const dom = text ? moment(text).format(fieldProps.format || format || 'YYYY-MM-DD') : '-';
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      disabled,
      value,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;

    const momentValue = parseValueToMoment(value) as moment.Moment;

    if (light) {
      const valueStr: string = (momentValue && momentValue.format(format)) || '';
      dom = (
        <div
          className={`${prefixCls}-light`}
          onMouseDown={(e) => {
            // 不冒泡，避免触发rc-picker绑定的全局mouseDown（用于关闭下拉菜单）
            // fix: https://github.com/ant-design/pro-components/issues/5010
            e.stopPropagation();
          }}
          onClick={(e) => {
            // 点击label切换下拉菜单
            if (lightLabel.current?.contains(e.target as HTMLElement)) {
              setOpen(!open);
            } else {
              setOpen(true);
            }
          }}
        >
          <DatePicker
            picker={picker}
            showTime={showTime}
            format={format}
            ref={ref}
            {...fieldProps}
            value={momentValue}
            onChange={(v) => {
              onChange?.(v);
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
            onClear={() => {
              onChange?.(null);
            }}
            allowClear={allowClear}
            bordered={bordered}
            expanded={open}
            ref={lightLabel}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker
          picker={picker}
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          bordered={plain === undefined ? true : !plain}
          ref={ref}
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
