import { Spin } from 'antd';
import React, { useImperativeHandle, useRef } from 'react';
import {
  isProFieldEditOrUpdateMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';
import { FieldSegmentedEdit } from './FieldSegmentedEdit';
import { FieldSegmentedRead } from './FieldSegmentedRead';

/**
 * Segmented https://ant.design/components/segmented-cn/
 */
const FieldSegmented: ProFieldFC<
  {
    text: string;
    emptyText?: React.ReactNode;
  } & FieldSelectProps
> = (props, ref) => {
  const {
    mode,
    render,
    formItemRender,
    fieldProps,
    emptyText = '-',
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, options, fetchData] = useFieldFetchData(props);

  useImperativeHandle(
    ref,
    () => ({
      ...(inputRef.current || {}),
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
      <FieldSegmentedRead
        {...props}
        optionsValueEnum={optionsValueEnum}
        emptyText={emptyText}
      />
    );
  }
  if (isProFieldEditOrUpdateMode(mode)) {
    return (
      <FieldSegmentedEdit
        {...props}
        options={options}
        loading={loading}
        inputRef={inputRef}
      />
    );
  }
  return null;
};

export default React.forwardRef(FieldSegmented);
