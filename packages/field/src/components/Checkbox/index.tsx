import { Checkbox, ConfigProvider, Space, Spin } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';
import './index.less';

export type GroupProps = {
  layout?: 'horizontal' | 'vertical';
  options?: CheckboxGroupProps['options'];
} & FieldSelectProps;

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
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const checkBoxRef = useRef();
  useImperativeHandle(ref, () => ({
    ...(checkBoxRef.current || {}),
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

    const dom = proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum));

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, <>{dom}</>) || null;
    }
    return <Space>{dom}</Space>;
  }

  if (mode === 'edit') {
    const dom = (
      <Checkbox.Group
        {...rest.fieldProps}
        className={classNames(rest.fieldProps?.className, `${layoutClassName}-${layout}`)}
        options={options}
      />
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldCheckbox);
