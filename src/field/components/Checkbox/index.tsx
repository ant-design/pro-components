import { ConfigProvider, Form, Spin } from 'antd';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import { useStyle } from '../../../utils';
import {
  isProFieldEditOnlyMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { useFieldFetchData } from '../Select';
import { FieldCheckboxEdit } from './FieldCheckboxEdit';
import { FieldCheckboxRead } from './FieldCheckboxRead';
import type { GroupProps } from './types';

export type { GroupProps };

/**
 * 多选组件
 */
const FieldCheckbox: ProFieldFC<GroupProps> = (
  { layout = 'horizontal', formItemRender, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-checkbox');
  const status = Form.Item?.useStatus?.();
  const [loading, options, fetchData] = useFieldFetchData(rest);
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
          [`&${token.antCls}-checkbox-group`]: {
            display: 'inline-block',
          },
          [`${token.antCls}-checkbox-wrapper+${token.antCls}-checkbox-wrapper`]:
            {
              'margin-inline-start': '0  !important',
            },
          [`${token.antCls}-checkbox-group-item`]: {
            display: 'flex',
            marginInlineEnd: 0,
          },
        },
      },
    };
  });

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

  const optionsValueEnum = options?.length
    ? options?.reduce((pre: any, cur) => {
        return { ...pre, [(cur.value as any) ?? '']: cur.label };
      }, {})
    : undefined;

  if (isProFieldReadMode(mode)) {
    return (
      <FieldCheckboxRead
        layout={layout}
        formItemRender={formItemRender}
        mode={mode}
        render={render}
        optionsValueEnum={optionsValueEnum}
        {...rest}
      />
    );
  }

  if (isProFieldEditOnlyMode(mode)) {
    return (
      <FieldCheckboxEdit
        layout={layout}
        formItemRender={formItemRender}
        mode={mode}
        render={render}
        options={options}
        loading={loading}
        layoutClassName={layoutClassName}
        wrapSSR={wrapSSR}
        hashId={hashId}
        status={status}
        {...rest}
      />
    );
  }

  return null;
};

export default React.forwardRef(FieldCheckbox);
