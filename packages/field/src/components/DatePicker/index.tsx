import { DatePicker } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel } from '@ant-design/pro-utils';
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
  { text, mode, format = 'YYYY-MM-DD', label, light, render, renderFormItem, plain, showTime, formItemProps },
  ref,
  ) => {
    const intl = useIntl();
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('pro-field-date-picker');
    const [open, setOpen] = useState<boolean>(false);

    if (mode === 'read') {
      const dom = <span ref={ref}>{moment(text).format(format) || '-'}</span>;
      if (render) {
        return render(text, { mode, ...formItemProps }, <span>{dom}</span>);
      }
      return dom;
    }
    if (mode === 'edit' || mode === 'update') {
      let dom;
      const placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择');
      if (light) {
        const { style, disabled, value, onChange } = formItemProps;
        const valueStr: string = value && moment(value).format(format) || '';
        dom = (
          <div
            style={style}
            className={`${prefixCls}-light`}
            onClick={() => {
              setOpen(true);
            }}
          >
            <DatePicker
              {...formItemProps}
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
              size="default" // TODO support size
              value={valueStr}
              onClear={() => {
                onChange(null);
              }}
              expanded={open}
            />
          </div>
        )
      } else {
        dom = (
          <DatePicker
            showTime={showTime}
            format={format}
            placeholder={placeholder}
            ref={ref}
            bordered={plain === undefined ? true : !plain}
            {...formItemProps}
          />
        );
      }
      if (renderFormItem) {
        return renderFormItem(text, { mode, ...formItemProps }, dom);
      }
      return dom;
    }
    return null;
  };

export default React.forwardRef(FieldDatePicker);
