import React, { useContext, useMemo, useImperativeHandle, useRef } from 'react';
import type { RadioGroupProps } from 'antd';
import { ConfigProvider, Spin, Cascader } from 'antd';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
import './index.less';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';

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
const FieldCascader: ProFieldFC<GroupProps> = (
  { radioType, renderFormItem, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-cascader');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const cascaderRef = useRef();

  useImperativeHandle(ref, () => ({
    ...(cascaderRef.current || {}),
    fetchData: () => fetchData(),
  }));

  const optionsValueEnum = useMemo(() => {
    /**
     * Support cascader fieldNames
     *
     * @see https://ant.design/components/cascader-cn/#header
     */
    const fieldNames = options.fieldProps?.fieldNames || {
      label: 'label',
      value: 'value',
      children: 'children',
    };

    const traverseOptions = (_options: any) => {
      return _options?.length
        ? _options?.reduce((pre: any, cur: any) => {
            return {
              ...pre,
              [cur[fieldNames.value]]: cur[fieldNames.label],
              ...traverseOptions(cur[fieldNames.children]),
            };
          }, {})
        : undefined;
    };
    return traverseOptions(options);
  }, [options]);

  if (mode === 'read') {
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const dom = (
      <Spin spinning={loading}>
        <Cascader
          ref={cascaderRef}
          {...rest.fieldProps}
          className={classNames(rest.fieldProps?.className, layoutClassName)}
          options={options}
        />
      </Spin>
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldCascader);
