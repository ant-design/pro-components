﻿import { Checkbox, ConfigProvider, Form, Spin, theme } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import classNames from 'classnames';
import { useContext, useImperativeHandle, useRef } from 'react';
import { objectToMap, proFieldParsingText, useStyle } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select/useFieldFetchData';

export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;

/**
 * 多选组件
 *
 */
const FieldCheckbox: ProFieldFC<GroupProps> = ({
  layout = 'horizontal',
  formItemRender,
  mode,
  render,
  ref,
  ...rest
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-checkbox');
  const status = Form.Item?.useStatus?.();
  const [loading, options, fetchData] = useFieldFetchData(rest);
  // css
  const { wrapSSR, hashId } = useStyle('Checkbox', (token) => {
    return {
      [`.${layoutClassName}`]: {
        '&-error': {
          span: {
            color: token.colorError,
          },
        },
        '&-warning': {
          span: {
            color: token.colorWarning,
          },
        },
        '&-vertical': {
          //ant design 5
          [`&${token.antCls}-checkbox-group`]: {
            display: 'inline-block',
          },
          //ant design 5
          [`${token.antCls}-checkbox-wrapper+${token.antCls}-checkbox-wrapper`]: {
            'margin-inline-start': '0  !important',
          },
          //ant design 4
          [`${token.antCls}-checkbox-group-item`]: {
            display: 'flex',
            marginInlineEnd: 0,
          },
        },
      },
    };
  });

  const { token } = theme.useToken?.() ?? {};
  const checkBoxRef = useRef(undefined);
  useImperativeHandle(
    ref,
    () => ({
      ...(checkBoxRef.current || {}),
      fetchData: (keyWord: string) => fetchData(keyWord),
    }),
    [fetchData],
  );

  if (loading) {
    return <Spin size="small" />;
  }

  if (mode === 'read') {
    const optionsValueEnum = options?.length
      ? options?.reduce((pre: any, cur) => {
          return { ...pre, [(cur.value as any) ?? '']: cur.label };
        }, {})
      : undefined;

    const dom = proFieldParsingText(rest.text, objectToMap(rest.valueEnum || optionsValueEnum));

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>) ?? null;
    }
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: token.marginSM,
        }}
      >
        {dom}
      </div>
    );
  }

  if (mode === 'edit') {
    const { fieldNames, ...restFieldProps } = rest.fieldProps || {};
    const dom = wrapSSR(
      <Checkbox.Group
        {...restFieldProps}
        className={classNames(rest.fieldProps?.className, hashId, `${layoutClassName}-${layout}`, {
          [`${layoutClassName}-error`]: status?.status === 'error',
          [`${layoutClassName}-warning`]: status?.status === 'warning',
        })}
        options={options}
      />,
    );
    if (formItemRender) {
      return formItemRender(rest.text, { mode, ...rest.fieldProps, options, loading }, dom) ?? null;
    }
    return dom;
  }

  return null;
};

export default FieldCheckbox;
