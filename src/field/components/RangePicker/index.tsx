import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, parseValueToDay } from '../../../utils';
import type { ProFieldFC, ProFieldLightProps } from '../../PureProField';

/**
 * 日期范围选择组件
 *
 * @param
 */
const FieldRangePicker: ProFieldFC<
  {
    text: string[];
    format?: string;
    variant?: 'outlined' | 'borderless' | 'filled';
    showTime?: boolean;
    picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  } & ProFieldLightProps
> = ({
  text,
  mode,
  light,
  label,
  format = 'YYYY-MM-DD',
  render,
  picker,
  formItemRender,
  plain,
  showTime,
  lightLabel,
  variant,
  fieldProps,
  ref,
}) => {
  const intl = useIntl();

  const [startText, endText] = Array.isArray(text) ? text : [];
  const [open, setOpen] = React.useState<boolean>(false);
  // antd 改了一下 交互，这里要兼容一下，不然会导致无法选中第二个数据
  const genFormatText = useCallback(
    (formatValue: dayjs.Dayjs) => {
      if (typeof fieldProps?.format === 'function') {
        return fieldProps?.format?.(formatValue);
      }
      return fieldProps?.format || format || 'YYYY-MM-DD';
    },
    [fieldProps, format],
  );
  // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
  const parsedStartText: string = startText ? dayjs(startText).format(genFormatText(dayjs(startText))) : '';
  const parsedEndText: string = endText ? dayjs(endText).format(genFormatText(dayjs(endText))) : '';

  if (mode === 'read') {
    const dom = (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
        }}
      >
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
    const dayValue = parseValueToDay(fieldProps.value) as dayjs.Dayjs[];
    let dom;
    const handleRangeChange = (value: any) => {
      fieldProps?.onChange?.(value);

      if (!value) {
        setOpen(false);
      }
    };
    if (light) {
      dom = (
        <FieldLabel
          ref={lightLabel}
          allowClear={false}
          disabled={fieldProps.disabled}
          downIcon={dayValue || open ? false : undefined}
          label={label}
          style={
            dayValue
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          value={
            dayValue || open ? (
              <DatePicker.RangePicker
                format={format}
                picker={picker}
                showTime={showTime}
                variant="borderless"
                {...fieldProps}
                placeholder={
                  fieldProps.placeholder ?? [
                    intl.getMessage('tableForm.selectPlaceholder', '请选择'),
                    intl.getMessage('tableForm.selectPlaceholder', '请选择'),
                  ]
                }
                // onClear={() => {
                //   setOpen(false);
                //   fieldProps?.onClear?.();
                // }}
                value={dayValue}
                onChange={handleRangeChange}
                onOpenChange={(isOpen) => {
                  if (dayValue) setOpen(isOpen);
                  fieldProps?.onOpenChange?.(isOpen);
                }}
              />
            ) : null
          }
          variant={variant}
          onClick={() => {
            fieldProps?.onOpenChange?.(true);
            setOpen(true);
          }}
        />
      );
    } else {
      dom = (
        <DatePicker.RangePicker
          ref={ref}
          format={format}
          placeholder={[
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
            intl.getMessage('tableForm.selectPlaceholder', '请选择'),
          ]}
          showTime={showTime}
          variant={plain === undefined ? 'outlined' : plain ? 'borderless' : 'outlined'}
          {...fieldProps}
          value={dayValue}
        />
      );
    }
    if (formItemRender) {
      return formItemRender(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default FieldRangePicker;
