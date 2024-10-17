import {
  objectToMap,
  proFieldParsingText,
  useStyle,
} from '@ant-design/pro-utils';
import { Checkbox, ConfigProvider, Form, Spin } from 'antd';
import type { CheckboxGroupProps } from 'antd/lib/checkbox';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';
export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;

// 兼容代码-----------
import { useToken } from '@ant-design/pro-provider';
import 'antd/lib/checkbox/style';
//----------------------
/**
 * 多选组件
 *
 * @param param0
 * @param ref
 */
const FieldCheckbox: ProFieldFC<GroupProps> = (
  { layout = 'horizontal', renderFormItem, mode, render, ...rest },
  ref,
) => {
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
          [`${token.antCls}-checkbox-wrapper+${token.antCls}-checkbox-wrapper`]:
            {
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

  const { token } = useToken?.();
  const checkBoxRef = useRef();
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

    const dom = proFieldParsingText(
      rest.text,
      objectToMap(rest.valueEnum || optionsValueEnum),
    );

    if (render) {
      return (
        render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>) ?? null
      );
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
      //@ts-ignore
      <Checkbox.Group
        {...restFieldProps}
        className={classNames(
          rest.fieldProps?.className,
          hashId,
          `${layoutClassName}-${layout}`,
          {
            [`${layoutClassName}-error`]: status?.status === 'error',
            [`${layoutClassName}-warning`]: status?.status === 'warning',
          },
        )}
        options={options}
      />,
    );
    if (renderFormItem) {
      return (
        renderFormItem(
          rest.text,
          { mode, ...rest.fieldProps, options, loading },
          dom,
        ) ?? null
      );
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldCheckbox);
