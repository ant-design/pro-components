import { ConfigProvider, Form, Spin } from 'antd';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import { useStyle } from '../../../utils';
import {
  isProFieldEditOnlyMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { useFieldFetchData } from '../Select';
import { FieldRadioEdit } from './FieldRadioEdit';
import { FieldRadioRead } from './FieldRadioRead';
import type { GroupProps } from './types';

export type { GroupProps };

/**
 * 单选组件
 */
const FieldRadio: ProFieldFC<GroupProps> = (
  { radioType, formItemRender, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-radio');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const radioRef = useRef();
  const status = Form.Item?.useStatus?.();

  useImperativeHandle(
    ref,
    () => ({
      ...(radioRef.current || {}),
      fetchData: (keyWord: string) => fetchData(keyWord),
    }),
    [fetchData],
  );

  const { wrapSSR, hashId } = useStyle('FieldRadioRadio', (token) => {
    return {
      [`.${layoutClassName}-error`]: {
        span: {
          color: token.colorError,
        },
      },
      [`.${layoutClassName}-warning`]: {
        span: {
          color: token.colorWarning,
        },
      },
      [`.${layoutClassName}-vertical`]: {
        [`${token.antCls}-radio-wrapper`]: {
          display: 'flex',
          marginInlineEnd: 0,
        },
      },
    };
  });

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
      <FieldRadioRead
        radioType={radioType}
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
      <FieldRadioEdit
        radioType={radioType}
        formItemRender={formItemRender}
        mode={mode}
        render={render}
        options={options}
        loading={loading}
        radioRef={radioRef}
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

export default React.forwardRef(FieldRadio);
