import type { RadioGroupProps } from 'antd';
import { ConfigProvider, Radio, Spin } from 'antd';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';
import './index.less';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
} & FieldSelectProps;

/**
 * 单选组件
 *
 * @param param0
 * @param ref
 */
const FieldRadio: ProFieldFC<GroupProps> = (
  { radioType, renderFormItem, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-radio');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const radioRef = useRef();

  useImperativeHandle(ref, () => ({
    ...(radioRef.current || {}),
    fetchData: () => fetchData(),
  }));

  if (loading) {
    return <Spin size="small" />;
  }

  if (mode === 'read') {
    const optionsValueEnum = options?.length
      ? options?.reduce((pre: any, cur) => {
          return { ...pre, [cur.value ?? '']: cur.label };
        }, {})
      : undefined;
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const RadioComponents = radioType === 'button' ? Radio.Button : Radio;
    const dom = (
      <Radio.Group
        ref={radioRef}
        {...rest.fieldProps}
        className={classNames(
          rest.fieldProps?.className,
          `${layoutClassName}-${rest.fieldProps.layout || 'horizontal'}`,
        )}
        options={undefined}
      >
        {options?.map((item) => (
          <RadioComponents key={item.value} {...item} optionType={undefined}>
            {item.label}
          </RadioComponents>
        ))}
      </Radio.Group>
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldRadio);
