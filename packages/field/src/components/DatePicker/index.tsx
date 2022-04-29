import type { DatePickerProps } from 'antd';
import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext, useRef, useCallback } from 'react';
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
  const [labelTrigger, setLabelTrigger] = useState(false);
  const lightLabel = useRef<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>(null);

  // 是label且不是label里面的clear图标触发事件
  const isTriggeredByLabel = useCallback(
    (e: React.MouseEvent) => {
      // 两条语句结果分别命名，可读性好点
      const isLabelMouseDown = lightLabel.current?.labelRef?.current?.contains(
        e.target as HTMLElement,
      );
      const isClearMouseDown = lightLabel.current?.clearRef?.current?.contains(
        e.target as HTMLElement,
      );
      return isLabelMouseDown && !isClearMouseDown;
    },
    [lightLabel],
  );

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
            // fix: https://github.com/ant-design/pro-components/issues/5010
            if (isTriggeredByLabel(e)) {
              setLabelTrigger(true);
            }
          }}
          onMouseUp={() => {
            setLabelTrigger(false);
          }}
          onClick={(e) => {
            // 点击label切换下拉菜单
            const isLabelClick = lightLabel.current?.labelRef?.current?.contains(
              e.target as HTMLElement,
            );
            if (isLabelClick) {
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
            onOpenChange={(isOpen) => {
              if (!labelTrigger) {
                setOpen(isOpen);
              }
            }}
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
