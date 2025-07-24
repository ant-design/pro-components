import { omit } from '@rc-component/util';
import { Segmented, Spin } from 'antd';
import React, { useImperativeHandle, useRef } from 'react';
import { objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';

/**
 * Segmented https://ant.design/components/segmented-cn/
 *
 * @param
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

  const inputRef = useRef<HTMLInputElement>();

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

  if (mode === 'read') {
    const optionsValueEnum = options?.length
      ? options?.reduce((pre: any, cur) => {
          return { ...pre, [(cur.value as any) ?? '']: cur.label };
        }, {})
      : undefined;

    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          objectToMap(rest.valueEnum || optionsValueEnum),
        )}
      </>
    );

    if (render) {
      return (
        render(rest.text, { mode, ...fieldProps }, <>{dom}</>) ?? emptyText
      );
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const dom = (
      <Segmented
        ref={inputRef}
        {...(omit(fieldProps || {}, ['allowClear']) as any)}
        options={options}
      />
    );

    if (formItemRender) {
      return formItemRender(
        rest.text,
        { mode, ...fieldProps, options, loading },
        dom,
      );
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldSegmented);
