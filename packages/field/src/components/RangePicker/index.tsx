import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { FieldLabel, parseValueToMoment } from '@ant-design/pro-utils';
import { useIntl } from '@ant-design/pro-provider';

import type { ProFieldFC } from '../../index';

const ACTIVE_PICKER_INDEX_LEFT = 0;
const ACTIVE_PICKER_INDEX_RIGHT = 1;

/**
 * 日期范围选择组件
 *
 * @param
 */
const FieldRangePicker: ProFieldFC<{
  text: string[];
  format: string;
  showTime?: boolean;
}> = (
  { text, mode, format, label, render, renderFormItem, plain, showTime, fieldProps, light },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(ConfigProvider.SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [startText, endText] = Array.isArray(text) ? text : [];
  const [open, setOpen] = useState<boolean>(false);
  // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
  const [activePickerIndex, setActivePickerIndex] = useState<0 | 1>();
  const parsedStartText: string = startText ? moment(startText).format(format || 'YYYY-MM-DD') : '';
  const parsedEndText: string = endText ? moment(endText).format(format || 'YYYY-MM-DD') : '';

  if (mode === 'read') {
    const dom = (
      <div ref={ref}>
        <div>{parsedStartText || '-'}</div>
        <div>{parsedEndText || '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const {
      disabled,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;
    let dom;
    const momentValue = parseValueToMoment(fieldProps.value) as moment.Moment;
    if (light) {
      const valueStr: string =
        parsedStartText && parsedEndText && `${parsedStartText} ~ ${parsedEndText}`;
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker.RangePicker
            {...fieldProps}
            ref={ref}
            format={format}
            showTime={showTime}
            placeholder={[
              intl.getMessage('tableForm.selectPlaceholder', '请选择'),
              intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            ]}
            bordered={plain === undefined ? true : !plain}
            onChange={(v) => {
              onChange(v);
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            activePickerIndex={activePickerIndex}
            onOpenChange={setOpen}
            open={open}
            onCalendarChange={(dates) => {
              if (dates && !dates[0]) {
                setActivePickerIndex(ACTIVE_PICKER_INDEX_LEFT);
              } else if (dates && !dates[1]) {
                setActivePickerIndex(ACTIVE_PICKER_INDEX_RIGHT);
              }
            }}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            value={valueStr}
            allowClear={allowClear}
            onClear={() => {
              onChange(null);
              setActivePickerIndex(0);
            }}
            expanded={open}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker.RangePicker
          ref={ref}
          format={format}
          showTime={showTime}
          placeholder={[
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ]}
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

export default React.forwardRef(FieldRangePicker);
